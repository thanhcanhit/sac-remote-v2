import { HStack, Heading, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { Device } from "react-native-ble-plx";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { motify } from "moti";

type DeviceItemProps = {
	device: Device;
	onPress: VoidFunction;
};

const MotiPressalbe = motify(Pressable)();
const DeviceItem = ({ device, onPress }: DeviceItemProps) => {
	return (
		<MotiPressalbe
			from={{ translateX: -100 }}
			animate={{ translateX: 0 }}
			transition={{ type: "spring", damping: 20, stiffness: 100 }}
			active-bgColor="$coolGray200"
			onPress={onPress}
			mb="$2"
		>
			<HStack
				p="$4"
				alignItems="center"
				gap="$4"
				borderWidth={1}
				rounded="$md"
				borderColor="$coolGray300"
			>
				<MaterialIcon name="devices-other" size={30} color="gray" />
				<VStack>
					<Heading size="sm" color="$coolGray500">
						{device?.name || "Unknown Device"}
					</Heading>
					<Text>{device?.id || "Unknown ID"}</Text>
				</VStack>
			</HStack>
		</MotiPressalbe>
	);
};
export default DeviceItem;
