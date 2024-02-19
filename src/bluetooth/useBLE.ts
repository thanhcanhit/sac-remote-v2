/* eslint-disable no-bitwise */
import { useMemo, useRef, useState, useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
	BleError,
	BleManager,
	Characteristic,
	Device,
} from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";
import base64 from "react-native-base64";
import localStorage, { LAST_DEVICE_ID_KEY } from "../storage/storage";

// UUID
const SAC_BLE_UUID = {
	infoService: {
		uuid: "e349da5e-d7a6-4211-a84d-9d7fa5142bae",
		characteristics: {
			power: "f389240b-df74-437f-9caa-9adc0b31af78",
			temperature: "bb52c8e8-99bb-44dc-ac5a-1c9e84a350ea",
			humidity: "2b9cd114-b8c1-473f-a483-470125415fb6",
			battery: "85d1a355-7936-468c-99e8-0bb9a2893e89",
		},
	},
	settingService: {
		uuid: "d5d3af8d-bfd6-4d95-ba9f-890dd4f426fc",
		characteristics: {
			auto: "73134373-efbd-4770-b6b1-873cb6f00cf8",
			settingTemperature: "780c3b1e-38a4-47a1-9c2b-9763aa7509c3",
			settingHumidity: "ca4391b1-a5b1-4b6d-8dcd-055d078fd5fd",
			control: "42b18506-e2d6-4630-b8b5-7f47ff213058",
		},
	},
};

export type fanSpeedValue = 150 | 200 | 250;

export type SettingState = {
	turnOn: number;
	turnOff: number;
};

export interface BluetoothLowEnergyApi {
	allDevices: Device[];
	requestPermissions(): Promise<boolean>;
	scanForPeripherals(): void;
	disconnectFromCurrentDevice: () => void;
	connectToDevice: (deviceId: Device) => Promise<boolean>;
	lastDevice: Device | null;
	connectedDevice: Device | null;
	power: boolean;
	temperature: number;
	humidity: number;
	battery: number;
	settingHumi: SettingState;
	settingTemp: SettingState;
	control: number;
	auto: boolean;
	setNewSettingHumi: (value: SettingState) => void;
	setNewSettingTemp: (value: SettingState) => void;
	setNewControl: (newValue: fanSpeedValue) => void;
	setNewPower: (newValue: boolean) => void;
	setNewAuto: (newValue: boolean) => void;
}

function useBLE(): BluetoothLowEnergyApi {
	const bleManager = useMemo(() => new BleManager(), []);

	// State
	const lastDevice = useRef<Device | null>(null);
	const [allDevices, setAllDevices] = useState<Device[]>([]);
	const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

	// Characteristics
	const [power, setPower] = useState<boolean>(false);
	const [temperature, setTemperature] = useState<number>(20);
	const [humidity, setHumidity] = useState<number>(50);
	const [battery, setBattery] = useState<number>(100);
	const [settingTemp, setSettingTemp] = useState<SettingState>({
		turnOn: 25,
		turnOff: 40,
	});
	const [settingHumi, setSettingHumi] = useState<SettingState>({
		turnOn: 40,
		turnOff: 80,
	});
	const [control, setControl] = useState<fanSpeedValue>(200);
	const [auto, setAuto] = useState<boolean>(false);

	const requestAndroid31Permissions = async () => {
		const bluetoothScanPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
		);
		const bluetoothConnectPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
		);
		const fineLocationPermission = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);

		return (
			bluetoothScanPermission === "granted" &&
			bluetoothConnectPermission === "granted" &&
			fineLocationPermission === "granted"
		);
	};

	const requestPermissions = async () => {
		if (Platform.OS === "android") {
			if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
				const permissionStatus = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
				);

				return permissionStatus == "granted";
			} else {
				const isAndroid31PermissionGranted =
					await requestAndroid31Permissions();
				return isAndroid31PermissionGranted;
			}
		}

		return true;
	};

	const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
		devices.findIndex((device) => nextDevice.id === device.id) > -1;

	const scanForPeripherals = async () => {
		setAllDevices([]);
		bleManager.startDeviceScan(null, null, (error, device) => {
			if (error) {
				console.log(error);
				bleManager.stopDeviceScan();
			}

			if (device) {
				setAllDevices((prevState) => {
					if (allDevices.length < 50 && !isDuplicateDevice(prevState, device)) {
						return [...prevState, device];
					}

					return prevState;
				});
			}
		});

		setTimeout(() => {
			bleManager.stopDeviceScan();
		}, 5000);
	};

	const connectToDevice = async (device: Device): Promise<boolean> => {
		const deviceConnection = await bleManager.connectToDevice(device.id);
		if (deviceConnection) {
			// Check is sac device
			const hasInfoService =
				await deviceConnection.discoverAllServicesAndCharacteristics();

			const deviceServices = await deviceConnection.services();
			deviceServices.findIndex(
				(service) => service.uuid == SAC_BLE_UUID.infoService.uuid
			) != -1;
			const hasSettingService =
				deviceServices.findIndex(
					(service) => service.uuid == SAC_BLE_UUID.settingService.uuid
				) != -1;
			if (!hasInfoService || !hasSettingService) return false;

			console.log("SERVICES" + deviceServices.map((item) => item.uuid + "\n"));
			setConnectedDevice(deviceConnection);
			lastDevice.current = deviceConnection;

			bleManager.stopDeviceScan();

			// Save device to local storage
			localStorage.save({
				key: LAST_DEVICE_ID_KEY,
				data: device,
			});
			return true;
		}
		return false;
	};

	const disconnectFromCurrentDevice = async () => {
		if (connectedDevice) {
			await connectedDevice.cancelConnection();
			setConnectedDevice(null);
		}
	};

	const isConnected: () => boolean = () => {
		return connectedDevice !== null;
	};

	const onTempUpdate = (
		error: BleError | null,
		characteristic: Characteristic | null
	) => {
		if (error) {
			console.log(error);
			return -1;
		} else if (!characteristic?.value) {
			console.log("No Data was recieved");
			return -1;
		}

		const rawData = base64.decode(characteristic.value);

		setTemperature(Number(rawData));
	};

	const onBatteryUpdate = (
		error: BleError | null,
		characteristic: Characteristic | null
	) => {
		if (error) {
			console.log(error);
			return -1;
		} else if (!characteristic?.value) {
			console.log("No Data was recieved");
			return -1;
		}

		const rawData = base64.decode(characteristic.value);

		setBattery(Number(rawData));
	};

	const onHumidityUpdate = (
		error: BleError | null,
		characteristic: Characteristic | null
	) => {
		if (error) {
			console.log(error);
			return -1;
		} else if (!characteristic?.value) {
			console.log("No Data was recieved");
			return -1;
		}

		const rawData = base64.decode(characteristic.value);

		setHumidity(Number(rawData));
	};

	const onPowerUpdate = (
		error: BleError | null,
		characteristic: Characteristic | null
	) => {
		if (error) {
			console.log(error);
			return -1;
		} else if (!characteristic?.value) {
			console.log("Power No Data was recieved");
			return -1;
		}

		const rawData = base64.decode(characteristic.value);

		setPower(Boolean(Number(rawData)));
	};

	const onSettingTempUpdate = (
		error: BleError | null,
		characteristic: Characteristic | null
	) => {
		if (error) {
			console.log(error);
			return -1;
		} else if (!characteristic?.value) {
			return -1;
		}

		const rawData = base64.decode(characteristic.value).replace(/"/g, "");
		const value = rawData
			.split(" ")
			.map((str_value: string) => Number(str_value));

		setSettingTemp({ turnOn: value[0], turnOff: value[1] });
	};

	const onSettingHumidityUpdate = (
		error: BleError | null,
		characteristic: Characteristic | null
	) => {
		if (error) {
			console.log(error);
			return -1;
		} else if (!characteristic?.value) {
			console.log("No Data was recieved");
			return -1;
		}

		const rawData = base64.decode(characteristic.value).replace(/"/g, "");
		const value = rawData
			.split(" ")
			.map((str_value: string) => Number(str_value));

		setSettingHumi({ turnOn: value[0], turnOff: value[1] });
	};

	const onControlUpdate = (
		error: BleError | null,
		characteristic: Characteristic | null
	) => {
		if (error) {
			console.log(error);
			return -1;
		} else if (!characteristic?.value) {
			return -1;
		}

		const rawData = Number(base64.decode(characteristic.value));
		let fanSpeed: fanSpeedValue;
		if (rawData < 150) fanSpeed = 150;
		else if (rawData < 250) fanSpeed = 200;
		else fanSpeed = 250;

		setControl(fanSpeed);
	};

	const onAutoChange = (
		error: BleError | null,
		characteristic: Characteristic | null
	) => {
		if (error) {
			console.log(error);
			return -1;
		} else if (!characteristic?.value) {
			return -1;
		}

		const rawData = base64.decode(characteristic.value);

		setAuto(Boolean(Number(rawData)));
	};

	// Setter
	const setNewSettingTemp: (newValue: SettingState) => void = async (
		newValue
	) => {
		const stringValue = newValue.turnOn + " " + newValue.turnOff;
		if (isConnected()) {
			await connectedDevice?.writeCharacteristicWithoutResponseForService(
				SAC_BLE_UUID.settingService.uuid,
				SAC_BLE_UUID.settingService.characteristics.settingTemperature,
				base64.encode(JSON.stringify(stringValue))
			);
		}
		return;
	};

	const setNewSettingHumi: (newValue: SettingState) => void = async (
		newValue
	) => {
		const stringValue = newValue.turnOn + " " + newValue.turnOff;
		if (isConnected()) {
			await connectedDevice?.writeCharacteristicWithoutResponseForService(
				SAC_BLE_UUID.settingService.uuid,
				SAC_BLE_UUID.settingService.characteristics.settingHumidity,
				base64.encode(JSON.stringify(stringValue))
			);
		}
		return;
	};

	const setNewControl: (newValue: fanSpeedValue) => void = async (newValue) => {
		if (isConnected()) {
			await connectedDevice?.writeCharacteristicWithoutResponseForService(
				SAC_BLE_UUID.settingService.uuid,
				SAC_BLE_UUID.settingService.characteristics.control,
				base64.encode(JSON.stringify(newValue))
			);
		}
		return;
	};

	const setNewPower: (newValue: boolean) => void = async (newValue) => {
		const intValue: number = newValue ? 1 : 0;
		if (isConnected()) {
			await connectedDevice?.writeCharacteristicWithoutResponseForService(
				SAC_BLE_UUID.infoService.uuid,
				SAC_BLE_UUID.infoService.characteristics.power,
				base64.encode(JSON.stringify(intValue))
			);
		}
		return;
	};

	const setNewAuto: (newValue: boolean) => void = async (newValue) => {
		const intValue: number = newValue ? 1 : 0;
		if (isConnected()) {
			await connectedDevice?.writeCharacteristicWithoutResponseForService(
				SAC_BLE_UUID.settingService.uuid,
				SAC_BLE_UUID.settingService.characteristics.auto,
				base64.encode(JSON.stringify(intValue))
			);
		}
		return;
	};

	const startStreamingData = async (device: Device) => {
		if (device) {
			// ** Info
			device.monitorCharacteristicForService(
				SAC_BLE_UUID.infoService.uuid,
				SAC_BLE_UUID.infoService.characteristics.temperature,
				onTempUpdate
			);
			device.monitorCharacteristicForService(
				SAC_BLE_UUID.infoService.uuid,
				SAC_BLE_UUID.infoService.characteristics.humidity,
				onHumidityUpdate
			);
			device.monitorCharacteristicForService(
				SAC_BLE_UUID.infoService.uuid,
				SAC_BLE_UUID.infoService.characteristics.battery,
				onBatteryUpdate
			);
			device.monitorCharacteristicForService(
				SAC_BLE_UUID.infoService.uuid,
				SAC_BLE_UUID.infoService.characteristics.power,
				onPowerUpdate
			);

			// ** Setting
			device.monitorCharacteristicForService(
				SAC_BLE_UUID.settingService.uuid,
				SAC_BLE_UUID.settingService.characteristics.auto,
				onAutoChange
			);
			device.monitorCharacteristicForService(
				SAC_BLE_UUID.settingService.uuid,
				SAC_BLE_UUID.settingService.characteristics.settingHumidity,
				onSettingHumidityUpdate
			);
			device.monitorCharacteristicForService(
				SAC_BLE_UUID.settingService.uuid,
				SAC_BLE_UUID.settingService.characteristics.settingTemperature,
				onSettingTempUpdate
			);
			device.monitorCharacteristicForService(
				SAC_BLE_UUID.settingService.uuid,
				SAC_BLE_UUID.settingService.characteristics.control,
				onControlUpdate
			);
		} else {
			console.log("No Device Connected");
		}
	};

	// Listen notify
	useEffect(() => {
		const readPowerState = async () => {
			const characteristic =
				await connectedDevice?.readCharacteristicForService(
					SAC_BLE_UUID.infoService.uuid,
					SAC_BLE_UUID.infoService.characteristics.power
				);
			if (characteristic?.value) {
				const value = Boolean(Number(base64.decode(characteristic.value)));

				setPower(value);
			}
		};

		if (connectedDevice) {
			readPowerState();
			startStreamingData(connectedDevice);
		}
	}, [connectedDevice]);

	// Initial
	useEffect(() => {
		// listen on disconnect and handle state change
		bleManager.onDeviceDisconnected(connectedDevice?.id || "", () => {
			setConnectedDevice(null);
		});

		// get last device in local storage
		async function tryGetLastDevice() {
			try {
				const localData = await localStorage.load({ key: LAST_DEVICE_ID_KEY });

				if (localData) {
					const savedDevice: Device = localData;
					lastDevice.current = savedDevice;
					await connectToDevice(savedDevice);
				}
			} catch (e) {}
		}

		if (!connectedDevice) tryGetLastDevice();
	}, []);

	return {
		scanForPeripherals,
		requestPermissions,
		disconnectFromCurrentDevice,
		allDevices,
		connectToDevice,
		connectedDevice,
		lastDevice: lastDevice?.current,
		power,
		control,
		temperature,
		humidity,
		battery,
		settingHumi,
		settingTemp,
		auto,
		setNewSettingHumi,
		setNewSettingTemp,
		setNewPower,
		setNewControl,
		setNewAuto,
	};
}

export default useBLE;
