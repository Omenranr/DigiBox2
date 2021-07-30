const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { it } = require('ethers/wordlists');
//const { contract } = require('ethers');
//const { it } = require('ethers/wordlists');
const ERC721 = artifacts.require('TokenERC721');

contract('ERC721', accounts => {
  const owner = accounts[0];
  const sender = accounts[1];
  const receiver = [2];
  const testPrice = new BN(10);

  beforeEach(async function () {
    this.erc721Instance = await ERC721.new({from: owner});
  });

    it('Checks that price is equal to the price set by the seller', async function() {
      expect(await this.erc721Instance.setPrice()).to.be.bignumber.equal(testPrice);
    });

    it('Should mint one NFT', async function() {
      const received = await this.erc721.awardItem.call(0, "ohuaz23uh", "metadata");
    })

    it('should revert if unsufficient funds are sent', async function() {
      
    })

})




/*
const { accounts, contract } = require('@openzeppelin/test-environment');
const { expect } = require('chai');
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

///const ERC721 = contract.fromArtifact('TokenERC721');
const ERC721 = artifacts.require('TokenERC721');

describe('ERC721', function () {
  const [sender, receiver] =  accounts;
  const testPrice = 100;

  beforeEach(async function () {
    // The bundled BN library is the same one web3 uses under the hood
    //this.value = new BN(1);
    this.erc721 = await ERC721.new();
  });

//   it('reverts when transferring tokens to the zero address', async function () {
//     // Conditions that trigger a require statement can be precisely tested
//     await expectRevert(
//       this.erc721.awardItem(100, "ohuaz23uh", "metadata"),
//       'ERC721: transfer to the zero address',
//     );
//   });

  it('Checks if the price is correct', async function () {
    expect(await this.erc721.setPrice(100)).to.equal(testPrice);
  })

  it('Should _mint 1 NFT', async function () {
    const receipt = await this.erc721.awardItem.call(0, "ohuaz23uh", "metadata");
    ///console.log(receipt)
    const receipt2 = await this.erc721.awardItem.call(0, "ohuaz232423uh", "metadata");
    ///console.log(receipt2)
    // // Event assertions can verify that the arguments are the expected ones
    // expectEvent(receipt, 'Transfer', {
    //   from: sender,
    //   to: receiver,
    //   value: this.value,
    // });
  });

  it('Should send 1 NFT from sender to receiver', async function () {
    this.erc721.transferFrom.call(sender, receiver, 1);
    // // Event assertions can verify that the arguments are the expected ones
    // expectEvent(receipt, 'Transfer', {
    //   from: sender,
    //   to: receiver,
    //   value: this.value,
    // });
  });

 /* it('emits a Transfer event on successful transfers', async function () {
    // const receipt = await this.erc721.awardItem(0, "ohuaz23uh", "metadata");
    // console.log(receipt)
    // // Event assertions can verify that the arguments are the expected ones
    // expectEvent(receipt, 'Transfer', {
    //   from: sender,
    //   to: receiver,
    //   value: this.value,
    // });
  });


  it('updates balances on successful transfers', async function () {
    this.erc721.reimbursment(sender, 1);

  });

  it('updates balances on successful transfers', async function () {
    console.log(await this.erc721.getListingPrice.call());
    console.log(await this.erc721.getListingPrice.call());
    console.log(await this.erc721.getListingPrice.call());
    console.log(await this.erc721.getListingPrice.call());
  }); 
}); 
*/