import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import {AlertBanners} from "../../../Components"
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
import React, { useEffect, useState } from "react";

export const openMod = {
  handleOpenModal: null,
};

export default function ConnectButton({ handleOpenModal }) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [connectionAlert, setConnectionAlert] = useState(false)
  const [connectionSuccess, setConnectionSuccess] = useState(false)

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  useEffect(() => {
    if (account !== undefined) {
      setConnectionSuccess(true)
    } else {
      setConnectionAlert(true)
    }
  }, [account])

  return account ? (
    <div>
    <AlertBanners 
    open={connectionSuccess} 
    setOpen={setConnectionSuccess} 
    severity="success"
    alertMessage="Connected to MetaMask successfully"
    autoHideDuration={1500}
  />
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
    </div>
  ) : (
    <div>
    <AlertBanners 
      open={connectionAlert} 
      setOpen={setConnectionAlert} 
      severity="warning"
      alertMessage="Please connect to MetaMask"
    />
    <Button
      onClick={handleConnectWallet}
      bg="blue.800"
      color="blue.300"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: "blue.700",
        color: "blue.400",
      }}
      _active={{
        backgroundColor: "blue.800",
        borderColor: "blue.700",
      }}
    >
      Connect to wallet
    </Button>
    </div>
  );
}