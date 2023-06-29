import { useMedia } from "react-use";
import {
  selectDominantSpeaker,
  selectIsConnectedToRoom,
  useHMSStore,
} from "@100mslive/react-sdk";
import { VolumeOneIcon } from "@100mslive/react-icons";
import {
  config as cssConfig,
  Flex,
  styled,
  Text,
  textEllipsis,
  useTheme,
} from "@100mslive/react-ui";
import { useLogo } from "../AppData/useUISettings";
import { isStreamingKit } from "../../common/utils";

export const SpeakerTag = () => {
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  return dominantSpeaker && dominantSpeaker.name ? (
    <Flex
      align="center"
      justify="center"
      css={{ flex: "1 1 0", color: "$textPrimary", "@md": { display: "none" } }}
    >
      <VolumeOneIcon />
      <Text
        variant="md"
        css={{ ...textEllipsis(200), ml: "$2" }}
        title={dominantSpeaker.name}
      >
        {dominantSpeaker.name}
      </Text>
    </Flex>
  ) : (
    <></>
  );
};

const LogoImg = styled("img", {
  maxHeight: "$16",
  p: "$2",
  w: "auto",
  "@md": {
    maxHeight: "$14",
  },
});

export const Logo = () => {
  const { themeType } = useTheme();
  const logo = useLogo();
  const isMobile = useMedia(cssConfig.media.md);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  // Hide logo for now as there is not enough space
  if (isConnected && isMobile && isStreamingKit()) {
    return null;
  }
  return (
    <LogoImg
      src={
        logo ||
        (themeType === "dark"
          ? require("../../images/logo-light.svg")
          : require("../../images/logo-dark.svg"))
      }
      alt="Neural Knights Logo"
      width={152}
      height={60}
    />
  );
};
