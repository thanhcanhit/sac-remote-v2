import { useContext } from "react";
import { InfoData } from ".";
import { LangContext } from "../../Context/lang";
import { LinearGradient } from "expo-linear-gradient";
import { Box, ButtonText, Pressable } from "@gluestack-ui/themed";

const InfoButton = ({
	info,
	isActive,
	onPress,
}: {
	info: InfoData;
	isActive?: boolean;
	onPress?: VoidFunction;
}) => {
	const { trans } = useContext(LangContext);
	return (
		<LinearGradient
			colors={["#4AA9FF", "#1A91FF"]}
			start={[0, 0]}
			end={[1, 1]}
			style={{ borderRadius: 12 }}
		>
			<Pressable
				flexDirection="column"
				padding="$3"
				py="$4"
				width={100}
				height={100}
				rounded="$lg"
				backgroundColor={isActive ? "$darkBlue500" : "transparent"}
				justifyContent="space-between"
				alignItems="flex-start"
				borderWidth="$2"
				borderColor="$primary200"
				sx={{
					":active": {
						backgroundColor: "$primary200",
						opacity: 0.6,
					},
				}}
				disabled={isActive}
				onPress={onPress}
			>
				<Box>{info.icon}</Box>
				<ButtonText size="sm">{trans(info.label)}</ButtonText>
			</Pressable>
		</LinearGradient>
	);
};

export default InfoButton;
