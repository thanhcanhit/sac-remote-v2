import {
	Box,
	HStack,
	Heading,
	ScrollView,
	VStack,
	Pressable,
	View,
	Badge,
	BadgeText,
} from "@gluestack-ui/themed";
import React, { useContext, useState } from "react";
import { LangContext } from "../../Context/lang";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import ConnectModal from "./ConnectModal";
import ConnectActionSheet from "./ConnectActionSheet";

const Device = () => {
	const { trans } = useContext(LangContext);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
	
	return (
		<View>
			<Heading size="md" bold textAlign="center" color="$coolGray600">
				{trans({ en: "Device", vi: "Thiết bị" })}
			</Heading>
			<Box px="$4" mt="$2">
				{/* Last device */}
				<Box>
					<HStack mb="$1">
						<Badge size="sm">
							<BadgeText bold>
								{trans({
									en: "Last connected device",
									vi: "Thiết bị đã kết nối",
								})}
							</BadgeText>
						</Badge>
					</HStack>
					<DeviceItem
						name="SAC Device"
						onPress={() => setShowActionSheet(true)}
					/>
				</Box>

				{/* Around Device */}
				<HStack mt="$2">
					<Badge action="muted" w="$full" justifyContent="center">
						<BadgeText bold>
							{trans({
								en: "Peripherals are all around you",
								vi: "Thiết bị ngoại vi ở xung quanh bạn",
							})}
						</BadgeText>
					</Badge>
				</HStack>
				<ScrollView></ScrollView>
			</Box>

			<ConnectActionSheet
				onClose={() => setShowActionSheet(false)}
				onSubmit={() => console.log("Submit action sheet")}
				onAction1={() => setShowModal(true)}
				isOpen={showActionSheet}
			/>
			<ConnectModal
				isOpen={showModal}
				onClose={() => {
					setShowModal(false);
				}}
				onCancel={() => {
					setShowModal(false);
				}}
				onSubmit={() => console.log("Submit")}
			/>
		</View>
	);
};

type DeviceItemProps = {
	name: string;
	onPress: VoidFunction;
};
const DeviceItem = ({ name, onPress }: DeviceItemProps) => {
	return (
		<Pressable $active-bgColor="$coolGray200" onPress={onPress}>
			<HStack
				p="$4"
				alignItems="center"
				gap="$4"
				borderWidth={1}
				rounded="$md"
				borderColor="$coolGray300"
			>
				<MaterialIcon name="devices-other" size={30} color="gray" />
				<VStack>
					<Heading size="sm" color="$coolGray500">
						{name}
					</Heading>
				</VStack>
			</HStack>
		</Pressable>
	);
};
export default Device;
