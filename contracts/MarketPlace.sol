// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MarketPlace is Ownable {
     
    uint256 productPrice;

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

         Payment memory _payment = Payment(productPrice, productId);
         payments[msg.sender].push(_payment);

         emit productBought(msg.sender, msg.value, productId); 
    }

    function getBalanceOfEth() public view returns(uint256) {
      return address(this).balance;
    }

}
