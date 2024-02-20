import {
	Center,
	HStack,
	Heading,
	Box,
	Text,
	Link,
	Divider,
	VStack,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Ionicon from "react-native-vector-icons/Ionicons";
import { motify } from "moti";
import { MotiPressable, useMotiPressable } from "moti/interactions";

const MotiBox = motify(Box)();

const HomeBanner = () => {
	return (
		<>
			<LinearGradient
				colors={["#4AA9FF", "#1A91FF"]}
				start={[0, 0]}
				end={[1, 1]}
			>
				<Center width="$full" height={120}>
					<HStack alignItems="center" gap="$2">
						<Heading size="md" bold color="$white" textTransform="uppercase">
							Smart Aircon Clothing
						</Heading>
					</HStack>
					<Text color="$white" italic size="sm">
						Make you cool move
					</Text>
				</Center>
			</LinearGradient>
			<MotiBox
				animate={{
					transform: [
						{
							translateY: [2, -2],
						},
					],
				}}
				transition={{
					delay: 0,
					type: "timing",
					duration: 2000,
					loop: true,
				}}
				position="relative"
				top={-24}
				hardShadow="4"
			>
				<MotiPressable
					animate={({ hovered, pressed }) => {
						"worklet";

						return {
							scale: hovered || pressed ? 0.5 : 1,
						};
					}}
				>
					<HStack
						p="$3"
						px="$4"
						mx="$4"
						bgColor="$white"
						borderColor="$coolGray300"
						justifyContent="space-between"
						borderWidth={2}
						rounded="$lg"
					>
						<Link
							w="50%"
							// href="fb://facewebmodal/f?href=https://www.facebook.com/sacvietnam21"
						>
							<VStack alignItems="center" gap="$1" justifyContent="center">
								<Ionicon name="logo-facebook" color="#316FF6" size={20} />
								<Text color="$primary500" size="sm">
									Fanpage
								</Text>
							</VStack>
						</Link>
						<Divider orientation="vertical" />
						<Link w="50%" href="https://sacvietnam.github.io/">
							<VStack alignItems="center" gap="$1" justifyContent="center">
								<Ionicon name="home" color="#316FF6" size={20} />
								<Text color="$primary500" size="sm">
									Website
								</Text>
							</VStack>
						</Link>
					</HStack>
				</MotiPressable>
			</MotiBox>
		</>
	);
};

export default HomeBanner;
