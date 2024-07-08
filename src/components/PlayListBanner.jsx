import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import useGetPlaylist from "../hooks/useGetPlaylist";

const PlayListBanner = () => {
  const { playlist, loading } = useGetPlaylist();
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
      px={6}
      bg={"#151515"}
      py={6}
      borderRadius={8}
      w={"full"}
      gap={6}
      alignItems={"center"}
    >
      <Image
        borderRadius={8}
        className="banner-img"
        h={52}
        src={playlist.playlistImg}
      />
      <Flex
        flexDirection={"column"}
        h={"full"}
        w={"full"}
        justifyContent={"space-between"}
      >
        <Text fontSize={15}>Playlist</Text>
        <Text
          fontSize={"70px"}
          whiteSpace={"none"}
          className="banner-title"
          fontWeight={"bold"}
        >
          {playlist.playlistName}
        </Text>
        <Flex gap={2} alignItems={"center"}>
          <Text className="banner-des">{playlist?.owner.name} </Text>
          <Box mt={2} h={1} w={1} bg={"gray"} borderRadius={"full"}></Box>
          <Text className="banner-des">{playlist.songs.length} Song</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PlayListBanner;
