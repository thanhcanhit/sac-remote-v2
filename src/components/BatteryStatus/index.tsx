import { Box } from "@gluestack-ui/themed";
import React from "react";

type BatteryBarType = {
	value: number;
};

const BatteryStatus = ({ value }: BatteryBarType) => {
	// Validate value
	if (value < 0) value = 0;
	if (value > 100) value = 100;

	// Get color matching with value of battery
	const bgColor = (() => {
		if (value <= 25) return "#fb7185";
		else if (value <= 65) return "#facc15";
		else return "#34d399";
	})();

	return (
		<Box
			height={25}
			width={50}
			padding="$1"
			rounded="$full"
			backgroundColor="$coolGray200"
			style={{ overflow: "hidden" }}
		>
			<Box
				backgroundColor={bgColor}
				height="100%"
				width={`${value}%`}
				rounded="$full"
				style={{ minWidth: 8 }}
			></Box>
		</Box>
	);
};
export default BatteryStatus;
