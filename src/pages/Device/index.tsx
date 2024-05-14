import {
	Badge,
	BadgeText,
	Box,
	Button,
	ButtonText,
	HStack,
	Heading,
	ScrollView,
	Spinner,
	Text,
	Toast,
	ToastDescription,
	ToastTitle,
	VStack,
	View,
	useToast,
} from "@gluestack-ui/themed";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Device as BleDevice } from "react-native-ble-plx";
import { BleContext } from "../../Context/ble";
import { LangContext } from "../../Context/lang";
import ConnectActionSheet from "./ConnectActionSheet";
import ConnectModal from "./ConnectModal";
import DeviceItem from "./DeviceItem";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

const Device = () => {
	const { trans } = useContext(LangContext);
	const ble = useContext(BleContext);

	const [showModal, setShowModal] = useState<boolean>(false);
	const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
	const [selectedDevice, setSelectedDevice] = useState<BleDevice | null>(null);
	const toast = useToast();

	const handleRefreshScan = async () => {
		const isPermissionsEnabled = await ble.requestPermissions();
		if (isPermissionsEnabled) {
			ble.scanForPeripherals();
		}
	};

	const handleConnect = async (device: BleDevice) => {
		try {
			const isConnected = await ble.connectToDevice(device);
			if (isConnected) {
				toast.show({
					placement: "top",
					render: ({ id }) => {
						const toastId = "toast-" + id;
						return (
							<Toast
								nativeID={toastId}
								action="info"
								variant="solid"
								rounded="$full"
							>
								<HStack space="xs" alignItems="center" gap={4}>
									<MaterialIcon name="bluetooth-connected" size={16} />
									<ToastDescription>
										{trans({
											en: "Connected to device",
											vi: "Đã kết nối với thiết bị",
										})}
									</ToastDescription>
								</HStack>
							</Toast>
						);
					},
				});
			}
		} catch (e) {}
	};

	const handleDisconnect = () => {
		try {
			ble.disconnectFromCurrentDevice();
			toast.show({
				placement: "top",
				render: ({ id }) => {
					const toastId = "toast-" + id;
					return (
						<Toast
							nativeID={toastId}
							action="info"
							variant="solid"
							rounded="$full"
						>
							<HStack space="xs" alignItems="center" gap={8}>
								<AntDesign name="disconnect" size={16} />
								<ToastDescription>
									{trans({
										en: "Disconnect from device",
										vi: "Đã ngắt kết nối với thiết bị",
									})}
								</ToastDescription>
							</HStack>
						</Toast>
					);
				},
			});
		} catch (err) {
			console.log("Error when disconnect", err);
		}
	};

	const handleSetSelectedDevice = (device: BleDevice) => {
		try {
			if (device) {
				setSelectedDevice(device);
				setShowActionSheet(true);
			}
		} catch (err) {
			console.log("Select device err", err);
		}
	};

	// Initial
	useEffect(() => {
		handleRefreshScan();
	}, []);

	const deviceListRendered = ble.allDevices?.length ? (
		ble.allDevices.map((device) => (
			<DeviceItem
				device={device}
				onPress={() => {
					handleSetSelectedDevice(device);
				}}
				key={device.id}
			/>
		))
	) : (
		<Fragment />
	);

	return (
		<View>
			<Heading size="md" bold textAlign="center" my={4} color="$coolGray600">
				{trans({ en: "Device", vi: "Thiết bị" })}
			</Heading>
			<Box px="$4" mt="$2">
				{/* Connected device */}
				{ble.connectedDevice && (
					<Box>
						<HStack mb="$1">
							<Badge size="sm">
								<BadgeText bold>
									{trans({
										en: "Connecting device",
										vi: "Đang kết nối",
									})}
								</BadgeText>
							</Badge>
						</HStack>
						<DeviceItem
							isActive={true}
							device={ble.connectedDevice}
							onPress={() => handleDisconnect()}
						/>
					</Box>
				)}
				{/* Last device */}
				{!ble.connectedDevice && ble.lastDevice && (
					<Box>
						<HStack mb="$1">
							<Badge size="sm">
								<BadgeText bold>
									{trans({
										en: "Last connected device",
										vi: "Thiết bị đã kết nối cuối cùng",
									})}
								</BadgeText>
							</Badge>
							<Text size="xs" ml={4} mb={4} italic>
								(
								{trans({
									en: "Tap to reconnect",
									vi: "Chạm để kết nối lại",
								})}
								)
							</Text>
						</HStack>
						<DeviceItem
							device={ble.lastDevice}
							onPress={() => {
								if (ble.lastDevice) handleConnect(ble.lastDevice);
							}}
						/>
					</Box>
				)}

				{/* Around Device */}
				<HStack mt="$2">
					<Badge action="muted" w="$full" justifyContent="center">
						<BadgeText bold>
							{trans({
								en: "Peripherals are all around you",
								vi: "Thiết bị ở xung quanh bạn",
							})}
						</BadgeText>
					</Badge>
				</HStack>
				<VStack mt="$2" gap="$1">
					{!ble.isScanning && (
						<Button onPress={ble.scanForPeripherals}>
							<ButtonText>
								{trans({ en: "Refresh", vi: "Quét lại" })}
							</ButtonText>
						</Button>
					)}
					{ble.isScanning && (
						<HStack gap="$1" justifyContent="center">
							<Spinner />
							<Text size="xs" color="$primary400" textAlign="center">
								{trans({ vi: "Đang quét", en: "Scanning" })}...
							</Text>
						</HStack>
					)}
				</VStack>
				<ScrollView mt="$2" mb="$8">
					{deviceListRendered}
				</ScrollView>
			</Box>

			{/* Hidden item */}
			<ConnectActionSheet
				name={selectedDevice?.name || ""}
				onClose={() => setShowActionSheet(false)}
				onSubmit={async () => {
					selectedDevice && handleConnect(selectedDevice);
					setShowActionSheet(false);
				}}
				onAction1={() => setShowModal(true)}
				isOpen={showActionSheet}
			/>
			<ConnectModal
				device={selectedDevice}
				isOpen={showModal}
				onClose={() => {
					setShowModal(false);
				}}
				onCancel={() => {
					setShowModal(false);
				}}
			/>
		</View>
	);
};
export default Device;
