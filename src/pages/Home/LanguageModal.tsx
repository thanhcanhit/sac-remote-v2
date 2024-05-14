import {
	Button,
	ButtonText,
	CloseIcon,
	Heading,
	Icon,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	VStack,
} from "@gluestack-ui/themed";
import React, { useContext } from "react";
import { LangContext } from "../../Context/lang";

type LanguageModalProps = {
	show: boolean;
	onClose: VoidFunction;
};

const LanguageModal = ({ show, onClose }: LanguageModalProps) => {
	const { trans, setLang } = useContext(LangContext);

	return (
		<Modal isOpen={show} onClose={onClose}>
			<ModalBackdrop />
			<ModalContent p={8}>
				<ModalHeader>
					<Heading size="md">
						{trans({ en: "Select your language", vi: "Chọn ngôn ngữ của bạn" })}
					</Heading>
					<ModalCloseButton onPress={onClose}>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>
				<ModalBody pb={40} mt={24}>
					<VStack mt="$2" gap="$2">
						<Button
							variant="solid"
							rounded="$full"
							onPress={() => {
								setLang("en");
								onClose();
							}}
						>
							<ButtonText>English</ButtonText>
						</Button>
						<Button
							variant="solid"
							rounded="$full"
							onPress={() => {
								setLang("vi");
								onClose();
							}}
						>
							<ButtonText>Tiếng Việt</ButtonText>
						</Button>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default LanguageModal;
