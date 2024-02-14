import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LAST_DEVICE_ID_KEY = "SACLASTDEVICE";
export const USER_INFO_KEY = "SACUSERINFO";
export const LANG_KEY = "SACLANGUAGE";

const storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
	enableCache: true,
});

export default storage;
