import {
	Alert,
	AlertIcon,
	AlertText,
	Badge,
	BadgeText,
	Box,
	HStack,
	Heading,
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
import React, { Fragment, useContext, useMemo, useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { BleContext } from "../../Context/ble";
import { LangContext, MultilangContent } from "../../Context/lang";
import BatteryStatus from "../../components/BatteryStatus";
import HalfCirlceProgress from "../../components/HalfCircleProgress";
import AutoSettingBlock from "./AutoSettingBlock";
import InfoButton from "./InfoButton";

export type InfoName = "temperature" | "humidity" | "battery";
export type InfoData = {
	id: InfoName;
	label: MultilangContent;
	icon: React.ReactElement;
	minValue: number;
	maxValue: number;
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
		minValue: 20,
		maxValue: 40,
	},
	{
		id: "humidity",
		label: { en: "Humidity", vi: "Độ ẩm" },
		icon: (
			<MaterialCommunityIcon name="water-outline" size={30} color="white" />
		),
		minValue: 0,
		maxValue: 100,
	},
	{
		id: "battery",
		label: { en: "Battery", vi: "Lượng pin" },
		icon: (
			<MaterialCommunityIcon name="battery-outline" size={30} color="white" />
		),
		minValue: 0,
		maxValue: 100,
	},
];

const Remote = () => {
	const { trans } = useContext(LangContext);
	const [currentView, setCurrentView] = useState<InfoName>("temperature");
	const ble = useContext(BleContext);

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
					? { ...info, icon: <BatteryStatus value={ble.battery} /> }
					: info
			}
		/>
	));

	const currentInfoItem: InfoData | undefined = useMemo(
		() => infoList.find((item) => item.id === currentView),
		[currentView]
	);

	const currentValue = useMemo(() => {
		switch (currentInfoItem?.id) {
			case "battery":
				return ble.battery;
			case "humidity":
				return ble.humidity;
			case "temperature":
				return ble.temperature;
			default:
				return 15;
		}
	}, [currentInfoItem]);

	if (!currentInfoItem) return <Fragment />;

	return (
		<Box flex={1} >
			<Heading size="md" bold textAlign="center" my={4} color="$coolGray600">
				{trans({ en: "Remote Panel", vi: "Bảng điều khiển" })}
			</Heading>

			<ScrollView minHeight="$full">
				<HStack p="$1" px="$4" justifyContent="space-between">
					<VStack justifyContent="flex-start" alignItems="center" gap="$1">
						<Badge size="sm">
							<BadgeText bold>{trans({ en: "Power", vi: "Nguồn" })}</BadgeText>
						</Badge>
						<Switch
							disabled={ble.auto}
							size="md"
							value={ble.power}
							onToggle={() => {
								ble.setNewPower(!ble.power);
							}}
						/>
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
							value={ble.control}
							defaultValue={1}
							step={1}
							minValue={1}
							maxValue={3}
							size="md"
							minWidth={120}
							orientation="horizontal"
							isDisabled={ble.auto}
							$disabled-bg="coolGray200"
							onChange={(value) => ble.setNewControl(value)}
						>
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>
							<SliderThumb />
						</Slider>
						<Text bold color="$primary500">
							{ble.control}
						</Text>
					</VStack>
				</HStack>

				<VStack mt="$2" px="$4" gap="$1">
					<HStack gap="$2">{InfoListRendered}</HStack>
					<Box my="$2">
						<HalfCirlceProgress
							value={currentValue}
							min={currentInfoItem?.minValue}
							max={currentInfoItem?.maxValue}
						/>
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
								<Switch
									value={ble.auto}
									onChange={() => ble.setNewAuto(!ble.auto)}
								/>
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
						<AutoSettingBlock />
					</Box>
				</VStack>
			</ScrollView>
		</Box>
	);
};

export default Remote;
