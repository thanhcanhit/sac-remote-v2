import "react-native-gesture-handler";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Remote from "./src/pages/Remote";
import Device from "./src/pages/Device";
import Home from "./src/pages/Home";
import MainLayout from "./src/layouts/MainLayout";
import LanguageProvider from "./src/Context/lang";
import { NavigationContainer } from "@react-navigation/native";
import { Fragment, useEffect } from "react";
import BluetoothStateManager from "react-native-bluetooth-state-manager";
import useBLE from "./src/bluetooth/useBLE";

const BottomTab = createBottomTabNavigator();

export type RootParamList = {
	Remote: undefined;
	Home: undefined;
	Device: undefined;
};
const RemotePage = () => (
	<MainLayout>
		<Remote />
	</MainLayout>
);
const DevicePage = () => (
	<MainLayout>
		<Device />
	</MainLayout>
);
const HomePage = () => (
	<MainLayout>
		<Home />
	</MainLayout>
);

export default function App() {
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
	}, []);

	return (
		<NavigationContainer>
			<GluestackUIProvider config={config}>
				<LanguageProvider>
					<BottomTab.Navigator
						detachInactiveScreens={true}
						initialRouteName="home"
						tabBar={() => <Fragment />}
						screenOptions={{ header: () => <></>, freezeOnBlur: true }}
					>
						<BottomTab.Screen
							key="home"
							navigationKey="home"
							name="Home"
							component={HomePage}
							options={{ freezeOnBlur: true }}
						/>
						<BottomTab.Screen
							key="remote"
							navigationKey="remote"
							name="Remote"
							component={RemotePage}
							options={{ freezeOnBlur: true }}
						/>
						<BottomTab.Screen
							key="device"
							navigationKey="device"
							name="Device"
							component={DevicePage}
							options={{ freezeOnBlur: true }}
						/>
					</BottomTab.Navigator>
				</LanguageProvider>
			</GluestackUIProvider>
		</NavigationContainer>
	);
}
