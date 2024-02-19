import { Box, SafeAreaView } from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import BluetoothStateManager from "react-native-bluetooth-state-manager";
import { StatusBar } from "react-native";
import BluetoothStatusBadge from "../../components/BluetoothStatusBadge/index,";
import Navbar from "../../components/Navbar";
import useBLE from "../../bluetooth/useBLE";

type MainLayoutProps = {
	children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
	const { requestPermissions } = useBLE();
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
		<SafeAreaView flex={1} mt={StatusBar.currentHeight} bgColor="$white">
			<BluetoothStatusBadge isConnected={true} />
			<Box mt="$2" pb={65} width="$full" flex={1}>
				{children}
			</Box>
			<Navbar key="old" />
		</SafeAreaView>
	);
};

export default MainLayout;
