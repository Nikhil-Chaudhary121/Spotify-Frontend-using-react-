import { Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CardPlayPauseBtn from "./CardPlayPauseBtn";
import { useRecoilState } from "recoil";
import currPlaylistAtom from "../atoms/CurrPlaylistAtom";

const VCard = ({ avatar, title, description, playlistId, songList }) => {
  return (
    <Flex
      position={"relative"}
      flex={1}
      flexGrow={1}
      p={4}
      w={"49%"}
      maxWidth={"52%"}
      minW={"150px"}
      id="v-card"
      className="v-card"
      bg={"#191919"}
      borderRadius={6}
      // onClick={handleSetPlaylist}
    >
      <Link
        to={`/${playlistId}`}
        textDecoration={"none"}
        className="card-link"
        display={"flex"}
        w={"full"}
      >
        <Flex flexDir={"column"} ma={"210px"}>
          <Flex position={"relative"} h={"full"} w={"full"}>
            <Image
              minW={"full"}
              maxH={"full"}
              src={avatar}
              mb={2}
              borderRadius={6}
            />
            <Flex
              pos={"absolute"}
              className="card-play-icon v-card-btn"
              borderRadius={"full"}
            >
              <CardPlayPauseBtn />
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"} pr={6}>
            <Flex px={1} flexDir={"column"} justifyContent={"center"}>
              <Text fontSize={"md"} lineHeight={1} fontWeight={600}>
                {title}
              </Text>
              <Text opacity={0.5} ml={0.5} fontSize={13}>
                {description}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </Flex>
  );
};

export default VCard;
