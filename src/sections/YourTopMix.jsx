import { Flex, Spinner, Text } from "@chakra-ui/react";
// import useGetFeedData from "../hooks/useGetFeedData";
import VCard from "../components/VCard";
import useGetFeedOne from "../hooks/useGetFeedOne";

const YourTopMix = () => {
  const { loading, feedOne } = useGetFeedOne();
  if (!feedOne && loading) {
    return (
      <Flex justifyContent={"center"} my={12}>
        {/* {console.log("fetching data")} */}
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  return (
    <>
      {feedOne?.length !== 0 && (
        <Flex flexDir={"column"} gap={6} w={"full"}>
          <Text fontSize={28} fontWeight={"bold"}>
            Your top mixes
          </Text>
          <Flex
            gap={4}
            justifyContent={"space-around"}
            className="card-cantainer"
            flexWrap={"wrap"}
          >
            {feedOne?.map((playlist, idx) => (
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

export default YourTopMix;
