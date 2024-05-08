import {
	Box,
	Button,
	ButtonIcon,
	ButtonText,
	CheckIcon,
	HStack,
	Icon,
} from "@gluestack-ui/themed";
import { AnimatePresence, motify } from "moti";
import React, { useContext, useState } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { LangContext } from "../../Context/lang";
import AutoSetting from "./AutoSetting";
import { BleContext } from "../../Context/ble";

const MotiHStack = motify(HStack)();
const MotiBox = motify(Box)();

const thermalRange = { min: 20, max: 40 };
const humidityRange = { min: 0, max: 100 };

const AutoSettingBlock = () => {
	const [showAutoSetting, setShowAutoSetting] = useState<boolean>(false);
	const { trans } = useContext(LangContext);
	const ble = useContext(BleContext);

	const [thermalOn, setThermalOn] = useState<number>(
		ble.settingTemp.turnOn || 28
	);
	const [thermalOff, setThermalOff] = useState<number>(
		ble.settingTemp.turnOff || 20
	);
	const [humiOn, setHumiOn] = useState<number>(ble.settingHumi.turnOn || 50);
	const [humiOff, setHumiOff] = useState<number>(ble.settingHumi.turnOff || 20);

	const handleSaveSetting = () => {
		ble.setNewSettingTemp({ turnOn: thermalOn, turnOff: thermalOff });
		ble.setNewSettingHumi({ turnOn: humiOn, turnOff: humiOff });
	};

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
								handleSaveSetting();
								setShowAutoSetting(false);
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
							offValue={thermalOff}
							onValue={thermalOn}
							range={thermalRange}
							setOffValue={setThermalOff}
							setOnValue={setThermalOn}
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
							offValue={humiOff}
							onValue={humiOn}
							quantityChange={5}
							range={humidityRange}
							setOffValue={setHumiOff}
							setOnValue={setHumiOn}
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

export default React.memo(AutoSettingBlock);
