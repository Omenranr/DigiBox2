import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import React from "react";

export const test = {
  children: ReactNode,
};

export default function Layout({ children }) {
  return (
    <Flex
      flexDirection="column"
      position="absolute"
      right="24px"
      alignItems="center"
      justifyContent="center"
      h="8vh"
      bg="rgba(0,0,0,0)"
    >
      {children}
    </Flex>
  );
}