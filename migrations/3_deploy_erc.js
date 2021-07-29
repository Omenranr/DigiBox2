var TokenERC721 = artifacts.require("./ERC721.sol");

module.exports = function(deployer) {
  deployer.deploy(TokenERC721,"DigiboxToken","DGBT");
};
