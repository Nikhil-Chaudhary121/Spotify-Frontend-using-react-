import React, { useState } from "react";
import { Howl, Howler } from "howler";
import { useRecoilState, useRecoilValue } from "recoil";
import songPlayedAtom from "../atoms/SongPlayedAtom";
import songCondi from "../atoms/SongCondiAtom";
import currSongAtom from "../atoms/CurrSongAtom";

const useMusicPlayerFunctions = () => {
  const [songPlayed, setSongPlayed] = useState(null);
  const currSong = useRecoilValue(currSongAtom);
  // console.log(currSong);
  const [songCondition, setSongCondition] = useRecoilState(songCondi);
  const handlePlaySong = (songUrl) => {
    let sound = new Howl({
      src: [songUrl],
      html5: true,
      volume: 1,
    });

    if (songPlayed) {
      // console.log("Song Stoped");
      songPlayed.stop();
    }
    // const howlerObject = ;
    setSongPlayed(sound);
    // console.log("SongPlayed");
    setSongCondition(true);
    sound.play();
  };

  const handlePausePlaySong = () => {
    // if (songCondition) {
    //   console.log("Song Paused");
    //   songPlayed.pause();
    //   setSongCondition(false);
    // } else {
    //   console.log("Song Played");
    //   songPlayed.play();
    //   setSongCondition(true);
    // }
  };
  return { handlePlaySong, handlePausePlaySong };
};

export default useMusicPlayerFunctions;
