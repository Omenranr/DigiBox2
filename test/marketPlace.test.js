const MarketPlace = artifacts.require('MarketPlace');
const { BN, expectRevert, constants, expectEvent } = require('@openzeppelin/test-helpers');

contract('MarketPlace', (accounts) => {
   
    const owner = accounts[0];
    const recipient = accounts[1];
    const prestataire = accounts[2];
    const initialPrice = new BN(1);

    beforeEach( async () => {
       this.marketInstance = await MarketPlace.new();
    })

    it('Should deploy MarketPlace properly', async () => {
        assert(this.marketInstance.address !== '');
      });

    it('Checks that sending to address 0 reverts', async () => {
        await expectRevert(this.marketInstance.transfer(constants.ZERO_ADDRESS, new BN(1), {from: owner}),
        "ERC1155: transfer to 0 address");
    });

    it('Should verify the price is correct', async () => {
       
    });

});