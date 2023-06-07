import { Box, Button, Flex } from "@chakra-ui/react";
import {useState,useEffect} from 'react'
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showLogOut,setShowLogout]=useState<Boolean>(false);
  const handleLogOut = () => {
    setShowLogout(false)
    localStorage.removeItem("token");
    navigate('/')
  };
  const show = localStorage.getItem("token");
  useEffect(()=>{
    if(show){
      setShowLogout(true)
    }
  },[show])

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Box marginLeft="auto">
        {showLogOut && (
          <Button onClick={handleLogOut} style={{ marginRight: "10px" }}>
            Logout
          </Button>
        )}
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
