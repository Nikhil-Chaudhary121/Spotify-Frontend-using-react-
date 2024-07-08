import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import fullScreenAuth from "../atoms/FullScreenAuth";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import useLogout from "../hooks/useLogout";
import useShowToast from "../hooks/useShowToast";
import usePreviewImg from "../hooks/usePreviewImg";
import { IoPersonOutline } from "react-icons/io5";

export default function UserProfilePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [fullScreen, setFullScreen] = useRecoilState(fullScreenAuth);
  const [user, setUser] = useRecoilState(userAtom);
  // const { handleImgChange, imgUrl } = usePreviewImg();
  const showToast = useShowToast();
  const [updating, setUpdating] = useState(false);
  const handleLogout = () => {
    logout();
    onClose();
  };
  const handlOnSubmit = async (e) => {
    e.preventDefault();
    if (updating) return;
    setUpdating(true);
    // console.log(inputs);
    // const data = {
    //   username: inputs.username,
    //   name: inputs.name,
    //   email: inputs.email,
    //   bio: inputs.bio,
    //   profilePic: imgUrl,
    //   password: inputs.password,
    // };
    // console.log(imgUrl);
    try {
      const res = await fetch(`/api/users/profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ ...inputs }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Profile Updated Successfully", "success");
      setUser(data);
      localStorage.setItem("user-spotify", JSON.stringify(data));
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

  // const fileRef = useRef(null);
  const logout = useLogout();
  // console.log(user);
  const [inputs, setInputs] = useState({
    username: user?.username,
    name: user?.name,
    email: user?.email,
    bio: user?.bio,
    // profilePic: user?.profilePic,
    password: "",
  });
  // setFullScreen(true);
  return (
    <>
      <Button
        // pos={"fixed"}
        bg={useColorModeValue("gray.300", "gray.dark")}
        // bottom={10}
        // right={5}
        zIndex={99999999999}
        size={{ base: "sm", sm: "md" }}
        onClick={onOpen}
      >
        {" "}
        <IoPersonOutline className="" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#121212"}>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              overflow={"scroll"}
              //   minH={"100vh"}
              align={"center"}
              justify={"center"}
              bg={useColorModeValue("gray.50", "#121212")}
            >
              <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={useColorModeValue("white", "#121212")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={0}
                my={12}
              >
                {/* z */}
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  User Profile Edit
                </Heading>
                {/* <FormControl id="userName">
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src="https://bit.ly/sage-adebayo"
                      ></Avatar>
                    </Center>
                    <Center w="full">
                      <Button w="full">Change Icon</Button>
                    </Center>
                  </Stack>
                </FormControl> */}
                <FormControl id="fullName">
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="Full Name"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    value={inputs.name}
                  />
                </FormControl>
                <FormControl id="userName">
                  <FormLabel>User name</FormLabel>
                  <Input
                    placeholder="Username"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                    value={inputs.username}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    placeholder="your-email@example.com"
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                    onChange={(e) =>
                      setInputs({ ...inputs, email: e.target.value })
                    }
                    value={inputs.email}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="password"
                    _placeholder={{ color: "gray.500" }}
                    type="password"
                    onChange={(e) =>
                      setInputs({ ...inputs, password: e.target.value })
                    }
                    value={inputs.password}
                  />
                </FormControl>
                {/* <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "red.500",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"#1bd760"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "#1bd790",
                    }}
                  >
                    Submit
                  </Button>
                </Stack> */}
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              colorScheme="blue"
              mr={3}
              color={"white"}
              bg={"red.700"}
              _hover={{
                bg: "red.500",
              }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
            <Button
              bg={"#1bd750"}
              onClick={handlOnSubmit}
              isLoading={updating}
              color={"white"}
              _hover={{
                bg: "#1bd770",
              }}
              variant="ghost"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// );
// }
