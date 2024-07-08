import { Flex, Spinner, Text } from "@chakra-ui/react";
import VCard from "../components/VCard";
// import useGetFeedData from "../hooks/useGetFeedData";
import useGetFeedTwo from "../hooks/useGetFeedTwo";

const TopRated = () => {
  const { loading, feedTwo } = useGetFeedTwo();
  if (!feedTwo && loading) {
    return (
      <Flex justifyContent={"center"} my={12}>
        {/* {console.log("fetching data")} */}
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  return (
    <>
      {feedTwo?.length !== 0 && (
        <Flex flexDir={"column"} gap={6} w={"full"}>
          <Text fontSize={28} fontWeight={"bold"}>
            Top Rated
          </Text>
          <Flex
            gap={4}
            justifyContent={"space-around"}
            className="card-cantainer"
            flexWrap={"wrap"}
          >
            {feedTwo?.map((playlist, idx) => (
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

export default TopRated;
