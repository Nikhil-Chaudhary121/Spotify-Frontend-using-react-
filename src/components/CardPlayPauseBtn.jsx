import { Flex } from "@chakra-ui/react"
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { useState } from "react";


const PlayPauseBtn = ({cName , fs = "50"}) => {
    const [liked , setLiked] = useState(false);
    const handleLiked = () => {
      setLiked(!liked);
    };
  return (
    <Flex mr={6} background={"#000"} borderRadius={"full"} className={`card-play-icon ${cName}`}   >
            {!liked && <FaCirclePlay onClick={handleLiked} className="card-play-icon" color="#1bd760" fontSize={fs} />}
            {liked && <FaCirclePause onClick={handleLiked} className="card-play-icon" color="#1bd760" fontSize={fs} />}
        </Flex>
  )
}

export default PlayPauseBtn