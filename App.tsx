import "react-native-gesture-handler";
import "react-native-reanimated";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Fragment } from "react";
import BleProvider from "./src/Context/ble";
import LanguageProvider from "./src/Context/lang";
import MainLayout from "./src/layouts/MainLayout";
import Device from "./src/pages/Device";
import Home from "./src/pages/Home";
import Remote from "./src/pages/Remote";
import Welcome from "./src/pages/Welcome";

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
	return (
		<NavigationContainer>
			<GluestackUIProvider config={config}>
				<LanguageProvider>
					<BleProvider>
						<BottomTab.Navigator
							detachInactiveScreens={true}
							initialRouteName="Welcome"
							tabBar={() => <Fragment />}
							screenOptions={{ header: () => <></>, freezeOnBlur: true }}
						>
							<BottomTab.Screen
								navigationKey="Welcome"
								name="Welcome"
								component={Welcome}
								options={{ freezeOnBlur: true }}
							/>
							<BottomTab.Screen
								navigationKey="Home"
								name="Home"
								component={HomePage}
								options={{ freezeOnBlur: true }}
							/>
							<BottomTab.Screen
								navigationKey="Remote"
								name="Remote"
								component={RemotePage}
								options={{ freezeOnBlur: true }}
							/>
							<BottomTab.Screen
								navigationKey="Device"
								name="Device"
								component={DevicePage}
								options={{ freezeOnBlur: true }}
							/>
						</BottomTab.Navigator>
					</BleProvider>
				</LanguageProvider>
			</GluestackUIProvider>
		</NavigationContainer>
	);
}
