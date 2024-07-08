import { Flex, Spinner, Text } from "@chakra-ui/react";
import VSizeCard from "./VSizeCard";
import NextSongCard from "./NextSongCard";
import { Divider } from "@chakra-ui/react";
import useRightFeed from "../hooks/useRightFeed";
import useMusicPlayerFunctions from "../hooks/useMusicPlayerFunctions";

const RightSiderBar = () => {
  const { handlePlaySong } = useMusicPlayerFunctions();
  const { rightFeed, loading } = useRightFeed();
  if (loading) {
    return (
      <Flex justifyContent={"center"} my={12}>
        {/* {console.log("fetching data")} */}
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      overflow={"scroll"}
      p={4}
      minW={"200px"}
      w={"25vw"}
      bg={"#121212"}
      gap={6}
      className="right-siderbar"
      mb={20}
    >
      <Flex w={"full"}>
        <Text fontWeight={"bold"}>Liked Songs</Text>
      </Flex>
      {/* <VSizeCard /> */}
      {rightFeed &&
        rightFeed.map((song, idx) => (
          <VSizeCard
            key={idx}
            // playlist={playlist}
            handleSongAction={handlePlaySong}
            idx={idx}
            songId={song._id}
            avatar={song.songImg}
            songName={song.songName}
            singerName={song.singerName}
            albumName={song.songName}
            totDur={song.totDur}
            songUrl={song.songUrl}
          />
        ))}
      {/* <NextSongCard
          avatar={"/card-img9.jpg"}
          title={"Next in Queue"}
          songName={"No Other Body"}
        /> */}
      <Divider mt={6} bg={"transparent"} mb={20} />
    </Flex>
  );
};

export default RightSiderBar;
