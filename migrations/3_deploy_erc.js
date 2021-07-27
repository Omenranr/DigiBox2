var ERC721Token = artifacts.require("./NFT.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC721Token);
};
