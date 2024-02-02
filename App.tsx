import { Box, GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StatusBar, Text } from "react-native";
import { useState } from "react";
import Remote from "./src/pages/Remote";
import Device from "./src/pages/Device";
import Home from "./src/pages/Home";

export type PageName = "remote" | "device" | "home";

const RemotePage = <Remote />;
const DevicePage = <Device />;
const HomePage = <Home />;

const getCurrentPage = (current: PageName): React.ReactNode => {
	switch (current) {
		case "home":
			return HomePage;
		case "device":
			return DevicePage;
		case "remote":
			return RemotePage;
		default:
			<>
				<Text>Not Found this page: {current}</Text>
			</>;
	}
};

export default function App() {
	const [tab, setTab] = useState<PageName>("home");

	const currentPage = getCurrentPage(tab);
	return (
		<GluestackUIProvider config={config}>
			<Box flex={1} mt={StatusBar.currentHeight}>
        
				{currentPage}
			</Box>
		</GluestackUIProvider>
	);
}
