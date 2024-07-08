import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import authScreenAtom from "../atoms/AuthAtom";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

export default function SignUpCard() {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.setItem("user-spotify", JSON.stringify(data));
      setUser(data);
      console.log(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      //   bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={"#1bd790"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy your taste in music
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "#161616")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="fullName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    value={inputs.name}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="userName" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                    value={inputs.username}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                value={inputs.email}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  value={inputs.password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSubmit}
                loadingText="Submitting"
                isLoading={loading}
                size="lg"
                bg={"#1bd760"}
                color={"white"}
                _hover={{
                  bg: "green",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"#1bd760"} onClick={() => setAuthScreen("login")}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
