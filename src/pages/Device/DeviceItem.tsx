import { HStack, Heading, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { Device } from "react-native-ble-plx";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { motify } from "moti";

type DeviceItemProps = {
	device: Device;
	onPress: VoidFunction;
	isActive?: boolean;
};

const MotiPressalbe = motify(Pressable)();
const DeviceItem = ({ device, onPress, isActive }: DeviceItemProps) => {
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
				bgColor={isActive ? "$blue50" : "$white"}
				borderColor="$coolGray300"
			>
				<MaterialIcon
					name={isActive ? "bluetooth-connected" : "devices-other"}
					size={25}
					color={isActive ? "#0670d4" : "gray"}
				/>
				<VStack>
					<Heading size="sm" color={isActive ? "$primary500" : "$coolGray500"}>
						{device?.name || "Unknown Device"} {isActive ? "(Connected)" : ""}
					</Heading>
				</VStack>
			</HStack>
		</MotiPressalbe>
	);
};
export default DeviceItem;
