import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const LikeBtn = ({
  fs = "20",
  liked = false,
  setLiked,
  cName,
  handleAction,
}) => {
  // const [liked, setLiked] = useState(false);
  const handleLiked = () => {
    setLiked(!liked);
  };
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      onClick={handleAction}
    >
      {!liked && (
        <CiHeart className={cName} fontSize={fs} onClick={handleLiked} />
      )}
      {liked && (
        <FaHeart
          className={cName}
          color="#1bd760"
          fontSize={fs}
          onClick={handleLiked}
        />
      )}
    </Flex>
  );
};

export default LikeBtn;
