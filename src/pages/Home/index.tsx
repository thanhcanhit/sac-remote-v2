import {
	Box,
	HStack,
	Heading, Pressable,
	ScrollView,
	Text,
	View
} from "@gluestack-ui/themed";
import React, { useContext, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LangContext } from "../../Context/lang";
import AboutUs from "./AboutUs";
import HomeBanner from "./HomeBanner";
import LanguageModal from "./LanguageModal";
import SettingActionSheet from "./SettingActionSheet";

const Home = () => {
	const { trans } = useContext(LangContext);
	const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
	const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);

	return (
		<View>
			<Heading size="md" bold textAlign="center" my={4} color="$coolGray600">
				{trans({ en: "Home", vi: "Trang chủ" })}
			</Heading>

			<ScrollView>
				<Box position="relative">
					<HStack
						alignItems="center"
						justifyContent="space-between"
						position="absolute"
						p="$2"
						zIndex={1}
						left={0}
						right={0}
					>
						<HStack alignItems="center" gap="$2">
							<Box ml={8}>
								<Text size="xs" color="white">
									{trans({ en: "Welcome back", vi: "Chào mừng bạn trở lại" })},
								</Text>
								<Text size="sm" color="white" bold>
									{trans({
										en: "Have a nice day",
										vi: "Chúc bạn một ngày tốt lành",
									})}
								</Text>
							</Box>
						</HStack>
						<Pressable
							$active-bgColor="$coolGray200"
							rounded="$md"
							onPress={() => setShowActionSheet(true)}
						>
							<AntDesign name="setting" size={25} color="white" />
						</Pressable>
					</HStack>
					<HomeBanner />
				</Box>

				<AboutUs />

			</ScrollView>

			{/* Hidden item */}
			<SettingActionSheet
				isOpen={showActionSheet}
				onClose={() => setShowActionSheet(false)}
				actions={[
					{
						name: { en: "Change language", vi: "Thay đổi ngôn ngữ" },
						onAction: () => {
							setShowLanguageModal(true);
							setShowActionSheet(false);
						},
					},
				]}
			/>

			<LanguageModal
				show={showLanguageModal}
				onClose={() => setShowLanguageModal(false)}
			/>
		</View>
	);
};

export default Home;
