import { Divider, Flex, Spinner, Text } from "@chakra-ui/react";
import { VscLibrary } from "react-icons/vsc";
import { FiPlus } from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import HSizeCard from "./HSizeCard";
import CreatePlaylist from "./CreatePlaylist";
import { useRecoilState } from "recoil";
import likedPlaylistAtom from "../atoms/LikedPlaylistAtom";
import ownedPlaylistsAtom from "../atoms/OwnedPlaylistAtom";
import CreateSongs from "./CreateSong";
import useGetFeedData from "../hooks/useGetFeedData";
import useGetLikedSongs from "../hooks/useGetLikedSongs";
import useGetOwnPlaylist from "../hooks/useGetOwnPlaylist";

const SideBarBottom = () => {
  // const [ownPlaylist, setOwnPlaylist] = useRecoilState(ownedPlaylistsAtom);
  const { fetching, likedSongs } = useGetLikedSongs();
  const { loading, ownPlaylist } = useGetOwnPlaylist();
  // const { likedSongs, loading } = useGetFeedData();
  // console.log(likedSongs);

  if (!likedSongs) {
    return (
      <Flex justifyContent={"center"} my={12}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  // const [likedPlaylist, setLikedPlaylist] = useRecoilState(likedPlaylistAtom);
  return (
    <>
      <Flex
        flexDirection={"column"}
        gap={4}
        p={4}
        w={"full"}
        h={"full"}
        background={"#121212"}
        borderRadius={6}
        overflow={"scroll"}
        className="siderbar-part-size "
        pos={"relative"}
      >
        <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"}>
          <Flex
            alignItems={"center"}
            className="siderbar-part"
            gap={4}
            w={"full"}
          >
            <VscLibrary className="sidebar-icon" />
            <Text className="hide-on-900" fontWeight={"bold"}>
              Library
            </Text>
          </Flex>
          <Flex
            className="hide-on-900"
            alignItems={"center"}
            justifyContent={"end"}
            w={"full"}
            gap={2}
          >
            <FiPlus />
            <IoArrowForward />
          </Flex>
        </Flex>
        <Flex
          flexDir={"column"}
          className="lib-box siderbar-box"
          gap={1}
          background={"#101010"}
          p={2}
          mx={-2}
          borderRadius={6}
        >
          <CreatePlaylist />
          <CreateSongs />
          <HSizeCard
            avatar={"/card-img1.jpg"}
            title={"Liked Songs"}
            playlistId={"likedsongs"}
            // songCount={likedSongs.songs.length}
          />
          {ownPlaylist &&
            ownPlaylist.map((playlist, idx) => (
              <HSizeCard
                key={idx}
                playlistId={playlist._id}
                avatar={playlist.playlistImg}
                songList={playlist.songs}
                title={playlist.playlistName}
                // description={"This is a Playlist "}
                songCount={playlist.songs.length}
              />
            ))}
        </Flex>
      </Flex>
    </>
  );
};

export default SideBarBottom;
