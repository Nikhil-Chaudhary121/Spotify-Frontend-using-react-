import { useState } from "react";
import useShowToast from "./useShowToast";
import { useRecoilValue } from "recoil";
import currSongAtom from "../atoms/CurrSongAtom";

const usePlaySong = () => {
  // const [songAudioUrl, setSongAudioUrl] = useState(null);
  const currSong = useRecoilValue(currSongAtom);
  // const [trackName, setTrackName] = useState("");
  const showToast = useShowToast();
  const handlePlaySong = () => {
    console.log(currSong.songName);
  };
  // console.log(songUrl);
  return {
    handlePlaySong,
  };
};

export default usePlaySong;
