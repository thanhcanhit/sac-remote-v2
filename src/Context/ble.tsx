import React, { createContext } from "react";
import useBLE, {
	BluetoothLowEnergyApi,
	SettingState,
} from "./../bluetooth/useBLE";

export const BleContext = createContext<BluetoothLowEnergyApi>({
	isScanning: false,
	lastDevice: null,
	requestPermissions: async () => false,
	scanForPeripherals: () => {},
	allDevices: [],
	connectToDevice: async () => false,
	connectedDevice: null,
	disconnectFromCurrentDevice: async () => {},
	power: false,
	temperature: 0,
	humidity: 0,
	battery: 0,
	settingHumi: {
		turnOn: 0,
		turnOff: 0,
	},
	settingTemp: {
		turnOn: 0,
		turnOff: 0,
	},
	control: 0,
	auto: false,
	setNewSettingHumi: function (value: SettingState): void {
		throw new Error("Function not implemented.");
	},
	setNewSettingTemp: function (value: SettingState): void {
		throw new Error("Function not implemented.");
	},
	setNewControl: function (newValue: number): void {
		throw new Error("Function not implemented.");
	},
	setNewPower: function (newValue: boolean): void {
		throw new Error("Function not implemented.");
	},
	setNewAuto: function (newValue: boolean): void {
		throw new Error("Function not implemented.");
	},
});

const BleProvider = ({ children }: { children: React.ReactNode }) => {
	const bleInfo = useBLE();

	return <BleContext.Provider value={bleInfo}>{children}</BleContext.Provider>;
};

export default BleProvider;
