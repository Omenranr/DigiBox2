# Table of content
 * Introduction 
 * Technologies
 * Setup for Launch
 * Project status
 * Sources
 
## DigiBox intro to the project
DigiBox is a blockChain Dapp. We intend to simplify the interaction between customers and sellers using blockchain technology. Why you ask ? Using blockchain in this case is efficient as we will cut third parties sellers so less fees for customers.

### Technologies
Project is created with : 
 - Truffle frameWork,
 - Truffle unbox-react,
 - Deploying on Ropsten or Kovan TestNet,
 - Material UI,
 - Ganache,
 - Bootstrap,
 - Solidity ^0.8.0,
 - Off-Chain storage : IPFS/Pinata,
 - CoinGecko API,
 - UseDApp,
 - Chakra-UI.
 - Truffle test/helpers
   
#### Launch 
  Use Ganache and metamask in order to interact freely with our Dapp.  
  launch the app:  
  - truffle migrate  
  - npm i  
  - npm start  
    
  This project uses Pinata to store data on IPFS, in order to run it correctly create a Pinata account add this variables to your environment:  
  REACT_APP_PINATA_SECRET_API_KEY=  
  REACT_APP_PINATA_API_KEY=  

  This project runs along with a nodejs server that you can run locally, you need to set up this variable, with your local port:  
  REACT_APP_API_URL=http://localhost:3001  

  Check out the server Part here: https://github.com/alpsoft/DigiBox-Server  
  
##### Project status
Still in development, project being created, We will deliver a full functional project in Q4 2021. Stay tunned !  
To-Do list :  
Front-end -> HomePage of Dapp and global css/Styling.  
Backend -> use of PDF library for NFT creation
Smart contract => Creation of a Vault that allow use to receive eth and send it eth/Dai to our external providers and partners.  
  
###### Sources 
Alyra, blockchain school.  
@openzeppelin/contracts.  
#Uniswap-v3-periphery.              
