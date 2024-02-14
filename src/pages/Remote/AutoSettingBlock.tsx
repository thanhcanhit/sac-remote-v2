import {
	Box,
	Button,
	ButtonIcon,
	ButtonText,
	CheckIcon,
	CloseIcon,
	HStack,
	Icon,
} from "@gluestack-ui/themed";
import React, { useContext, useState } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AutoSetting from "./AutoSetting";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { LangContext } from "../../Context/lang";
const AutoSettingBlock = () => {
	const [showAutoSetting, setShowAutoSetting] = useState<boolean>(false);
	const { trans } = useContext(LangContext);
	return (
		<Box>
			{showAutoSetting ? (
				<HStack gap="$2">
					<Button
						action="default"
						onPress={() => {
							setShowAutoSetting(false);
						}}
					>
						<ButtonText color="$coolGray400">
							{trans({
								en: "Cancel",
								vi: "Hủy bỏ",
							})}
						</ButtonText>
					</Button>
					<Button
						flex={1}
						gap="$1"
						action="primary"
						onPress={() => {
							setShowAutoSetting(true);
						}}
					>
						<ButtonIcon>
							<Icon as={CheckIcon} color="$white" />
						</ButtonIcon>
						<ButtonText>
							{trans({
								en: "Save",
								vi: "Lưu cài đặt",
							})}
						</ButtonText>
					</Button>
				</HStack>
			) : (
				<Button
					action="primary"
					onPress={() => {
						setShowAutoSetting(true);
					}}
				>
					<ButtonText>
						{trans({
							en: "Setting auto mode",
							vi: "Cài đặt chế độ tự động",
						})}
					</ButtonText>
				</Button>
			)}
			{showAutoSetting && (
				<>
					<AutoSetting
						name={{
							en: "Auto by thermal (℃)",
							vi: "TĐ theo nhiệt độ (℃)",
						}}
						offValue={25}
						onValue={20}
						range={{ min: 10, max: 40 }}
						setOffValue={() => {}}
						setOnValue={() => {}}
						color="red"
						icon={
							<FontAwesome6
								name="temperature-three-quarters"
								size={25}
								color={"red"}
							/>
						}
					/>

					<AutoSetting
						name={{
							en: "Auto by humidity (%)",
							vi: "TĐ theo độ ẩm (%)",
						}}
						offValue={25}
						onValue={20}
						range={{ min: 10, max: 40 }}
						setOffValue={() => {}}
						setOnValue={() => {}}
						color="$primary400"
						icon={
							<MaterialCommunityIcon
								name="water-percent"
								size={30}
								color="#1A91FF"
							/>
						}
					/>
				</>
			)}
		</Box>
	);
};

export default AutoSettingBlock;
