// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract TokenERC1155  is ERC1155 {

  constructor() ERC1155("https://gateway.pinata.cloud/ipfs/{id}") {
  }

  function mintNft(uint256 id) public{
    require(balanceOf(msg.sender, id) == 0, "This id is already in use");
    _mint(msg.sender, id, 1, "0x000");
  }
}