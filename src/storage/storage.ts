import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "react-native-storage";

export const LAST_DEVICE_ID_KEY = "SACLASTDEVICE";
export const USER_INFO_KEY = "SACUSERINFO";
export const LANG_KEY = "SACLANGUAGE";
export const FIRST_TIME_LOGIN_KEY = "SACFIRSTTIME";

const storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
	enableCache: true,
});

export default storage;
