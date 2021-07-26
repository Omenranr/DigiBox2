import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
import Routes from './Routes'

const App = () => {
  
  const [web3, setweb3] = useState(undefined)
  const [accounts, setAccounts] = useState(undefined)
  const [contract, setContract] = useState(undefined)

  useEffect(() => {

    const init = async() => {
             // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setweb3(web3)
      setAccounts(accounts)
      setContract(contract)
    }
    init()
  }, []) 
 

    return (

      <Router>
        <Routes />
      </Router>
    );

}

export default App;
