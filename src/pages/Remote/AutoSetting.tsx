import {
	Badge,
	BadgeText,
	Box,
	HStack,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import React, { Dispatch, useContext } from "react";
import { LangContext, MultilangContent } from "../../Context/lang";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

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

	return (
		<Box mt="$2">
			<VStack>
				<Box
					padding={8}
					paddingHorizontal={24}
					borderWidth={1}
					$active-bgColor="$backgroundDark100"
					borderColor="$coolGray400"
					rounded="$lg"
				>
					<HStack justifyContent="center" alignItems="center" gap={8}>
						{<icon.type {...icon.props} size={20} />}
						<Text size="sm" bold textAlign="center">
							{trans(name)}
						</Text>
					</HStack>
					<MultiSlider
						values={[offValue, onValue]}
						min={range.min}
						max={range.max}
						step={amount}
						onValuesChange={(values) => {
							if (values[0] < values[1]) {
								setOffValue(values[0]);
								setOnValue(values[1]);
							}
						}}
						enabledTwo
						minMarkerOverlapDistance={amount}
						allowOverlap={false}
						snapped
						selectedStyle={{ backgroundColor: "#1d8dfd" }}
						isMarkersSeparated
						customMarkerLeft={(e) => {
							return (
								<Badge rounded="$lg" variant="outline" action="muted">
									<BadgeText>{e.currentValue}</BadgeText>
								</Badge>
							);
						}}
						customMarkerRight={(e) => {
							return (
								<Badge rounded="$lg" variant="outline" action="muted">
									<BadgeText>{e.currentValue}</BadgeText>
								</Badge>
							);
						}}
					/>
					<Text size="xs" textAlign="center">
						{trans({
							en: `Turn off when below ${offValue} and turn on when above ${onValue}`,
							vi: `Tắt khi dưới ${offValue} và bật khi trên ${onValue}`,
						})}
					</Text>
				</Box>
			</VStack>
		</Box>
	);
};

export default React.memo(AutoSetting);
