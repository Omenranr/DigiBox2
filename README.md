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
 - Material UI,
 - Ganache,
 - Bootstrap,
 - Solidity ^0.8.0,
 - Off-Chain storage : IPFS/Pinata,
 
 #### Launch 
  No specific requirements for a better understanding we advise you to get Ganache or metamask in order to interact freely with our Dapp.
  Clone repo => npm install => cd client => npm start

  This project uses Pinata to store data on IPFS, in order to run it correctly create a Pinata account add this variables to your environment:
  REACT_APP_PINATA_SECRET_API_KEY=
  REACT_APP_PINATA_API_KEY=
 
 ##### Project status
Still in development, project being created, We will deliver a full functional project in Q4 2021. Stay tunned !
To-Do list :
Front-end  => HomePage of Dapp, to be improved => Add some css/Styling.
Backend => Link smart contracts to front-end using web3.
Smart contract => We are currently focusing on the creation and deployment of our ERC1155 standard.
               => Creation of a Vault that allow use to receive eth and send it eth/Dai to our external providers/partners.

###### Sources 
Alyra, blockchain school.
@openzeppelin/contracts.
#Uniswap-v3-periphery.               

