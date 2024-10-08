import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
	ActionsheetIcon,
	ActionsheetItem,
	ActionsheetItemText,
} from "@gluestack-ui/themed";
import React, { useContext } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { LangContext } from "../../Context/lang";

type ConnectActionSheetProps = {
	isOpen: boolean;
	onAction1: VoidFunction;
	onSubmit: VoidFunction;
	onClose: VoidFunction;
	name?: string;
};

const ConnectActionSheet = ({
	name,
	isOpen,
	onAction1,
	onClose,
	onSubmit,
}: ConnectActionSheetProps) => {
	const { trans } = useContext(LangContext);

	return (
		<Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
			<ActionsheetBackdrop />
			<ActionsheetContent h="$72" zIndex={999}>
				<ActionsheetDragIndicatorWrapper>
					<ActionsheetDragIndicator />
				</ActionsheetDragIndicatorWrapper>

				<ActionsheetItem justifyContent="center">
					<ActionsheetItemText bold>{name}</ActionsheetItemText>
				</ActionsheetItem>
				<ActionsheetItem onPress={onSubmit}>
					<ActionsheetIcon>
						<MaterialCommunityIcon name="connection" size={15} color="gray" />
					</ActionsheetIcon>
					<ActionsheetItemText>
						{trans({ en: "Connect", vi: "Kết nối" })}
					</ActionsheetItemText>
				</ActionsheetItem>
				<ActionsheetItem onPress={onAction1}>
					<ActionsheetIcon>
						<MaterialCommunityIcon name="information" size={15} color="gray" />
					</ActionsheetIcon>
					<ActionsheetItemText>
						{trans({ en: "Device information", vi: "Thông tin thiết bị" })}
					</ActionsheetItemText>
				</ActionsheetItem>

				<ActionsheetItem onPress={onClose}>
					<ActionsheetItemText>
						{trans({ en: "Close", vi: "Đóng" })}
					</ActionsheetItemText>
				</ActionsheetItem>
			</ActionsheetContent>
		</Actionsheet>
	);
};

export default ConnectActionSheet;
