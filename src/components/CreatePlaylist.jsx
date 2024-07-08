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

const MAX_CHAR = 50;

const CreatePlaylist = () => {
  // const { username } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [posts, setPosts] = useRecoilState(postsAtom);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistType, setPlaylistType] = useState("Happy");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const { handleImgChange, imgUrl, setImgUrl } = usePreviewImg();
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const res = await fetch("/api/playlists/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: playlistType,
          owner: user._id,
          playlistImg: imgUrl,
          playlistName: playlistName,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post Created Successfully", "success");
      // if (username === user.username) {
      // setPosts([data, ...posts]);
      console.log(data);
      setPlaylistName("");
      setRemainingChar(500);
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
              Create Playlist
            </Text>
          </Flex>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Input
                  type="text"
                  onChange={handleTextChange}
                  value={playlistName}
                  placeholder="Playlist Name "
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
                <FormControl mb={4}>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onChange={(e) => {
                      setPlaylistType(e.target.value);
                    }}
                  >
                    <option>Happy</option>
                    <option>Sad</option>
                    <option>Relaxed</option>
                    <option>Aggressive</option>
                    <option>Romantic</option>
                    <option>Mysterious</option>
                    <option>Hopeful</option>
                  </Select>
                </FormControl>
                <Input
                  type="file"
                  ref={imageRef}
                  onChange={handleImgChange}
                  hidden
                />

                <BsFillImageFill
                  size={16}
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => imageRef.current.click()}
                />
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
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};

export default CreatePlaylist;
