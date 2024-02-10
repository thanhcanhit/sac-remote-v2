import {
	Center,
	HStack,
	Heading,
	VStack,
	Box,
	Text,
	Link,
	Divider,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicon from "react-native-vector-icons/Ionicons";

const HomeBanner = () => {
	const animatedValue = useRef(new Animated.Value(0)).current;
	const animatedLoop = useRef(
		Animated.loop(
			Animated.timing(animatedValue, {
				toValue: 360,
				duration: 1500,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		)
	).current;

	useEffect(() => {
		animatedLoop.start();
		return () => {
			animatedLoop.stop();
		};
	}, [animatedLoop]);
	return (
		<>
			<LinearGradient
				colors={["#4AA9FF", "#1A91FF"]}
				start={[0, 0]}
				end={[1, 1]}
				style={{
					borderTopRightRadius: 16,
					borderTopLeftRadius: 16,
					borderBottomRightRadius: 4,
					borderBottomLeftRadius: 4,
					marginHorizontal: 8,
				}}
			>
				<Center width="$full" height={150}>
					<HStack alignItems="center" gap="$2">
						<Heading size="lg" bold color="$white" textTransform="uppercase">
							Smart Aircon Clothing
						</Heading>
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
							<MaterialCommunityIcon name="fan" color="#fff" size={25} />
						</Animated.View>
					</HStack>
					<Text color="$white">Make you cool move</Text>
				</Center>
			</LinearGradient>
			<Box position="relative" top={-12}>
				<HStack
					p="$3"
					px="$4"
					mx="$4"
					bgColor="$white"
					borderColor="$coolGray300"
					justifyContent="space-between"
					borderWidth={1}
					rounded="$lg"
				>
					<Link
						w="50%"
						href="fb://facewebmodal/f?href=https://www.facebook.com/sacvietnam21"
					>
						<HStack alignItems="center" gap="$2" justifyContent="center">
							<Ionicon name="logo-facebook" color="#316FF6" size={20} />
							<Text color="$primary500" bold>
								Fanpage
							</Text>
						</HStack>
					</Link>
					<Divider orientation="vertical" />
					<Link w="50%" href="https://sacvietnam.github.io/">
						<HStack alignItems="center" gap="$2" justifyContent="center">
							<Text color="$primary500" bold>
								Website
							</Text>
							<MaterialCommunityIcon
								name="shield-home"
								color="#316FF6"
								size={20}
							/>
						</HStack>
					</Link>
				</HStack>
			</Box>
		</>
	);
};

export default HomeBanner;
