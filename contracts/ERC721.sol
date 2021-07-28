// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenERC721 is ERC721URIStorage {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping(string => uint8) hashes;
  mapping(address => uint256) public ethBalance; 
  mapping(uint256 => uint256) public tokenPrice;
  
  constructor() ERC721("TokenERC721", "TKN") {}

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

  receive() external payable {}

}
/*  

   ///@dev j'ai placé le contrat MarketPlace ici au cas ou :).
pragma abicoder v2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ERC721.sol";

 contract  MarketPlace is ReentrancyGuard {
    
    using SafeMath for uint;
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    
    address payable owner;
    uint256 listingPrice = 0.001 ether;
    
    constructor() {
        owner = payable(msg.sender);
    }
    
    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    
    mapping(uint256 => MarketItem) private idToMarketItem;
    
    event MarketItemCreated(
        uint256 itemId,
        address nftContract,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
        );
        
    function getListingPrice() public view returns(uint256) {
        return listingPrice;
    }
        
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
        ) public payable nonReentrant {
            require(price > 0, "Price must not be equal to zero");
            require(msg.value >= listingPrice, "Price must be more or equal to listingPrice");
            
            _itemIds.increment();
            uint256 itemId = _itemIds.current();
            
            idToMarketItem[itemId] = MarketItem(
                itemId,
                nftContract,
                tokenId,
                payable(msg.sender),
                payable(address(0)),
                price,
                false
                );
                
          IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
          
          emit MarketItemCreated(
              itemId,
              nftContract,
              tokenId,
              msg.sender,
              address(0),
              price,
              false
              );
        } 
        
        function createMarketSale(
            address nftContract,
            uint256 itemId
            ) public payable nonReentrant {
                
                uint256 price = idToMarketItem[itemId].price;
                uint256 tokenId = idToMarketItem[itemId].tokenId;
                
                require(msg.value >= price, "You haven't paid enough to make the purchase");
                //Ici trouver comment créée une variables qui remplacera le seller à accountSeller afin de ne pas lui envoyer directement.
                
                idToMarketItem[itemId].seller.transfer(msg.value);
                IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
                
                idToMarketItem[itemId].owner = payable(msg.sender);
                idToMarketItem[itemId].sold = true;
                _itemsSold.increment();
                payable(owner).transfer(listingPrice);
            }
            
            function fetchMarketItems() public view returns(MarketItem[] memory) {
                uint256 itemCount = _itemIds.current();
                ///@dev voir pour utiliser safeMath here
                uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
                uint256 currentIndex = 0;
                
                MarketItem[] memory items = new MarketItem[](unsoldItemCount);
                for(uint i = 0; i < itemCount; i++) {
                    if(idToMarketItem[i + 1].owner == address(0)) {
                        uint256 currentId = idToMarketItem[i + 1].itemId;
                        MarketItem storage currentItem = idToMarketItem[currentId];
                        items[currentIndex] = currentItem;
                        currentIndex = currentIndex.add(1);
                    }
                }
                return items;
            }
            
            function fetchMyNFTs() public view returns(MarketItem[] memory) {
                uint256 totalItemCount = _itemIds.current();
                uint256 itemCount = 0;
                uint256 currentIndex = 0;
                
                for(uint i = 0; i < totalItemCount; i++) {
                    if(idToMarketItem[i + 1].owner == msg.sender) {
                        itemCount = itemCount.add(1);
                    }
                }
                
                MarketItem[] memory items = new MarketItem[](itemCount);
                for(uint i = 0; i < totalItemCount; i++) {
                    if(idToMarketItem[i + 1].owner == msg.sender) {
                        uint256 currentId = i + 1;
                        MarketItem storage currentItem = idToMarketItem[currentId];
                        items[currentIndex] = currentItem;
                        currentIndex = currentIndex.add(1);
                      }
                    }    
                return items;
            }
            
            function fetchNFTCreated() public view returns(MarketItem[] memory) {
                uint256 totalItemCount = _itemIds.current();
                uint256 itemCount = 0;
                uint256 currentIndex = 0;
                
                for(uint256 i = 0; i < totalItemCount; i++) {
                    if(idToMarketItem[i + 1].seller == msg.sender) {
                        itemCount = itemCount.add(1);
                    }
                }
                MarketItem[] memory items = new MarketItem[](itemCount);
                for(uint256 i = 0; i < totalItemCount; i++) {
                    if(idToMarketItem[i + 1].seller == msg.sender) {
                        uint256 currentId = i + 1;
                        MarketItem storage currentItem = idToMarketItem[currentId];
                        items[currentIndex] = currentItem;
                        currentIndex = currentIndex.add(1);
                    }
                }
                return items;
            }
       
 }        


contract MarketPlace is Ownable {

  using SafeMath for uint;
     
    uint256 productPrice;
    address recipient;

    //constructor() ERC20("", "") {}

    struct Payment {
        uint256 price;
        uint256 productId;
    }

    struct Presta {
      bool isPresta;
      bool isAllowedToWithdraw;
      uint256 amountToWithdraw;
      
    }

    struct ownerNFT {
        bool isOwner;
        uint256 id;
        address ownerOfNFT;
    }

    ownerNFT[] owner;

    mapping(address => Payment[]) public payments;
    mapping(address => Presta) public prestataire;

    event productBought(address From, uint256 Amount, uint256 productId);
    event priceChange(address From, uint256 Price);
    event hasDeposited(address from, uint amountDeposited);
    event isAllowedToPull(address isAllowed);
    event hasWithdrawn(address from, uint amountWithdrawn);

  

    function buyProduct(uint256 productId) public payable {
        require(msg.value >= productPrice, "You didn't send the correct amount");
        require(recipient != address(0), "ERC1155: transfer to 0 address");

         Payment memory _payment = Payment(productPrice, productId);
         payments[msg.sender].push(_payment);

         //productPrice = productPrice.add(msg.value);

         emit productBought(msg.sender, msg.value, productId); 
    }

    function createOffer() external {
         //require(prestataire[msg.sender].isPresta == true);
         owner.push(ownerNFT(true, owner.length, msg.sender));
    }

    function allowPresta(address _address) external onlyOwner() {
        prestataire[_address].isPresta = true;
        prestataire[_address].isAllowedToWithdraw = true;
        emit isAllowedToPull(_address);
    }

    function withdrawFunds() public payable {
      //uint256 amountToClaim = prestataire[msg.sender].amountToWithdraw;
       
      //require(prestataire[msg.sender].isAllowedToWithdraw == true);

      //prestataire[msg.sender].amountToWithdraw = 0;
        
      (bool success, ) = msg.sender.call{value: balanceOf[msg.sender]}("");
      require(success, "Failed to send to Presta");
      
      balanceOf[msg.sender] = 0; 
    }

    function getBalanceOfEth() public view returns(uint256) {
      return address(this).balance;
    }

    receive() external payable{
      
    }
}

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
