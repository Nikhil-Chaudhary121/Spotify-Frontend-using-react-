import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewSong = () => {
  const [songAudioUrl, setSongAudioUrl] = useState(null);
  const [trackName, setTrackName] = useState("");
  const showToast = useShowToast();
  const handleSongChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setTrackName(file.name);
    if (file && file.type.startsWith("audio/")) {
      const reader = new FileReader();
      console.log("this is a audio file ");
      reader.onloadend = () => {
        setSongAudioUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("this is a not  audio file ");
      showToast("Invalid file type", "Please select an image file", "error");
      setImgUrl(null);
    }
  };
  // console.log(songUrl);
  return {
    handleSongChange,
    songAudioUrl,
    setSongAudioUrl,
    trackName,
    setTrackName,
  };
};

export default usePreviewSong;
