// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EscrowVault is Ownable {

     address agent;
     uint256 balanceOfDai;
     address public daiToken;

     constructor() {
         agent = msg.sender;
     }

     function sendToPresta(address _presta, uint256 _amountInDai) external onlyOwner() {
           ///require("QR Code has been scanned");
           
           (bool sent, ) = _presta.call{value: _amountInDai}("");
           require(sent, "Failed to send Dai");
     }

     function AmountOfDai() public view returns(uint256) {
         return balanceOfDai;
     }

     receive () external payable{}
    
}