import { Flex, Image, Text } from "@chakra-ui/react";
import LikeBtn from "./LikeBtn";
import useMusicPlayerFunctions from "../hooks/useMusicPlayerFunctions";
import { useRecoilState, useRecoilValue } from "recoil";
import currPlaylistAtom from "../atoms/CurrPlaylistAtom";
import likedSongsAtom from "../atoms/LikedSongsAtom";
import { useState } from "react";
import currSongAtom from "../atoms/CurrSongAtom";

const VSizeCard = ({
  idx,
  avatar,
  songName,
  singerName,
  albumName,
  totDur,
  songId,
  songUrl,
  handleSongAction,
}) => {
  const [currPlaylist, setCurrPlaylist] = useRecoilState(currPlaylistAtom);
  const [currSong, setCurrSong] = useRecoilState(currSongAtom);
  const likedSongs = useRecoilValue(likedSongsAtom);
  const isCurrSong = currSong?.songId === songId ? true : false;
  let isSongLiked = likedSongs?.songs.some((obj) => obj._id === songId);
  const [liked, setLiked] = useState(isSongLiked);
  const handleSetPlaylist = (event) => {
    // event.prevent.default();
    // const data = {
    //   avatar: avatar,
    //   playlistId: playlist._id,
    //   title: playlist.playlistName,
    //   description: "This is description",
    //   songList: playlist.songs,
    // };
    setCurrPlaylist(() => null);
    // console.log(currPlaylist);
    // console.log(playlist);
  };
  // console.log(song);
  const handleSongClickAction = async () => {
    const data = {
      songIdx: idx,
      avatar: avatar,
      songName: songName,
      singerName: singerName,
      albumName: "",
      totDur: totDur,
      songId: songId,
      songUrl: songUrl,
    };
    console.log("Click");
    setCurrSong(() => data);
    handleSongAction(songUrl);
  };

  return (
    <Flex flexDir={"column"} w={"full"}>
      <Image
        src={avatar}
        onClick={handleSongClickAction}
        mb={2}
        borderRadius={6}
      />
      <Flex justifyContent={"space-between"} alignItems={"center"} pr={6}>
        <Flex mt={2} flexDir={"column"} justifyContent={"center"}>
          {isCurrSong && (
            <Text
              fontSize={"md"}
              color="#1bd790"
              lineHeight={1}
              fontWeight={600}
            >
              {songName.slice(0, 15)}
            </Text>
          )}
          {!isCurrSong && (
            <Text fontSize={"md"} lineHeight={1} fontWeight={600}>
              {songName.slice(0, 15)}
            </Text>
          )}
          <Text opacity={0.5} mt={1} ml={0.5} fontSize={13}>
            {singerName}
          </Text>
        </Flex>
        <LikeBtn liked={liked} setLiked={setLiked} />
      </Flex>
    </Flex>
  );
};

export default VSizeCard;
