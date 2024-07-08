import { Divider, Flex, Spinner, Text } from "@chakra-ui/react";
import useGetFeedData from "../hooks/useGetFeedData";
import VCard from "../components/VCard";
import useGetOwnPlaylist from "../hooks/useGetOwnPlaylist";

const YourPlaylist = () => {
  const { loading, ownPlaylist } = useGetOwnPlaylist();
  if (!ownPlaylist && loading) {
    return (
      <Flex justifyContent={"center"} my={12}>
        {/* {console.log("fetching data")} */}
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  return (
    <>
      {ownPlaylist?.length !== 0 && (
        <Flex flexDir={"column"} gap={6} w={"full"}>
          <Text fontSize={28} fontWeight={"bold"}>
            Your Playlists
          </Text>
          <Flex
            gap={4}
            className="card-cantainer"
            justifyContent={"space-around"}
            flexWrap={"wrap"}
          >
            {ownPlaylist?.map((playlist, idx) => (
              <VCard
                key={idx}
                songList={playlist.songs}
                playlistId={playlist._id}
                avatar={playlist.playlistImg}
                title={playlist.playlistName}
                description={"This is a Playlist "}
              />
            ))}
          </Flex>
          <Divider my={12} />
        </Flex>
      )}
    </>
  );
};

export default YourPlaylist;
