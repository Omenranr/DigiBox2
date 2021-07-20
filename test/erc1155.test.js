const TokenERC1155 = artifacts.require('TokenERC1155');
const { expect } = require('chai');
//const { accounts, contract } = require('@openzeppelin/test-environment');

contract('TokenERC1155', (accounts) => {

  const owner = accounts[0];
  const receiver = accounts[1];

  beforeEach( async () => {
        this.ercInstance = await TokenERC1155.new();
  })

    it('Should deploy ERC1155 properly', async () => {
      assert(this.ercInstance.address !== '');
    });

    it('Should mint a nft', async () => {
        
    });

});