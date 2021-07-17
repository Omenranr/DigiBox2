// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Vault is Ownable {

     uint256 balanceOfDai;
     address public daiToken;

     constructor(address _daiToken) {
         daiToken = _daiToken;
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