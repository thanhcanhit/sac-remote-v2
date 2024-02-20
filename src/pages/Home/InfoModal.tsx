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

type InfoModalProps = {
	initial: string;
	show: boolean;
	onSubmit: (name: string) => void;
	onClose: VoidFunction;
};

const InfoModal = ({ show, onSubmit, onClose, initial }: InfoModalProps) => {
	const { trans } = useContext(LangContext);
	const [value, setValue] = useState<string>(initial);

	const setNewValue = (text: string) => {
		if (text.length <= 20) setValue(text);
	};

	const handleSubmit = () => {
		if (value.length > 3) onSubmit(value);
	};

	const handleClose = () => {
		if (!value || value.length <= 3)
			onSubmit(trans({ en: "User", vi: "Người dùng" }));
		else onSubmit(value);
		onClose();
	};

	return (
		<Modal isOpen={show} onClose={handleClose}>
			<ModalBackdrop />
			<ModalContent>
				<ModalHeader>
					<Heading size="lg" color="$primary500">
						{trans({ en: "Welcome to SAC", vi: "Chào mừng đến với SAC" })}
					</Heading>
					<ModalCloseButton onPress={handleClose}>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>
				<ModalBody>
					<Text italic size="sm" color="$coolGray500">
						{trans({
							en: "To understand you better, let us know:",
							vi: "Để hiểu bạn hơn hãy cho chúng tối biết:",
						})}
					</Text>

					<VStack mt="$2">
						<Text lineHeight="$xs" size="sm" bold>
							{trans({ en: "Your name", vi: "Tên của bạn" })}
						</Text>
						<Input
							mt="$1"
							variant="outline"
							size="md"
							isDisabled={false}
							isInvalid={value.length < 4}
							isReadOnly={false}
						>
							<InputField
								value={value}
								onChangeText={(input) => {
									setNewValue(input);
								}}
								placeholder={trans({
									en: "ex: Thomas Edu..",
									vi: "vd: Chương Nhược Nam...",
								})}
							/>
							<InputSlot>
								<Text size="xs" mr="$1">
									{value.length}/20
								</Text>
							</InputSlot>
						</Input>
					</VStack>
				</ModalBody>
				<ModalFooter>
					<Button
						w="$full"
						size="sm"
						action="primary"
						borderWidth="$0"
						onPress={handleSubmit}
					>
						<ButtonText>{trans({ en: "Submit", vi: "Xác nhận" })}</ButtonText>
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default InfoModal;
