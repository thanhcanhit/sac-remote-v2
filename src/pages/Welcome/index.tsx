import {
	Badge,
	BadgeText,
	Center,
	SafeAreaView,
	Spinner,
} from "@gluestack-ui/themed";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useLayoutEffect, useMemo, useState } from "react";
import { StatusBar } from "react-native";
import { RootParamList } from "../../../App";
import { LangContext } from "../../Context/lang";
import ConnectSVG from "../../assets/svgs/connect.svg";
import DoneSVG from "../../assets/svgs/done.svg";
import LanguageSVG from "../../assets/svgs/language.svg";
import SettingSVG from "../../assets/svgs/setting.svg";
import StatusSVG from "../../assets/svgs/stat.svg";
import WelcomeSVG from "../../assets/svgs/welcome.svg";
import storage, { FIRST_TIME_LOGIN_KEY } from "../../storage/storage";
import IntroPage, { IntroPageProps } from "./IntroPage";
import { BleContext } from "../../Context/ble";

const Welcome = () => {
	const [index, setIndex] = useState<number>(0);
	const [isLoading, setLoading] = useState<boolean>(true);
	const navigate = useNavigation<BottomTabNavigationProp<RootParamList>>();
	const { trans, setLang, lang } = useContext(LangContext);
	const { requestPermissions } = useContext(BleContext);

	const nextPage = () => setIndex((prev) => prev + 1);
	const requestBluetooth = () => {
		requestPermissions()
			.then((isGranted) => {
				if (isGranted) nextPage();
				else throw new Error("Not granted");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const navigateToHome = () => {
		navigate.jumpTo("Home");
		storage.save({ key: FIRST_TIME_LOGIN_KEY, data: true });
	};

	const pages: IntroPageProps[] = useMemo<IntroPageProps[]>(
		() => [
			{
				heading: "Select Language - Chọn ngôn ngữ",
				SVG: LanguageSVG,
				actions: [
					{
						label: "Tiếng Việt",
						onPress: () => {
							setLang("vi");
							nextPage();
						},
					},
					{
						label: "English",
						onPress: () => {
							setLang("en");
							nextPage();
						},
					},
				],
			},
			{
				heading: trans({
					en: "Welcome to SAC Remote ❤️",
					vi: "Chào mừng bạn đến với SAC Remote ❤️",
				}),
				desc: trans({
					en: "This app will assist you in using SAC(Smart AirCon Clothing) devices.",
					vi: "Ứng dụng này sẽ hỗ trợ bạn trong việc sử dụng các thiết bị SAC (Smart AirCon Clothing)",
				}),
				SVG: WelcomeSVG,
				actions: [
					{ label: trans({ en: "Next", vi: "Tiếp tục" }), onPress: nextPage },
				],
			},
			{
				heading: trans({
					en: "Monitor Status",
					vi: "Theo dõi trạng thái",
				}),
				desc: trans({
					en: "Monitoring information: Temperature, Humidity, Battery level, Device power while using SAC device.",
					vi: "Theo dõi các thông tin: Nhiệt độ, Độ ẩm, Lượng pin, Nguồn khi dùng thiết bị SAC.",
				}),
				SVG: StatusSVG,
				actions: [
					{ label: trans({ en: "Next", vi: "Tiếp tục" }), onPress: nextPage },
				],
			},
			{
				heading: trans({
					en: "Custom setting",
					vi: "Thiết lập tùy chỉnh",
				}),
				desc: trans({
					en: "Customize fan level, automatic mode,... to suit your style.",
					vi: "Tùy chỉnh cấp độ quạt, chế độ tự động,... phù hợp với phong cách của bạn.",
				}),
				SVG: SettingSVG,
				actions: [
					{ label: trans({ en: "Next", vi: "Tiếp tục" }), onPress: nextPage },
				],
			},
			{
				heading: trans({
					en: "Before start",
					vi: "Trước khi bắt đầu",
				}),
				desc: trans({
					en: "This app needs to use your bluetooth.",
					vi: "Ứng dụng này cần phải sử dụng bluetooth của bạn.",
				}),
				SVG: ConnectSVG,
				actions: [
					{
						label: trans({ en: "OK", vi: "Được" }),
						onPress: requestBluetooth,
					},
				],
			},
			{
				heading: trans({
					en: "All done!",
					vi: "Đã xong!",
				}),
				desc: trans({
					en: "Enjoy your cool move ❤️",
					vi: "Hãy tận hưởng chuyến đi mát mẻ của bạn ❤️",
				}),
				SVG: DoneSVG,
				actions: [
					{
						label: trans({ en: "Start", vi: "Bắt đầu" }),
						onPress: navigateToHome,
					},
				],
			},
		],
		[lang]
	);

	const currentPage = <IntroPage {...pages[index]} />;

	useLayoutEffect(() => {
		const checkNotFistTime = async () => {
			try {
				const k = await storage.load({ key: FIRST_TIME_LOGIN_KEY });
				if (k) {
					navigateToHome();
				}
			} catch (err) {
				return false;
			} finally {
				setLoading(false);
			}
		};

		checkNotFistTime();
	}, []);

	return (
		<SafeAreaView flex={1} bgColor="$white">
			<StatusBar />
			{isLoading ? (
				<Center position="absolute" top={0} left={0} right={0} bottom={0}>
					<Spinner size="large" />
				</Center>
			) : (
				<>
					<Badge position="absolute" top="$2" right="$2">
						<BadgeText bold>
							{index + 1}/{pages.length}
						</BadgeText>
					</Badge>
					{currentPage}
				</>
			)}
		</SafeAreaView>
	);
};

export default Welcome;
