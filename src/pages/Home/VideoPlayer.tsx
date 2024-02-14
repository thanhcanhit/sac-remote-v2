import { Box, Heading, View } from "@gluestack-ui/themed";
import React, { useState, useCallback, useContext } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { LangContext } from "../../Context/lang";
const VideoPlayer = () => {
	const [playing, setPlaying] = useState<boolean>(false);
	const [state, setState] = useState<"idle" | "loading" | "error">("loading");
	const { trans } = useContext(LangContext);

	const onStateChange = useCallback((state: any) => {
		if (state === "ended") {
			setPlaying(false);
		}
	}, []);

	const isLoaded = state === "idle";
	return (
		<Box style={{ display: isLoaded ? "flex" : "none" }}>
			<Heading textAlign="center" size="md" color="$coolGray600">
				{trans({ en: "Our story", vi: "Câu chuyện của chúng tôi" })}
			</Heading>
			<View
				mx="$4"
				my="$1"
				rounded="$lg"
				overflow="hidden"
				borderWidth={1}
				borderColor="$coolGray200"
			>
				<YoutubePlayer
					height={200}
					play={playing}
					videoId={"rIX9grP3Swk"}
					onError={() => setState("error")}
					onReady={() => setState("idle")}
					onChangeState={onStateChange}
				/>
			</View>
		</Box>
	);
};

export default VideoPlayer;
