import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { LinearGradient } from "expo-linear-gradient";
import { Badge, BadgeText, Center, Text } from "@gluestack-ui/themed";

type HalfCirlceProgressProps = {
	value: number;
	min?: number;
	max?: number;
};

const HalfCirlceProgress = ({
	value,
	min = 0,
	max = 100,
}: HalfCirlceProgressProps) => {
	if (value < min || value > max) value = min;

	const fill = ((value - min) / (max - min)) * 100;

	return (
		<Center zIndex={-10}>
			<AnimatedCircularProgress
				size={200}
				width={15}
				backgroundWidth={24}
				fill={fill}
				arcSweepAngle={240}
				lineCap="round"
				tintColor="#1A91FF"
				backgroundColor="#e5e7eb"
				rotation={-120}
			>
				{(fill) => (
					<LinearGradient
						colors={["#4AA9FF", "#1A91FF"]}
						locations={[0.0244, 0.9869]}
						start={{ x: 0.03, y: 0 }}
						end={{ x: 0.97, y: 0 }}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
							width: 130,
							height: 130,
							borderRadius: 999,
						}}
					>
						<Text bold color="$white" size="4xl">
							{Math.round((fill / 100) * (max - min) + min)}
						</Text>

						<Badge
							size="md"
							variant="outline"
							borderRadius="$full"
							action="info"
							bottom="$3"
							left="$1"
							position="absolute"
						>
							<BadgeText bold>{min}</BadgeText>
						</Badge>
						<Badge
							size="md"
							variant="solid"
							borderRadius="$full"
							action="info"
							bottom="$3"
							borderWidth={1}
							right="$1"
							position="absolute"
						>
							<BadgeText bold>{max}</BadgeText>
						</Badge>
					</LinearGradient>
				)}
			</AnimatedCircularProgress>
		</Center>
	);
};

export default HalfCirlceProgress;
