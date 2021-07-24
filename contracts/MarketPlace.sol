// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MarketPlace is Ownable {

  using SafeMath for uint;
     
    uint256 productPrice;
    address recipient;

    uint256 public totalBalance;

    //constructor() ERC20("", "") {}

    struct Payment {
        uint256 price;
        uint256 productId;
    }

    struct Presta {
      bool isAllowedToWithdraw;
      uint256 amountToWithdraw;
    }

    mapping(address => Payment[]) public payments;
    mapping(address => Presta) public prestataire;

    event productBought(address From, uint256 Amount, uint256 productId);
    event priceChange(address From, uint256 Price);
    event hasDeposited(address from, uint amountDeposited);
    event isAllowedToPull(address isAllowed);
    event hasWithdrawn(address from, uint amountWithdrawn);

    function deposit() external payable {
         totalBalance = totalBalance.add(msg.value);
    }

    function buyProduct(uint256 productId) public payable {
      /*  require(msg.value >= productPrice, "You didn't send the correct amount");
        require(recipient != address(0), "ERC1155: transfer to 0 address");

         Payment memory _payment = Payment(productPrice, productId);
         payments[msg.sender].push(_payment);

         //productPrice = productPrice.add(msg.value);

         emit productBought(msg.sender, msg.value, productId); */
    }

    function allowPresta(address _address) external onlyOwner() {
        prestataire[_address].isAllowedToWithdraw = true;
        emit isAllowedToPull(_address);
    }

    function withdrawFunds() public payable {
      //uint256 amountToClaim = prestataire[msg.sender].amountToWithdraw;
       
      //require(prestataire[msg.sender].isAllowedToWithdraw == true);

      //prestataire[msg.sender].amountToWithdraw = 0;

      (bool success, ) = msg.sender.call{value: totalBalance}("");
      require(success, "Failed to send to Presta");
      
      totalBalance = 0;
    }

    function getBalanceOfEth() public view returns(uint256) {
      return address(this).balance;
    }

    receive() external payable{
      
    }
}


  /*

   function setPrice(uint256 _productPrice) public onlyOwner() {
         productPrice = _productPrice;
         emit priceChange(msg.sender, _productPrice);
    }

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


