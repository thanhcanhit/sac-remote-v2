import { Box, Button, ButtonText } from "@gluestack-ui/themed";
import { AnimatePresence, motify } from "moti";
import React, { useContext, useState } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { LangContext } from "../../Context/lang";
import AutoSetting from "./AutoSetting";
import { BleContext } from "../../Context/ble";
import Ionicons from "react-native-vector-icons/Ionicons";

const MotiBox = motify(Box)();

const thermalRange = { min: 0, max: 50 };
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
			{!showAutoSetting && (
				<AnimatePresence>
					<MotiBox
						from={{ opacity: 0, translateY: -20 }}
						animate={{ opacity: 1, translateY: 0 }}
						exit={{ opacity: 0, translateY: 20 }}
					>
						<Button
							onPress={() => {
								setShowAutoSetting(true);
							}}
						>
							<ButtonText>
								{trans({ en: "Change setting", vi: "Cài đặt" })}
							</ButtonText>
						</Button>
					</MotiBox>
				</AnimatePresence>
			)}
			{showAutoSetting && (
				<AnimatePresence>
					<MotiBox
						from={{ opacity: 0, translateY: 20 }}
						animate={{ opacity: 1, translateY: 0 }}
						exit={{ opacity: 0, translateY: 20 }}
					>
						<Button
							mt="$1"
							onPress={() => {
								setShowAutoSetting(false);
								handleSaveSetting();
							}}
						>
							<ButtonText>
								{trans({ en: "Save", vi: "Lưu cài đặt" })}
							</ButtonText>
						</Button>
						<AutoSetting
							name={{
								en: "Auto by thermal (℃)",
								vi: "Tự động theo nhiệt độ (℃)",
							}}
							offValue={thermalOff}
							onValue={thermalOn}
							range={thermalRange}
							setOffValue={setThermalOff}
							setOnValue={setThermalOn}
							color="red"
							icon={
								<FontAwesome6 name="temperature-three-quarters" color={"red"} />
							}
						/>
						<AutoSetting
							name={{
								en: "Auto by humidity (%)",
								vi: "Tự động theo độ ẩm (%)",
							}}
							offValue={humiOff}
							onValue={humiOn}
							quantityChange={5}
							range={humidityRange}
							setOffValue={setHumiOff}
							setOnValue={setHumiOn}
							color="$primary400"
							icon={<Ionicons name="water" color="#1A91FF" />}
						/>
					</MotiBox>
				</AnimatePresence>
			)}
		</>
	);
};

export default React.memo(AutoSettingBlock);
