import { Box, Button, ButtonText, HStack, VStack } from "@gluestack-ui/themed";
import React, { useContext } from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import setTabContext from "../../Context/setTab";

const Navbar = () => {
	const [current, setTab] = useContext(setTabContext);
	return (
		<HStack
			flex={1}
			position="absolute"
			bottom={0}
			left={0}
			right={0}
			borderTopWidth={1}
			borderColor="$coolGray300"
			minHeight={40}
		>
			<TabButton
				icon={<AntIcon name="home" size={18} />}
				text="Home"
				isActive={current == "home"}
				pressColor="$coolGray300"
				onPress={() => {
					setTab("home");
				}}
			/>
			<Box position="relative" top={-18}>
				<TabButton
					icon={
						<MaterialIcon
							name="control-point-duplicate"
							size={18}
							color={"white"}
						/>
					}
					text="Remote"
					isActive={current == "remote"}
					isPrimary
					bgColor="$primary500"
					onPress={() => {
						setTab("remote");
					}}
				/>
			</Box>
			<TabButton
				icon={<MaterialCommunityIcon name="devices" size={18} />}
				text="Device"
				isActive={current == "device"}
				pressColor="$coolGray300"
				onPress={() => {
					setTab("device");
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
