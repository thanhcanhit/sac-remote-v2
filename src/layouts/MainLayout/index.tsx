import { SafeAreaView } from "@gluestack-ui/themed";
import React from "react";
import Navbar from "../../components/Navbar";
import { StatusBar } from "react-native";
import BluetoothStatusBadge from "../../components/BluetoothStatusBadge/index,";

type MainLayoutProps = {
	children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<SafeAreaView flex={1} mt={StatusBar.currentHeight}>
			<BluetoothStatusBadge isConnected={false} />
			{children}
			<Navbar />
		</SafeAreaView>
	);
};

export default MainLayout;
