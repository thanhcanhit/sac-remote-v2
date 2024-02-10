import { Badge, BadgeText, Box } from "@gluestack-ui/themed";
import React, { useContext } from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { LangContext, MultilangContent } from "../../Context/lang";

type BluetoothStatusBadgeProps = {
	isConnected: boolean;
};

const ConnectedIcon = (
	<MaterialIcon name="bluetooth-connected" color="green" size={18} />
);
const DisconnectedIcon = (
	<MaterialIcon name="bluetooth-disabled" color="red" size={18} />
);

const connectText: MultilangContent = {
	en: "connected",
	vi: "Đã kết nối",
};
const disconnectText: MultilangContent = {
	en: "disconnect",
	vi: "Ngắt kết nối",
};

const BluetoothStatusBadge = ({ isConnected }: BluetoothStatusBadgeProps) => {
	const Icon = isConnected ? ConnectedIcon : DisconnectedIcon;
	const { trans } = useContext(LangContext);
	return (
		<Box position="absolute" top="$2" right="$2">
			<Badge
				size="sm"
				variant="solid"
				borderRadius="$md"
				action={isConnected ? "success" : "error"}
			>
				<BadgeText marginRight={4}>
					{isConnected ? trans(connectText) : trans(disconnectText)}
				</BadgeText>
				{Icon}
			</Badge>
		</Box>
	);
};

export default BluetoothStatusBadge;
