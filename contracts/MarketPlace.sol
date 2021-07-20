// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarketPlace is Ownable, ERC20 {
     
    uint256 productPrice;
    address recipient;
    uint256 amountOfDai;
    uint256 minAmountDai;
    address swaperAddress;
    address VaultAddress;

    constructor() ERC20("", "") {}

    struct Payment {
        uint256 price;
        uint256 productId;
    }

    mapping(address => Payment[]) public payments;

    event productBought(address From, uint256 Amount, uint256 productId);
    event priceChange(address From, uint256 Price);

    function setPrice(uint256 _productPrice) public onlyOwner() {
         productPrice = _productPrice;
         emit priceChange(msg.sender, _productPrice);
    }

    function buyProduct(uint256 productId) public payable {
        require(msg.value >= productPrice, "You didn't send the correct amount");
        require(recipient != address(0), "ERC1155: transfer to 0 address");

         Payment memory _payment = Payment(productPrice, productId);
         payments[msg.sender].push(_payment);

         emit productBought(msg.sender, msg.value, productId); 
    }

    function getBalanceOfEth() public view returns(uint256) {
      return address(this).balance;
    }


  /*
    ///@notice we need to elaborate converter smart contract to deploy following
     function sendToSwaper() external onlyOwner() {
        require(address(this).balance >= 1 ether, "Not gas efficient to send now");
           (bool sent, ) = swaperAddress.call{value: address(this).balance}("");
           require(sent, "Failed to send Ether");
    }

    function setVaultAddress(address _vaultAdd) external onlyOwner() {
      VaultAddress = _vaultAdd;
    } 

    function sendDaiToVault() external onlyOwner(){
      require(amountOfDai >= minAmountDai, "Not gas efficient to send now");
        (bool sent, ) = VaultAddress.call{value: amountOfDai}("");
        require(sent, "Failed to send Dai");
    } */

}
