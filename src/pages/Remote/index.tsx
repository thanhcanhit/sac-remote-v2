import {
	Alert,
	AlertIcon,
	AlertText,
	Badge,
	BadgeText,
	Box,
	Button,
	ButtonIcon,
	ButtonText,
	CheckIcon,
	CloseIcon,
	HStack,
	Heading,
	Icon,
	InfoIcon,
	ScrollView,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Switch,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import React, { useContext, useState } from "react";
import { LangContext, MultilangContent } from "../../Context/lang";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BatteryStatus from "../../components/BatteryStatus";
import HalfCirlceProgress from "../../components/HalfCircleProgress";
import FanSwitch from "../../components/FanSwitch";
import MaterialICon from "react-native-vector-icons/MaterialIcons";
import AutoSetting from "./AutoSetting";
import InfoButton from "./InfoButton";

export type InfoName = "temperature" | "humidity" | "battery";
export type InfoData = {
	id: InfoName;
	label: MultilangContent;
	icon: React.ReactElement;
};

const infoList: InfoData[] = [
	{
		id: "temperature",
		label: { en: "Thermal", vi: "Nhiệt độ" },
		icon: (
			<MaterialCommunityIcon
				name="temperature-celsius"
				size={30}
				color="white"
			/>
		),
	},
	{
		id: "humidity",
		label: { en: "Humidity", vi: "Độ ẩm" },
		icon: (
			<MaterialCommunityIcon name="water-outline" size={30} color="white" />
		),
	},
	{
		id: "battery",
		label: { en: "Battery", vi: "Lượng pin" },
		icon: (
			<MaterialCommunityIcon name="battery-outline" size={30} color="white" />
		),
	},
];

const Remote = () => {
	const { trans } = useContext(LangContext);
	const [showActionsheet, setShowActionsheet] = useState(false);
	const [currentView, setCurrentView] = useState<InfoName>("temperature");
	const [showAutoSetting, setShowAutoSetting] = useState<boolean>(false);
	const handleClose = () => setShowActionsheet(!showActionsheet);

	const changeInfoView = (viewName: InfoName) => {
		setCurrentView(viewName);
	};

	const InfoListRendered = infoList.map((info) => (
		<InfoButton
			isActive={info.id == currentView}
			key={info.id}
			onPress={() => changeInfoView(info.id)}
			info={
				info.id === "battery"
					? { ...info, icon: <BatteryStatus value={100} /> }
					: info
			}
		/>
	));

	const AutoSettingBlock = (
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
				icon={<MaterialICon name="thermostat-auto" size={40} color={"red"} />}
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
						size={40}
						color="#1A91FF"
					/>
				}
			/>
		</>
	);

	return (
		<Box flex={1}>
			<Heading size="md" bold textAlign="center" color="$coolGray600">
				{trans({ en: "Remote", vi: "Điều khiển" })}
			</Heading>

			<ScrollView minHeight="$full">
				<HStack p="$1" px="$4" justifyContent="space-between">
					<VStack justifyContent="space-between" alignItems="center" gap="$1">
						<Badge size="sm">
							<BadgeText bold>{trans({ en: "Power", vi: "Nguồn" })}</BadgeText>
						</Badge>
						<FanSwitch state={true} onPress={() => {}} />
					</VStack>
					<VStack
						p="$1"
						px="$4"
						gap="$2"
						justifyContent="center"
						alignItems="center"
					>
						<Badge size="sm">
							<BadgeText bold>
								{trans({ en: "Fan speed", vi: "Tốc độ quạt" })}
							</BadgeText>
						</Badge>
						<Slider
							mt="$1"
							defaultValue={1}
							step={1}
							minValue={1}
							maxValue={3}
							size="md"
							minWidth={100}
							orientation="horizontal"
							isDisabled={false}
							isReversed={false}
						>
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>
							<SliderThumb />
						</Slider>
						<Text bold color="$primary500">
							3
						</Text>
					</VStack>
				</HStack>

				<VStack mt="$2" px="$4" gap="$1">
					<HStack gap="$2">{InfoListRendered}</HStack>
					<Box my="$2">
						<HalfCirlceProgress value={12} min={10} max={60} />
					</Box>
				</VStack>

				<VStack px="$4" p="$1">
					<Badge
						size="md"
						action="muted"
						flex={1}
						gap="$4"
						justifyContent="center"
					>
						<BadgeText bold>
							{trans({ en: "Automatic setting", vi: "Thiết lập tự động" })}
						</BadgeText>
					</Badge>

					{/* Automatic mode */}
					<Box gap="$1">
						<HStack justifyContent="space-between" mt="$2">
							<VStack alignItems="flex-start">
								<Switch value={false} />
								<Badge size="sm">
									<BadgeText bold>
										{trans({ en: "Automatic mode", vi: "Chế độ tự động" })}
									</BadgeText>
								</Badge>
							</VStack>

							<Alert
								mx="$2.5"
								action="info"
								variant="solid"
								height={70}
								flex={1}
							>
								<AlertIcon as={InfoIcon} mr="$3" />
								<AlertText size="xs">
									{trans({
										en: "In automatic mode, you can't power off or adjust fan speed.",
										vi: "Nếu tự động bật, bạn không thể tắt nguồn hoặc điều chỉnh tốc độ quạt.",
									})}
								</AlertText>
							</Alert>
						</HStack>
						{showAutoSetting ? (
							<HStack gap="$2">
								<Button
									action="secondary"
									gap="$1"
									onPress={() => {
										setShowAutoSetting(false);
									}}
								>
									<ButtonIcon>
										<Icon as={CloseIcon} color="$white" />
									</ButtonIcon>
									<ButtonText>
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
						{showAutoSetting && AutoSettingBlock}
					</Box>
				</VStack>
			</ScrollView>
		</Box>
	);
};

export default Remote;
