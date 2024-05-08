import { Box, Divider, HStack, Text, VStack } from "@gluestack-ui/themed";
import React, { Dispatch, useContext } from "react";
import { LangContext, MultilangContent } from "../../Context/lang";
import ValueWithChangeButton from "./ValueWithChangeButton";

type AutoSettingProps = {
	name: MultilangContent;
	icon: React.ReactElement;
	color?: string;
	offValue: number;
	onValue: number;
	setOffValue: Dispatch<React.SetStateAction<number>>;
	setOnValue: Dispatch<React.SetStateAction<number>>;
	range: { min: number; max: number };
	quantityChange?: number;
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
	quantityChange,
}: AutoSettingProps) => {
	const { trans } = useContext(LangContext);

	const amount = quantityChange ? quantityChange : 1;

	const decrease = (setFunction: Dispatch<React.SetStateAction<number>>) => {
		setFunction((prev) => prev - amount);
	};

	const increase = (setFunction: Dispatch<React.SetStateAction<number>>) => {
		setFunction((prev) => prev + amount);
	};

	return (
		<Box
			mt="$2"
			borderWidth={1}
			p="$2"
			rounded="$md"
			$active-bgColor="$backgroundDark100"
			borderColor="$coolGray400"
		>
			<HStack gap="$2" justifyContent="space-around">
				<VStack justifyContent="center" alignItems="center">
					{icon}
					<Text size="xs" bold color={color} opacity={0.6}>
						{trans(name)}
					</Text>
				</VStack>
				<Divider orientation="vertical" />
				<HStack gap="$2">
					{/* Turn On */}
					<ValueWithChangeButton
						value={onValue}
						badgeText={trans({ en: "turn on", vi: "Bật" })}
						disableDecrease={onValue == range.min}
						disableIncrease={onValue == range.max}
						onDecrease={() => decrease(setOnValue)}
						onIncrease={() => increase(setOnValue)}
					/>
					{/* Turn off */}
					<ValueWithChangeButton
						isNegative
						value={offValue}
						badgeText={trans({ en: "turn off", vi: "Tắt" })}
						disableDecrease={offValue == range.min}
						disableIncrease={offValue == range.max}
						onDecrease={() => decrease(setOffValue)}
						onIncrease={() => increase(setOffValue)}
					/>
				</HStack>
			</HStack>
		</Box>
	);
};

export default React.memo(AutoSetting);
