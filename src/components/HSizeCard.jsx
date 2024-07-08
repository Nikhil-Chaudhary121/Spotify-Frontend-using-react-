import { Image, Box, Flex, Text } from "@chakra-ui/react";
import LikeBtn from "./LikeBtn";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import currPlaylistAtom from "../atoms/CurrPlaylistAtom";

const HSizeCard = ({
  avatar,
  title,
  songCount,
  singer,
  canLike,
  playlistId,
  songList,
}) => {
  // const [currPlaylist, setCurrPlaylist] = useRecoilState(currPlaylistAtom);
  // const handleSetPlaylist = () => {
  //   const data = {
  //     avatar: avatar,
  //     playlistId: playlistId,
  //     title: title,
  //     description: "This is description",
  //     songList: songList,
  //   };
  //   setCurrPlaylist({ ...data });
  //   console.log(currPlaylist);
  // };
  return (
    <Link to={`/${playlistId}`}>
      <Flex
        // onClick={handleSetPlaylist}
        alignItems={"center"}
        borderRadius={4}
        className="song-card"
        p={2}
        gap={4}
      >
        <Image w={12} h={12} borderRadius={6} src={avatar} />
        <Flex w={"full"} className="hide-on-900" flexDirection={"column"}>
          <Text
            w={"90%"}
            fontWeight={"bold"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            fontSize={"md"}
          >
            {title}
          </Text>
          {songCount !== 0 && (
            <Flex alignItems={"center"} gap={2}>
              <Text fontSize={"md"} color={"gray"}>
                Playlist
              </Text>
              <Box w={1} h={1} bg={"gray"} borderRadius={"full"}></Box>
              <Text color={"gray"}>{songCount} songs</Text>
            </Flex>
          )}
          {songCount === 0 && (
            <Flex alignItems={"center"} gap={2}>
              <Text fontSize={"md"} color={"gray"}>
                Playlist
              </Text>
              <Box w={1} h={1} bg={"gray"} borderRadius={"full"}></Box>
              <Text color={"gray"}>{0} songs</Text>
            </Flex>
          )}
          {singer && (
            <Text color={"gray"} fontSize={"md"}>
              {singer}
            </Text>
          )}
        </Flex>
        {canLike && <LikeBtn />}
      </Flex>
    </Link>
  );
};

export default HSizeCard;
