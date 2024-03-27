import {
	Box,
	HStack,
	Heading,
	Image,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import React, { useContext } from "react";
import { LangContext, MultilangContent } from "../../Context/lang";

export type MemberInformation = {
	name: string;
	major: MultilangContent;
	interest: MultilangContent;
	reasons: MultilangContent;
	img: string;
	color: string;
};

const MemberItem = ({
	name,
	color,
	img,
	interest,
	major,
	reasons,
}: MemberInformation) => {
	const { trans } = useContext(LangContext);
	return (
		<Box position="relative" minHeight={150} mb="$2">
			<HStack
				bgColor={color}
				rounded="$md"
				position="absolute"
				top={24}
				bottom={0}
				left={0}
				right={0}
				pl={100}
				p="$2"
			>
				<VStack p="$1">
					<Heading size="sm" color="white">
						{name}
					</Heading>
					<Text color="white" size="xs">
						{trans(major)}
					</Text>
					<Text size="xs" color="white">
						❤️ {trans(interest)}
					</Text>
				</VStack>
			</HStack>
			<Image
				position="absolute"
				height={150}
				width={100}
				resizeMode="contain"
				alt={name}
				source={img}
			></Image>
		</Box>
	);
};

export default MemberItem;
