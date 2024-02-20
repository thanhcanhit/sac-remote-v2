import {
	Avatar,
	AvatarFallbackText,
	Box,
	HStack,
	Heading,
	Pressable,
	Text,
	View,
} from "@gluestack-ui/themed";
import React, { useContext, useEffect, useState } from "react";
import { LangContext } from "../../Context/lang";
import AntDesign from "react-native-vector-icons/AntDesign";
import SettingActionSheet from "./SettingActionSheet";
import HomeBanner from "./HomeBanner";
import storage, { USER_INFO_KEY } from "../../storage/storage";
import InfoModal from "./InfoModal";
import LanguageModal from "./LanguageModal";

type UserInfo = {
	name: string;
};
const Home = () => {
	const { trans } = useContext(LangContext);
	const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<UserInfo>({ name: "" });
	const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);
	const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);

	const saveUserInfoToLocalStorage = (userInfo: UserInfo) => {
		storage.save({ key: USER_INFO_KEY, data: userInfo });
	};

	const updateName = (name: string) => {
		setUserInfo({ ...userInfo, name });
		setShowUserInfoModal(false);
		saveUserInfoToLocalStorage({ ...userInfo, name });
	};

	// Get data in local storage
	useEffect(() => {
		const getUserInfoLocalStorage = async () => {
			try {
				const userInfoRaw = await storage.load({ key: USER_INFO_KEY });

				setUserInfo(userInfoRaw);
				setShowUserInfoModal(!userInfoRaw.name);
			} catch (err) {}
		};

		getUserInfoLocalStorage();
	}, []);

	return (
		<View>
			<Heading size="md" bold textAlign="center" color="$coolGray600">
				{trans({ en: "Home", vi: "Trang chủ" })}
			</Heading>

			<Box px="$4" p="$2">
				<HStack alignItems="center" justifyContent="space-between">
					<HStack alignItems="center" gap="$2">
						<Avatar bgColor="$amber600" size="sm" borderRadius="$full">
							<AvatarFallbackText>{userInfo.name}</AvatarFallbackText>
						</Avatar>
						<Box>
							<Text>
								{trans({ en: "Welcome back", vi: "Chào mừng bạn trở lại" })},
							</Text>
							<Text bold>{userInfo.name}</Text>
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

			<SettingActionSheet
				isOpen={showActionSheet}
				onClose={() => setShowActionSheet(false)}
				actions={[
					{
						name: { en: "Update username", vi: "Cập nhật người dùng" },
						onAction: () => {
							setShowUserInfoModal(true);
							setShowActionSheet(false);
						},
					},
					{
						name: { en: "Change language", vi: "Thay đổi ngôn ngữ" },
						onAction: () => {
							setShowLanguageModal(true);
							setShowActionSheet(false);
						},
					},
				]}
			/>

			<InfoModal
				initial={userInfo.name}
				show={showUserInfoModal}
				onSubmit={updateName}
				onClose={() => {
					setShowUserInfoModal(false);
				}}
			/>

			<LanguageModal
				show={showLanguageModal}
				onClose={() => setShowLanguageModal(false)}
			/>
		</View>
	);
};

export default Home;
