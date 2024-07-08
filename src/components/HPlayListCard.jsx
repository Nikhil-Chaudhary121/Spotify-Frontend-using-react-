import { Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import CardPlayPauseBtn from "./CardPlayPauseBtn";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import currPlaylistAtom from "../atoms/CurrPlaylistAtom";
import likedSongsAtom from "../atoms/LikedSongsAtom";
import { useRecoilState } from "recoil";

const HPlayListCard = ({
  avatar,
  title,
  playlistId,
  description,
  songList,
}) => {
  // const [likedSongs, setLikedSongs] = useRecoilState(likedSongsAtom);
  const navigate = useNavigate();
  const [currPlaylist, setCurrPlaylist] = useRecoilState(currPlaylistAtom);
  console.log(title);
  const handleSetPlaylist = () => {
    const data = {
      avatar: avatar,
      playlistId: playlistId,
      title: title,
      description: "This is description",
      songList: songList,
    };
    setCurrPlaylist({ ...data });
    console.log(currPlaylist);
  };
  return (
    <Flex
      onClick={() => {
        handleSetPlaylist();
        navigate(`/${playlistId}`);
      }}
      alignItems={"center"}
      w={"48%"}
      maxW={"49%"}
      className="h-play-card"
      justifyContent={"space-between"}
      mb={3}
      borderRadius={6}
      bg={"#191919"}
    >
      <Flex
        w={"full"}
        alignItems={"center"}
        className="h-card-container"
        opacity={1}
        gap={6}
        height={"64px"}
        pr={2}
      >
        <Image
          borderRadius={6}
          className="hcard-img"
          minW={"64px"}
          h={"full"}
          objectFit={"cover"}
          src={avatar}
        />
        <Text
          className="hcard-text"
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          fontSize={"md"}
          fontWeight={"bold"}
        >
          {title}
        </Text>
      </Flex>
      <CardPlayPauseBtn cName={"hide-on-1000"} fs="40" />
    </Flex>
  );
};

export default HPlayListCard;
