import { Box, Button, ButtonText, HStack, VStack } from "@gluestack-ui/themed";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { RootParamList } from "../../../App";

type homeScreenProp = BottomTabNavigationProp<RootParamList>;

const Navbar = () => {
	const navigation = useNavigation<homeScreenProp>();
	const currentIndex = navigation.getState().index || 0;
	const startIndex = 1;
	return (
		<HStack
			position="absolute"
			bottom={0}
			left={0}
			right={0}
			borderTopWidth={2}
			borderColor="$coolGray300"
			bgColor="$white"
			minHeight={40}
		>
			<TabButton
				icon={<AntIcon name="home" size={18} />}
				text="Home"
				isActive={currentIndex == startIndex + 0}
				pressColor="$coolGray300"
				onPress={() => {
					navigation.navigate("Home");
				}}
			/>
			<Box position="relative" top={-18}>
				<TabButton
					icon={
						<MaterialCommunityIcon
							name="fan"
							size={18}
							color={"white"}
						/>
					}
					text="Remote"
					isActive={currentIndex == startIndex + 1}
					isPrimary
					bgColor="$primary500"
					onPress={() => {
						navigation.navigate("Remote");
					}}
				/>
			</Box>
			<TabButton
				icon={<MaterialCommunityIcon name="devices" size={18} />}
				text="Device"
				isActive={currentIndex == startIndex + 2}
				pressColor="$coolGray300"
				onPress={() => {
					navigation.navigate("Device");
				}}
			/>
		</HStack>
	);
};

const TabButton = ({
	icon,
	text,
	onPress,
	isActive,
	pressColor = "$primary200",
	bgColor = "white",
	isPrimary,
}: {
	icon: React.ReactNode;
	text: string;
	isActive: boolean;
	onPress: VoidFunction;
	pressColor?: string;
	bgColor?: string;
	isPrimary?: boolean;
}) => {
	return (
		<Button
			variant="outline"
			borderWidth={0}
			flex={1}
			onPress={onPress}
			bgColor={bgColor}
			$active-bgColor={pressColor}
			rounded={isPrimary ? "$3xl" : "$none"}
		>
			<ButtonText color={isActive ? "$primary500" : "$coolGray500"}>
				{icon}
			</ButtonText>
		</Button>
	);
};

export default Navbar;
