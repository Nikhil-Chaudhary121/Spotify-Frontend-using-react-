import {
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";

import LikeBtn from "./LikeBtn";
// import useGetFeedData from "../hooks/useGetFeedData";
import useGetOwnPlaylist from "../hooks/useGetOwnPlaylist";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import currSongAtom from "../atoms/CurrSongAtom";
import usePlaySong from "../hooks/usePlaySong";
import currPlaylistAtom from "../atoms/CurrPlaylistAtom";
import useMusicPlayerFunctions from "../hooks/useMusicPlayerFunctions";
import songPlayedAtom from "../atoms/SongPlayedAtom";
import likedSongsAtom from "../atoms/LikedSongsAtom";
import e from "cors";

const SongCard = ({
  playlist,
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
  const { ownPlaylist } = useGetOwnPlaylist();
  // const { handlePlaySong } = usePlaySong();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [currSong, setCurrSong] = useRecoilState(currSongAtom);
  const [currPlaylist, setCurrPlaylist] = useRecoilState(currPlaylistAtom);
  const { handlePlaySong } = useMusicPlayerFunctions();
  const likedSongs = useRecoilValue(likedSongsAtom);
  let isSongLiked = likedSongs?.songs.some((obj) => obj._id === songId);
  const [liked, setLiked] = useState(isSongLiked);

  const handleSetPlaylist = () => {
    const data = {
      avatar: avatar,
      playlistId: playlist._id,
      title: playlist.playlistName,
      description: "This is description",
      songList: playlist.songs,
    };
    setCurrPlaylist(() => data);
    // console.log(currPlaylist);
    // console.log(playlist);
  };

  const showToast = useShowToast();
  const handleLikeUnLikeSong = async () => {
    if (updating) {
      return;
    }
    setUpdating(true);
    const res = await fetch(`/api/songs/like/${songId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      showToast("Error", data.error, "error");
      return;
    }
    showToast("Success", data.message, "success");
    try {
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };
  const handleSongClickAction = async () => {
    const data = {
      songIdx: idx,
      avatar: avatar,
      songName: songName,
      singerName: singerName,
      albumName: albumName,
      totDur: totDur,
      songId: songId,
      songUrl: songUrl,
    };
    // console.log("Click");
    setCurrSong(() => data);
    handleSongAction(songUrl);
  };
  const handleAddToPlaylist = async (playlistId) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/songs/add/${playlistId}/${songId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", data.message, "success");
      console.log(playlistId, songId);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
  const isCurrSong = currSong?.songId === songId ? true : false;
  // console.log(isCurrSong);
  return (
    <Flex
      alignItems={"center"}
      className="song-card"
      w={"full"}
      position={"relative"}
      onClick={() => {
        handleSetPlaylist();
        handleSongClickAction();
      }}
      px={6}
      py={2}
    >
      <Flex
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={4}
      >
        <Flex gap={4} alignItems={"center"}>
          {isCurrSong && <Text color={"#1bd790"}>{idx + 1}</Text>}
          {!isCurrSong && <Text>{idx + 1}</Text>}

          <Image
            h={12}
            w={12}
            backgroundPosition={"center"}
            objectFit={"cover"}
            borderRadius={2}
            src={avatar}
          />
          <Flex
            flexDir={"column"}
            justifyContent={"space-between"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
          >
            {isCurrSong && (
              <Text
                fontSize={18}
                color={"#1bd790"}
                className="song-name"
                fontWeight={500}
              >
                {songName}
              </Text>
            )}
            {!isCurrSong && (
              <Text fontSize={18} className="song-name" fontWeight={500}>
                {songName}
              </Text>
            )}
            <Text fontSize={14} color={"gray"} fontWeight={400}>
              {singerName}
            </Text>
          </Flex>
        </Flex>
        <Flex className="ablum hide-on-1600">
          <Text>{albumName}</Text>
        </Flex>
        <Flex gap={6} mr={3}>
          <LikeBtn
            liked={liked}
            setLiked={setLiked}
            handleAction={handleLikeUnLikeSong}
            cName={"hover-unhide"}
          />
          <Text>{totDur}</Text>
          <Menu>
            <MenuButton>
              <IoIosAddCircleOutline size={24} cursor={"pointer"} />
            </MenuButton>
            <Portal>
              <MenuList bg={"#121212"}>
                {ownPlaylist?.map((playlist) => (
                  <MenuItem
                    key={playlist._id}
                    bg={"#121212"}
                    // mb={1}
                    alignItems={"start"}
                    display={"flex"}
                    flexDir={"column"}
                    cursor={"pointer"}
                    onClick={() => {
                      handleAddToPlaylist(playlist._id);
                    }}
                  >
                    {playlist.playlistName}
                    <Divider mt={2} />
                  </MenuItem>
                ))}
                {/* <MenuItem bg={"#121212"} onClick={console.log("click")}>
                  Copy link
                </MenuItem> */}
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SongCard;
