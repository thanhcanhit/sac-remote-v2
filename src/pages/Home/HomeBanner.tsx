import {
	Box,
	Center,
	Divider,
	HStack,
	Heading,
	Link,
	Text,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { motify } from "moti";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicon from "react-native-vector-icons/Ionicons";

const MotiBox = motify(Box)();

const HomeBanner = () => {
	return (
		<>
			<LinearGradient
				colors={["#4AA9FF", "#1A91FF"]}
				start={[0, 0]}
				end={[1, 1]}
			>
				<Center width="$full" height={230}>
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
			<MotiBox position="relative" top={-24} hardShadow="2">
				<HStack
					p="$3"
					px="$4"
					mx="$2"
					minHeight={50}
					alignItems="center"
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
							<Text color="$primary500" size="sm">
								Fanpage
							</Text>
						</HStack>
					</Link>
					<Divider orientation="vertical" />
					<Link w="50%" href="https://sacvietnam.github.io/">
						<HStack alignItems="center" gap="$2" justifyContent="center">
							<AntDesign name="cloud" color="#316FF6" size={20} />
							<Text color="$primary500" size="sm">
								Website
							</Text>
						</HStack>
					</Link>
				</HStack>
			</MotiBox>
		</>
	);
};

export default HomeBanner;
