/*const { ethers } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
//const { Contract } = require("ethers");
///const { it } = require("ethers/wordlists");
const ERC721 = artifacts.require("./ERC721");

describe("ERC721", function () {
    it("Should create and execute sales", async function () {
      const Market = await ethers.getContractFactory("ERC721")
      const market = await Market.deploy()
      await market.deployed()
      const marketAddress = market.address

      const NFT = await ethers.getContractFactory("NFT")
      const nft = await NFT.deploy(marketAddress)
      await nft.deployed()
      const nftContractAddress = nft.address

      let listingPrice = await market.getListingPrice()
      listingPrice = listingPrice.toString()

      const auctionPrice = ethers.utils.parseUnits("1", "ether")

      await nft.mintToken("https://www.mytokenlocation.com")
      await nft.mintToken("https://www.mytokenlocation2.com")

      await market.createMarketItem(nftContractAddress, 1, auctionPrice, {value: listingPrice})
      await market.createMarketItem(nftContractAddress, 2, auctionPrice, {value: listingPrice})

      const [_, buyerAddress] = await ethers.getSigners()
      
      await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

      const items = await market.fetchMarketItems()

      console.log("items", items)

    });
});  */