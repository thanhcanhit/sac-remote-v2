import {
	Box,
	Button,
	ButtonText,
	Center,
	Heading,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import { motify } from "moti";
import { SvgProps } from "react-native-svg";

const MotionCenter = motify(Center)();
const MotionBox = motify(Box)();
const MotionButton = motify(Button)();

export type IntroPageAction = { label: string; onPress: VoidFunction };

export type IntroPageProps = {
	heading: string;
	desc?: string;
	actions: IntroPageAction[];
	SVG: React.FC<SvgProps>;
};

const IntroPage = ({ heading, desc, actions, SVG }: IntroPageProps) => {
	const actionsRendered = actions.map((action) => (
		<MotionButton key={action.label} rounded="$full" onPress={action.onPress}>
			<ButtonText>{action.label}</ButtonText>
		</MotionButton>
	));
	return (
		<Box
			flex={1}
			position="relative"
			w="$full"
			height="$full"
			px="$4"
			key={heading}
		>
			<MotionCenter
				from={{ translateY: -20, opacity: 0 }}
				animate={{ translateY: 0, opacity: 1 }}
				position="absolute"
				left={0}
				right={0}
				top={16}
			>
				<Heading
					pt="$4"
					px="$2"
					size="lg"
					bold
					textAlign="center"
					color="$primary500"
				>
					{heading}
				</Heading>
				<Text size="sm" px="$8" textAlign="center" pt="$2">
					{desc}
				</Text>
			</MotionCenter>
			<Box flex={1} justifyContent="space-around" mb="$2">
				<MotionCenter
					animate={{
						transform: [
							{
								translateY: [0, -10],
							},
						],
					}}
					transition={{
						delay: 0,
						type: "timing",
						duration: 1500,
						loop: true,
					}}
				>
					<SVG width="65%" />
				</MotionCenter>
				<MotionBox
					from={{ translateY: 20, opacity: 0 }}
					animate={{ translateY: 0, opacity: 1 }}
				>
					<VStack w="$full" gap="$2">
						{actionsRendered}
					</VStack>
				</MotionBox>
			</Box>
		</Box>
	);
};

export default IntroPage;
