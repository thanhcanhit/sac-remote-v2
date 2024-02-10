import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
	ActionsheetItem,
	ActionsheetItemText,
} from "@gluestack-ui/themed";
import React, { useContext } from "react";
import { LangContext, MultilangContent } from "../../Context/lang";

type SettingActionSheetProps = {
	isOpen: boolean;
	actions: { name: MultilangContent; onAction: VoidFunction }[];
	onClose: VoidFunction;
};

const SettingActionSheet = ({
	isOpen,
	onClose,
	actions,
}: SettingActionSheetProps) => {
	const { trans } = useContext(LangContext);

	return (
		<Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
			<ActionsheetBackdrop />
			<ActionsheetContent h="$72" zIndex={999}>
				<ActionsheetDragIndicatorWrapper>
					<ActionsheetDragIndicator />
				</ActionsheetDragIndicatorWrapper>
				{actions.map((action) => (
					<ActionsheetItem onPress={action.onAction} key={action.name.en}>
						<ActionsheetItemText>{trans(action.name)}</ActionsheetItemText>
					</ActionsheetItem>
				))}
				<ActionsheetItem onPress={onClose}>
					<ActionsheetItemText>
						{trans({ en: "Close", vi: "Đóng" })}
					</ActionsheetItemText>
				</ActionsheetItem>
			</ActionsheetContent>
		</Actionsheet>
	);
};

export default SettingActionSheet;
