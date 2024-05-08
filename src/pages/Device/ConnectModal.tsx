import {
	Box,
	Button,
	ButtonText,
	CloseIcon,
	HStack,
	Heading,
	Icon,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ScrollView,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import { useContext } from "react";
import { Device } from "react-native-ble-plx";
import { LangContext } from "../../Context/lang";

type ConnectModalProps = {
	device: Device | null;
	isOpen: boolean;
	onClose: VoidFunction;
	onCancel: VoidFunction;
};

const ConnectModal = ({
	device,
	isOpen,
	onClose,
	onCancel,
}: ConnectModalProps) => {
	const { trans } = useContext(LangContext);
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalBackdrop />
			<ModalContent>
				<ModalHeader>
					<Heading size="lg">
						{trans({ en: "Device Infomation", vi: "Thông tin thiết bị" })}
					</Heading>
					<ModalCloseButton>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>
				<ModalBody>
					<ScrollView>
						<HStack gap="$1">
							<Text bold>Device name:</Text>
							<Text>{device?.name}</Text>
						</HStack>
						<HStack gap="$1">
							<Text bold>Identify:</Text>
							<Text>{device?.id}</Text>
						</HStack>
						<HStack gap="$1">
							<Text bold>MTU:</Text>
							<Text>{device?.mtu || "no"}</Text>
						</HStack>
						<HStack gap="$1">
							<Text bold>Local Name:</Text>
							<Text>{device?.localName || "no"}</Text>
						</HStack>
						<HStack gap="$1">
							<Text bold>Connectable:</Text>
							<Text>{device?.isConnectable}</Text>
						</HStack>
					</ScrollView>
				</ModalBody>
				<ModalFooter>
					<Button
						variant="outline"
						size="sm"
						action="secondary"
						mr="$3"
						onPress={onCancel}
					>
						<ButtonText>{trans({ en: "Close", vi: "Đóng" })}</ButtonText>
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ConnectModal;
