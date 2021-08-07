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
      background="rgb(255, 82, 97, 0.7)"
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
        bg="rgb(142, 0, 12,0.7)"
        border="1px solid transparent"
        _hover={{
          border: "1px solid transparent",
          backgroundColor: "rgb(142, 0, 12,0.8)",
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
      bg="rgb(142, 0, 12,0.7)"
      color="#fff"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="rgb(142, 0, 12,0.7)l"
      border="1px solid transparent"
      _hover={{
        borderColor: "transparent",
        color: "rgb(255, 82, 97, 0.8)",
      }}
      _active={{
        backgroundColor: "rgb(142, 0, 12,0.7)",
        borderColor: "transparent",
      }}
    >
      Connect to walrgb(142, 0, 12,0.7)et
    </Button>
    </div>
  );
}