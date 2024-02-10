import {
	Modal,
	ModalBackdrop,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	CloseIcon,
	ModalBody,
	Icon,
	ModalFooter,
	Button,
	ButtonText,
	Heading,
	Text,
} from "@gluestack-ui/themed";
import { useContext } from "react";
import { LangContext } from "../../Context/lang";

type ConnectModalProps = {
	isOpen: boolean;
	onClose: VoidFunction;
	onSubmit: VoidFunction;
	onCancel: VoidFunction;
};

const ConnectModal = ({
	isOpen,
	onClose,
	onSubmit,
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
					<Text>
						Elevate user interactions with our versatile modals. Seamlessly
						integrate notifications, forms, and media displays. Make an impact
						effortlessly.
					</Text>
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
