import { Flex } from "@chakra-ui/react";
import { PiMicrophoneStage } from "react-icons/pi";
import { MdDevices } from "react-icons/md";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";
import { MdQueueMusic } from "react-icons/md";
import { BsMusicPlayer } from "react-icons/bs";
import { useState } from "react";

const UselessOptions = () => {
    const [mute , setMute ] = useState(false);
    const handleMute = () => {
      setMute(!mute);
    };
  return (
    <Flex alignItems={"center"} className="musicplayer-useless-icons" gap={2} px={6}>
        <BsMusicPlayer className="useless-icons-900"/>
        <PiMicrophoneStage className="useless-icons-900" />
        <MdQueueMusic className="useless-icons-900"/>
        <MdDevices  className="useless-icons-900"/>
        {!mute && <HiOutlineSpeakerWave className="useless-icons-600" onClick={handleMute}/>}
        {mute && <HiOutlineSpeakerXMark className="useless-icons-600" onClick={handleMute} />}
        <input  type="range" min={0} max={100} step={1} className="vol-bar useless-icons-700" /> 
    </Flex>
  )
}

export default UselessOptions