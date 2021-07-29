// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenERC721 is ERC721URIStorage {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _offerIds;

  mapping(uint256 => uint256) prices;
  mapping(string => uint8) hashes;
  mapping(address => uint256) public ethBalance; 
  mapping(uint256 => uint256) public tokenPrice;
  
  constructor() ERC721("DigiboxToken", "DGBT") {}

  receive() external payable {}

  function setPrice(uint256 price) public returns (uint256) {
    _offerIds.increment();
    uint256 newOfferId = _offerIds.current();
    prices[newOfferId] = price;

    return newOfferId;
  }

  function awardItem(uint256 price, string memory hash, string memory metadata) public payable returns (uint256)
  {
    require(msg.value >= price, "Send the minimum amount required");  
    require(hashes[hash] != 1);
    hashes[hash] = 1;

    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
  
    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, metadata);
    
    
    ethBalance[msg.sender] += msg.value;
    tokenPrice[newItemId] = price;
    
    return newItemId;
  }
  
      function transferFrom(address from, address to, uint256 tokenId ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _transfer(from, to, tokenId);
        
        ethBalance[from] -= tokenPrice[tokenId];
        ethBalance[to] += tokenPrice[tokenId];
    }
     
  ///Voir pour implémenter nonReentrant ici
  function reimbursment(address from, uint256 tokenId) external{
       require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        ethBalance[from] -= tokenPrice[tokenId];
        _burn(tokenId);
        
        (bool success, ) = msg.sender.call{value: tokenPrice[tokenId]}("");
        require(success, "Failed to send Ether");
  }
}

