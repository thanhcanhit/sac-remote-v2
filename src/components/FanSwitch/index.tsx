import { Pressable } from "@gluestack-ui/themed";
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import FanSVG from "../../assets/svgs/fan.svg";

type FanSwitchProps = {
	state: boolean;
	onPress: React.Dispatch<React.SetStateAction<boolean>>;
};

const FanSwitch = ({ state, onPress: onChange }: FanSwitchProps) => {
	const animatedValue = useRef(new Animated.Value(0)).current;
	const animatedLoop = useRef(
		Animated.loop(
			Animated.timing(animatedValue, {
				toValue: 360,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		)
	).current;

	const handlePress = () => {
		onChange(!state);
		if (state) {
			animatedValue.stopAnimation(); // Dừng animation trước
			animatedValue.setValue(0); // Reset giá trị
			animatedLoop.start(); // Bắt đầu vòng lặp animation
		} else {
			animatedLoop.stop(); // Dừng vòng lặp animation
		}
	};

	useEffect(() => {
		if (!state) animatedLoop.stop();
		else animatedLoop.start();
		return () => {
			animatedLoop.stop(); // Dừng vòng lặp animation khi component unmount
		};
	}, [animatedLoop, state]);

	return (
		<Pressable
			onPress={handlePress}
			rounded="$full"
			backgroundColor="$white"
			softShadow="1"
			width={50}
		>
			<Animated.View
				style={[
					{
						padding: 4,
						transform: [
							{
								rotate: animatedValue.interpolate({
									inputRange: [0, 360],
									outputRange: ["0deg", "360deg"],
								}),
							},
						],
					},
				]}
			>
				<FanSVG
					width={40}
					height={40}
					color="#1A91FF"
					style={{ position: "relative", transform: [{ translateY: 1 }] }}
				/>
			</Animated.View>
		</Pressable>
	);
};

export default React.memo(FanSwitch);
