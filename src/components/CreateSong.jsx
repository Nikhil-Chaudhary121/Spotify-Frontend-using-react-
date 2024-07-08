import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
// import postsAtom from "../atoms/postsAtom";
import { useParams } from "react-router-dom";
import usePreviewSong from "../hooks/usePreviewSong";

const MAX_CHAR = 50;

const CreateSongs = () => {
  // const { username } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [posts, setPosts] = useRecoilState(postsAtom);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistType, setPlaylistType] = useState("Happy");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const { handleImgChange, imgUrl, setImgUrl } = usePreviewImg();
  const {
    handleSongChange,
    songAudioUrl,
    setSongAudioUrl,
    trackName,
    setTrackName,
  } = usePreviewSong();
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const imageRef = useRef(null);
  const songRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    // songName: trackName || "",
    singerName: "",
    songImg: "",
    totDur: "",
    songUrl: "",
  });
  // console.log(trackName);
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPlaylistName(truncatedText);
      setRemainingChar(0);
    } else {
      setPlaylistName(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
    // setPlaylistName(e.target.value);
  };
  const handleCreatePost = async () => {
    if (loading) return;
    // setLoading(true);
    // console.log({ ...inputs, songImg: imgUrl });
    try {
      const songData = {
        songName: trackName,
        singerName: inputs.singerName,
        songImg: imgUrl,
        totDur: inputs.totDur,
        songUrl: songAudioUrl,
      };
      console.log(songData);
      const res = await fetch("/api/admin/songs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...songData,
          // ...inputs,
          // songImg: imgUrl,
          // songUrl: songAudioUrl,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Song Created Successfully", "success");
      // if (username === user.username) {
      //   setPosts([data, ...posts]);
      console.log(data);
      setInputs({
        // songName: "",
        singerName: "",
        songImg: "",
        totDur: "",
        songUrl: "",
      });
      setRemainingChar(50);
      // }
      onClose();
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
  {
    return (
      <>
        <Flex
          onClick={onOpen}
          alignItems={"center"}
          borderRadius={4}
          className="song-card"
          p={2}
          gap={4}
        >
          <Image w={12} h={12} borderRadius={6} src={"/iconPlus.png"} />
          <Flex className="hide-on-900" flexDirection={"column"}>
            <Text fontWeight={"bold"} fontSize={"md"}>
              Create Song
            </Text>
          </Flex>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Song</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <Input
                  isRequired
                  mb={2}
                  type="text"
                  onChange={(e) => {
                    handleTextChange(e);
                    setTrackName(e.target.value);
                  }}
                  value={trackName}
                  placeholder="Song Name"
                />
                <Text
                  fontSize={"xs"}
                  fontWeight={"bold"}
                  textAlign={"right"}
                  m={"1"}
                  color={"gray.800"}
                >
                  {remainingChar}/{MAX_CHAR}
                </Text>
                <Input
                  isRequired
                  mb={2}
                  type="text"
                  onChange={(e) => {
                    handleTextChange(e);
                    setInputs({ ...inputs, singerName: e.target.value });
                  }}
                  value={inputs.singerName}
                  placeholder="Singer Name"
                />
                <Input
                  isRequired
                  mb={2}
                  type="text"
                  onChange={(e) => {
                    handleTextChange(e);
                    setInputs({ ...inputs, totDur: e.target.value });
                  }}
                  value={inputs.totDur}
                  placeholder="total Dur"
                />
                <Input
                  isRequired
                  type="file"
                  ref={imageRef}
                  onChange={handleImgChange}
                  hidden
                />
                <Input
                  isRequired
                  type="file"
                  ref={songRef}
                  onChange={handleSongChange}
                  hidden
                />

                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <BsFillImageFill
                    size={16}
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    onClick={() => imageRef.current.click()}
                  />
                  <Button onClick={() => songRef.current.click()}>
                    Select Song Track
                  </Button>
                </Flex>
              </FormControl>
              {imgUrl && (
                <Flex w={"full"} mt={5} position={"relative"}>
                  <Img src={imgUrl} alt="Selected image" />
                  <CloseButton
                    onClick={() => {
                      setImgUrl("");
                    }}
                    bg={"gray.800"}
                    position={"absolute"}
                    top={2}
                    right={2}
                  />
                </Flex>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={loading}
                colorScheme="blue"
                mr={3}
                onClick={handleCreatePost}
              >
                Create Songs
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};

export default CreateSongs;
