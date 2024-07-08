import { Divider, Flex, Spinner, Text } from "@chakra-ui/react";
import HCardGrp from "../components/HCardGrp";
import VCard from "../components/VCard";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import likedPlaylistAtom from "../atoms/LikedPlaylistAtom";
import ownedPlaylistsAtom from "../atoms/OwnedPlaylistAtom";
import feedOneAtom from "../atoms/FeedOneAtom";
import feedTwoAtom from "../atoms/feedTwoAtom";
import likedSongsAtom from "../atoms/LikedSongsAtom";
import useGetFeedData from "../hooks/useGetFeedData";
import AudioPlayer from "../components/AudioPlayer";
import HomeTop from "../sections/HomeTop";
import YourTopMix from "../sections/YourTopMix";
import TopRated from "../sections/TopRated";
import BackInto from "../sections/BackInto";
import YourPlaylist from "../sections/YourPlaylist";

const HomePlayList = () => {
  const user = useRecoilValue(userAtom);
  // const { loading, feedOne, feedTwo, likedPlaylist, ownPlaylist, fetchData } =
  //   useGetFeedData();
  // const [feedOne, setFeedOne] = useRecoilState();
  const showToast = useShowToast();
  // console.log(fetchData);
  // const [loading, setLoading] = useState(true);

  return (
    // <h1>Hello</h1>
    <Flex p={4} w={"full"} overflow={"scroll"}>
      <Flex bg={"#121212"} w={"full"} flexDir={"column"} gap={6}>
        <Flex flexDir={"column"} gap={6} w={"full"}>
          {/* <AudioPlayer /> */}
          <Text fontSize={28} fontWeight={"bold"}>
            Good Evening
          </Text>
          {/* <HCardGrp /> */}
          <HomeTop />
        </Flex>
        <YourTopMix />
        {/* {feedOne?.length !== 0 && (
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
        )} */}
        <TopRated />
        {/* {feedTwo?.length !== 0 && (
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
        )} */}
        <BackInto />
        {/* {likedPlaylist?.length !== 0 && (
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
        )} */}
        <YourPlaylist />
        {/* {ownPlaylist?.length !== 0 && (
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
        )} */}
      </Flex>
    </Flex>
  );
};

export default HomePlayList;
