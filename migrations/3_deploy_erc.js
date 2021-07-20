var TokenERC1155 = artifacts.require("TokenERC1155");

module.exports = function(deployer) {
  deployer.deploy(TokenERC1155);
};