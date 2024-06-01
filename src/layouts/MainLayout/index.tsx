import { Box, SafeAreaView, View } from "@gluestack-ui/themed";
import React, { useContext, useEffect } from "react";
import BluetoothStateManager from "react-native-bluetooth-state-manager";
import { BleContext } from "../../Context/ble";
import BluetoothStatusBadge from "../../components/BluetoothStatusBadge/index,";
import Navbar from "../../components/Navbar";
import { StatusBar } from "react-native";

type MainLayoutProps = {
	children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
	const { requestPermissions, connectedDevice } = useContext(BleContext);

	useEffect(() => {
		const requestTurnOnBluetooth = async () => {
			if ((await BluetoothStateManager.getState()) !== "PoweredOn") {
				await BluetoothStateManager.requestToEnable();
			}
		};

		const getPermission = async () => {
			const isGrandted: boolean = await requestPermissions();

			if (isGrandted) {
				requestTurnOnBluetooth();
			}
		};

		getPermission();
	}, [children]);

	return (
		<SafeAreaView flex={1} bgColor="$white">
			<StatusBar />
			<BluetoothStatusBadge isConnected={Boolean(connectedDevice)} />
			<Box mt="$2" paddingBottom={75} width="$full" flex={1}>
				{children}
			</Box>
			<Navbar key="navbar" />
		</SafeAreaView>
	);
};

export default MainLayout;
