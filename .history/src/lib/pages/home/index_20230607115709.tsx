import React, { useState,  } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/context";

const Home = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const { setData } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = () => {
    const validEmail = "test@gmail.com";
    const validPassword = "Test@123";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      console.log(email);
      if (email === validEmail && password === validPassword) {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdEBnbWFpbC5jb20iLCJwYXNzd29yZCI6InRlc3RAMTIzIn0.M3_mbyV1eAa_9BNXFVH3e_32WtZYAzP1mh2WFOVw3bo";
        localStorage.setItem("token", token);
        navigate("/addTodo");
        setData("Marquee Equity");
        toast({
          title: "Welcome To Add Todo's",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Incorrect Email Or Password",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Please Enter Correct Email format or password format",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="Email"
          type="email"
          variant="filled"
          mb={3}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          placeholder="password"
          type="password"
          variant="filled"
          mb={6}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          colorScheme="teal"
          mb={8}
          onClick={() => {
            handleLogin();
          }}
        >
          Log In
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
