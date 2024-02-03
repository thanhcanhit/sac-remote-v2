import { Badge, BadgeIcon, BadgeText, Box } from "@gluestack-ui/themed";
import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

type BluetoothStatusBadgeProps = {
	isConnected: boolean;
};

const ConnectedIcon = (
	<MaterialIcon name="bluetooth-connected" color="green" size={18} />
);
const DisconnectedIcon = (
	<MaterialIcon name="bluetooth-disabled" color="red" size={18} />
);

const BluetoothStatusBadge = ({ isConnected }: BluetoothStatusBadgeProps) => {
	const Icon = isConnected ? ConnectedIcon : DisconnectedIcon;
	return (
		<Box position="absolute" top="$2" right="$2">
			<Badge
				size="sm"
				variant="solid"
				borderRadius="$md"
				action={isConnected ? "success" : "error"}
			>
				<BadgeText marginRight={4}>
					{isConnected ? "Connected" : "Disconnected"}
				</BadgeText>
				{Icon}
			</Badge>
		</Box>
	);
};

export default BluetoothStatusBadge;
