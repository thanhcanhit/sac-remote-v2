import {
	Box,
	Button,
	ButtonIcon,
	ButtonText,
	CheckIcon,
	HStack,
	Icon,
} from "@gluestack-ui/themed";
import React, { useContext, useState } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AutoSetting from "./AutoSetting";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { LangContext } from "../../Context/lang";
import { AnimatePresence, motify } from "moti";

const MotiHStack = motify(HStack)();
const MotiBox = motify(Box)();

const AutoSettingBlock = () => {
	const [showAutoSetting, setShowAutoSetting] = useState<boolean>(false);
	const { trans } = useContext(LangContext);
	return (
		<>
			<AnimatePresence exitBeforeEnter>
				{showAutoSetting ? (
					<MotiHStack
						gap="$2"
						from={{ opacity: 0, translateX: -8 }}
						animate={{ opacity: 1, translateX: 0 }}
						exit={{ opacity: 0, translateX: 8 }}
					>
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
					</MotiHStack>
				) : (
					<MotiBox from={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
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
					</MotiBox>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{showAutoSetting && (
					<MotiBox
						from={{ opacity: 0, translateY: 20 }}
						animate={{ opacity: 1, translateY: 0 }}
						exit={{ opacity: 0, translateY: 20 }}
					>
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
					</MotiBox>
				)}
			</AnimatePresence>
		</>
	);
};

export default AutoSettingBlock;
