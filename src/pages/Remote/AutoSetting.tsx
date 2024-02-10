import {
	Badge,
	BadgeText,
	Box,
	Button,
	ButtonIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	Divider,
	HStack,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import React, { Dispatch, useContext } from "react";
import { LangContext, MultilangContent } from "../../Context/lang";
import MaterialICon from "react-native-vector-icons/MaterialIcons";

type AutoSettingProps = {
	name: MultilangContent;
	icon: React.ReactElement;
	color?: string;
	offValue: number;
	onValue: number;
	setOffValue: Dispatch<React.SetStateAction<number>>;
	setOnValue: Dispatch<React.SetStateAction<number>>;
	range: { min: number; max: number };
};

const AutoSetting = ({
	name,
	icon,
	color,
	offValue,
	onValue,
	setOffValue,
	setOnValue,
	range,
}: AutoSettingProps) => {
	const { trans } = useContext(LangContext);

	const decrease = (setFunction: Dispatch<React.SetStateAction<number>>) => {
		setFunction((prev) => {
			const newState = prev - 1;
			if (newState < range.min) return prev;

			return newState;
		});
	};

	const increase = (setFunction: Dispatch<React.SetStateAction<number>>) => {
		setFunction((prev) => {
			const newState = prev + 1;
			if (newState > range.max) return prev;

			return newState;
		});
	};

	return (
		<Box
			mt="$1"
			borderWidth={2}
			p="$2"
			rounded="$md"
			$active-bgColor="$backgroundDark100"
			borderColor="$coolGray200"
		>
			<HStack gap="$2" justifyContent="space-around">
				<VStack justifyContent="center" alignItems="center">
					{icon}
					<Text size="xs" bold color={color}>
						{trans(name)}
					</Text>
				</VStack>
				<Divider orientation="vertical" />
				<HStack gap="$2">
					{/* Turn off */}
					<VStack alignItems="center">
						<Button
							size="sm"
							action="primary"
							rounded="$md"
							$active-bgColor="$backgroundDark100"
							variant="outline"
							disabled={offValue === range.min}
							onPress={() => {
								increase(setOffValue);
							}}
						>
							<ButtonIcon as={ChevronUpIcon} color="$primary500" />
						</Button>
						<Text bold>{offValue}</Text>
						<Button
							size="sm"
							action="primary"
							rounded="$md"
							$active-bgColor="$backgroundDark100"
							variant="outline"
							disabled={offValue === range.max}
							onPress={() => {
								decrease(setOffValue);
							}}
						>
							<ButtonIcon as={ChevronDownIcon} color="$primary500" />
						</Button>
						<Badge size="sm" mt="$1" variant="solid" action="error">
							<BadgeText>{trans({ en: "Turn off", vi: "Tắt" })}</BadgeText>
						</Badge>
					</VStack>

					{/* Turn On */}
					<VStack alignItems="center">
						<Button
							size="sm"
							action="primary"
							rounded="$md"
							$active-bgColor="$backgroundDark100"
							variant="outline"
							disabled={onValue === range.min}
							onPress={() => {
								increase(setOnValue);
							}}
						>
							<ButtonIcon as={ChevronUpIcon} color="$primary500" />
						</Button>
						<Text bold>{onValue}</Text>
						<Button
							size="sm"
							action="primary"
							rounded="$md"
							$active-bgColor="$backgroundDark100"
							variant="outline"
							disabled={onValue === range.max}
							onPress={() => {
								decrease(setOnValue);
							}}
						>
							<ButtonIcon as={ChevronDownIcon} color="$primary500" />
						</Button>
						<Badge size="sm" mt="$1" variant="solid" action="success">
							<BadgeText>{trans({ en: "Turn on", vi: "Bật" })}</BadgeText>
						</Badge>
					</VStack>
				</HStack>
			</HStack>
		</Box>
	);
};

export default AutoSetting;
