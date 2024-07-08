import { Flex, Spinner, Text } from "@chakra-ui/react";
// import useGetFeedData from "../hooks/useGetFeedData";
import useGetLikedPlaylist from "../hooks/useGetLikedPlaylist";
import VCard from "../components/VCard";

const BackInto = () => {
  const { loading, likedPlaylist } = useGetLikedPlaylist();
  if (!likedPlaylist && loading) {
    return (
      <Flex justifyContent={"center"} my={12}>
        {/* {console.log("fetching data")} */}
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  return (
    <>
      {likedPlaylist?.length !== 0 && (
        <Flex flexDir={"column"} gap={6} w={"full"}>
          <Text fontSize={28} fontWeight={"bold"}>
            Jump Back In
          </Text>
          <Flex
            gap={4}
            className="card-cantainer"
            justifyContent={"space-around"}
            flexWrap={"wrap"}
          >
            {likedPlaylist?.map((playlist, idx) => (
              <VCard
                key={idx}
                songList={playlist?.songs}
                playlistId={playlist._id}
                avatar={playlist.playlistImg}
                title={playlist.playlistName}
                description={"This is a Playlist "}
              />
            ))}
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default BackInto;
