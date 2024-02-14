import {
	Badge,
	BadgeText,
	ChevronDownIcon,
	ChevronUpIcon,
	Text,
} from "@gluestack-ui/themed";
import { Button, ButtonIcon, VStack } from "@gluestack-ui/themed";

type ValueWithChangeButtonProps = {
	value: number;
	disableIncrease: boolean;
	disableDecrease: boolean;
	onIncrease: VoidFunction;
	onDecrease: VoidFunction;
	badgeText: string;
	isNegative?: boolean;
};

const ValueWithChangeButton = ({
	value,
	disableDecrease,
	disableIncrease,
	onDecrease,
	onIncrease,
	badgeText,
	isNegative,
}: ValueWithChangeButtonProps) => {
	return (
		<VStack alignItems="center">
			<Button
				size="sm"
				action="secondary"
				rounded="$3xl"
				$active-bgColor="$backgroundDark100"
				variant="outline"
				disabled={disableIncrease}
				onPress={onIncrease}
			>
				<ButtonIcon as={ChevronUpIcon} />
			</Button>
			<Text bold color="$coolGray500" p="$1">
				{value}
			</Text>
			<Button
				size="sm"
				action="secondary"
				rounded="$3xl"
				$active-bgColor="$backgroundDark100"
				variant="outline"
				disabled={disableDecrease}
				onPress={onDecrease}
			>
				<ButtonIcon as={ChevronDownIcon} />
			</Button>
			<Badge
				size="sm"
				mt="$1"
				variant="solid"
				action={isNegative ? "error" : "success"}
			>
				<BadgeText>{badgeText}</BadgeText>
			</Badge>
		</VStack>
	);
};

export default ValueWithChangeButton;
