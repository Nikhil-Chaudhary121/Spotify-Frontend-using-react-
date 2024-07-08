import { Flex } from "@chakra-ui/react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { useState } from "react";
import { IoIosShuffle } from "react-icons/io";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import LikeBtn from "./LikeBtn";
import useShowToast from "../hooks/useShowToast";
import likedPlaylistAtom from "../atoms/LikedPlaylistAtom";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import ownedPlaylistsAtom from "../atoms/OwnedPlaylistAtom";

const BannerActionGrp = ({ playlist }) => {
  const { playlistId } = useParams();

  const showToast = useShowToast();
  const ownPlaylist = useRecoilValue(ownedPlaylistsAtom);
  const likedPlaylist = useRecoilValue(likedPlaylistAtom);
  // const currPlaylist = useRecoilValue(currPlaylistAtom);
  // console.log(likedPlaylist);
  // console.log(currPlaylist);
  let isOwnedPlaylist = ownPlaylist.some((obj) => obj._id === playlistId);
  let isLikedPlaylist = likedPlaylist.some((obj) => obj._id === playlistId);

  const [liked, setLiked] = useState(isLikedPlaylist);

  const handleFollowUnFollowPlaylist = async () => {
    const res = await fetch(`api/playlists/follow/${playlist._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      return showToast("Error", data.error, "error");
    }
    showToast("Success", data.message, "success");
    setLiked(!liked);
  };
  const handleLiked = () => {
    setLiked(!liked);
  };
  return (
    <Flex px={6} gap={8} py={2} alignItems={"center"}>
      <Flex borderRadius={"full"}>
        {!liked && (
          <FaCirclePlay
            onClick={handleLiked}
            className="player-icons"
            color="#1bd760"
            fontSize={54}
          />
        )}
        {liked && (
          <FaCirclePause
            onClick={handleLiked}
            className="player-icons"
            color="#1bd760"
            fontSize={54}
          />
        )}
      </Flex>
      <IoIosShuffle fontSize={46} className="player-icons" opacity={0.5} />
      {!isOwnedPlaylist && (
        <LikeBtn
          liked={liked}
          setLiked={setLiked}
          cName="player-icons"
          fs="36"
          handleAction={handleFollowUnFollowPlaylist}
        />
      )}
      <MdOutlineDownloadForOffline
        fontSize={40}
        className="player-icons"
        opacity={0.5}
      />
    </Flex>
  );
};

export default BannerActionGrp;
