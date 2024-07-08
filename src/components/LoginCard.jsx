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
import { useRecoilState, useSetRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const showToast = useShowToast();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
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
            Login
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Back into your account
          </Text>
        </Stack>
        <Box
          w={{
            base: "full",
            sm: "400px",
          }}
          rounded={"lg"}
          bg={useColorModeValue("white", "#161616")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>username</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                value={inputs.username}
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
                loadingText="Login in"
                isLoading={loading}
                onClick={handleLogin}
                size="lg"
                bg={"#1bd760"}
                color={"white"}
                _hover={{
                  bg: "green",
                }}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have any account?{" "}
                <Link color={"#1bd760"} onClick={() => setAuthScreen("signup")}>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
