import { Box, SafeAreaView } from "@gluestack-ui/themed";
import React from "react";
import Navbar from "../../components/Navbar";
import { StatusBar } from "react-native";
import BluetoothStatusBadge from "../../components/BluetoothStatusBadge/index,";

type MainLayoutProps = {
	children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
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
