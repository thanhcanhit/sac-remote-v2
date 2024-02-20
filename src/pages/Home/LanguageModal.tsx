import {
	Button,
	ButtonText,
	CloseIcon,
	Icon,
	Input,
	InputField,
	InputSlot,
	ModalBody,
	ModalFooter,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import {
	Heading,
	Modal,
	ModalBackdrop,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
} from "@gluestack-ui/themed";
import React, { useContext, useState } from "react";
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
			<ModalContent>
				<ModalHeader>
					<Heading size="md">
						{trans({ en: "Select your language", vi: "Chọn ngôn ngữ của bạn" })}
					</Heading>
					<ModalCloseButton onPress={onClose}>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>
				<ModalBody>
					<VStack mt="$2" gap="$2">
						<Button
							variant="outline"
							onPress={() => {
								setLang("en");
								onClose();
							}}
						>
							<ButtonText>English</ButtonText>
						</Button>
						<Button
							variant="outline"
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
