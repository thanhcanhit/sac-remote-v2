import { HStack, Heading, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { Device } from "react-native-ble-plx";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

type DeviceItemProps = {
	device: Device;
	onPress: VoidFunction;
};
const DeviceItem = ({ device, onPress }: DeviceItemProps) => {
	return (
		<Pressable $active-bgColor="$coolGray200" onPress={onPress} mb="$2">
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
						{device?.name}
					</Heading>
					<Text>{device?.id}</Text>
				</VStack>
			</HStack>
		</Pressable>
	);
};
export default DeviceItem;
