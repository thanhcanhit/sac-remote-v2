import {
	Avatar,
	AvatarFallbackText,
	Box,
	Center,
	Divider,
	HStack,
	Heading,
	Link,
	Pressable,
	Text,
	View,
} from "@gluestack-ui/themed";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LangContext } from "../../Context/lang";
import AntDesign from "react-native-vector-icons/AntDesign";
import SettingActionSheet from "./SettingActionSheet";
import { LinearGradient } from "expo-linear-gradient";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Animated, Easing } from "react-native";
import HomeBanner from "./HomeBanner";
import VideoPlayer from "./VideoPlayer";

const Home = () => {
	const { trans } = useContext(LangContext);
	const [showActionSheet, setShowActionSheet] = useState<boolean>(false);

	return (
		<View>
			<Heading size="md" bold textAlign="center" color="$coolGray600">
				{trans({ en: "Home", vi: "Trang chủ" })}
			</Heading>

			<Box px="$4" p="$2">
				<HStack alignItems="center" justifyContent="space-between">
					<HStack alignItems="center" gap="$2">
						<Avatar bgColor="$amber600" size="sm" borderRadius="$full">
							<AvatarFallbackText>Thanh Canh</AvatarFallbackText>
						</Avatar>
						<Box>
							<Text>
								{trans({ en: "Welcome back", vi: "Chào mừng bạn trở lại" })},
							</Text>
							<Text bold>Thanh Canh</Text>
						</Box>
					</HStack>
					<Pressable
						$active-bgColor="$coolGray200"
						rounded="$md"
						onPress={() => setShowActionSheet(true)}
					>
						<AntDesign name="setting" size={25} />
					</Pressable>
				</HStack>
			</Box>

			<HomeBanner />

				<VideoPlayer />
			<SettingActionSheet
				isOpen={showActionSheet}
				onClose={() => setShowActionSheet(false)}
				actions={[
					{
						name: { en: "Update username", vi: "Cập nhật người dùng" },
						onAction: () => {},
					},
					{
						name: { en: "Change language", vi: "Thay đổi ngôn ngữ" },
						onAction: () => {},
					},
				]}
			/>
		</View>
	);
};

export default Home;
