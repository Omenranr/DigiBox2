const { BN, ether, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect, assert } = require('chai');
const ERC721 = artifacts.require('TokenERC721');

contract('ERC721', (accounts) => {
  const testPrice = new BN(10);
  let owner = accounts[0];
  let sender = accounts[1];
  let receiver = accounts[2];

  beforeEach(async() => {
    erc721Instance = await ERC721.new();
  })

  it("Should deploy our smart contract", async () => {
     assert(erc721Instance.address !== "");
  });

  //function setPrice

  it("Testing setPrice", async function() {
    const oldId = await erc721Instance.getOfferId()
    expectEvent(await erc721Instance.setPrice(1), 'priceIsSet')
    const newId = await erc721Instance.getOfferId()
    // Testing that the id increments
    expect(newId.toNumber() - oldId.toNumber()).to.equal(1);
  });

  //function awardItem 
  it("Should verify that _tokenIds increments", async function() {
    const oldId = await erc721Instance.getTokenId()
    expectEvent(await erc721Instance.awardItem(0, "efe", "ezfze"), 'mintedNFT')
    const newId = await erc721Instance.getTokenId()
    // Testing that the id increments
    expect(newId.toNumber() - oldId.toNumber()).to.equal(1);
  });

  //function awardItem 
  it("Should verify that _tokenIds increments", async function() {
    const oldId = await erc721Instance.getTokenId()
    const receipt = await erc721Instance.awardItem(1, "efe", "ezfze")
    // expectEvent(, 'mintedNFT')
    const newId = await erc721Instance.getTokenId()

    // Balance greater than 0 if amount inputed in metamask
    const balance = await erc721Instance.getEthBalance("0xa5A5eb5d2F75aC8956530051CDC7D2fc630d2C02")
    assert(balance.toNumber() !== 0, "Balance should be different from 0")
    // Testing that the id increments
    expect(newId.toNumber() - oldId.toNumber()).to.equal(1);
  });


  //function transferFrom
  it("Should verify that transferFrom msg.sender to receiver", async function() {
       let balanceofSenderBefore = 1;
       let balanceOfReceiverBefore = 0;
       const updatedBalance = await erc721Instance.transferFrom(sender, receiver, tokenId);
       let balanceofSenderAfter = balanceofSenderBefore.sub(1);
       let balanceOfReceiverAfter = balanceOfReceiverBefore.add(1);
       expect(balanceofSenderAfter == 0 && balanceOfReceiverAfter == 1);
       expectEvent(await erc721Instance.transferFrom(sender, receiver, tokenId), 'transferedNFT')
  });

  //function reimbursement

  it("Should verify that caller is reimbursed", async function() {
       let oldBalanceEth = await erc721Instance.getEthBalance(sender);
       const upDatedBal = await erc721Instance.reimbursement(prices[tokenId]);
       expect(oldBalanceEth.add(prices[tokenId]) == upDatedBal);
       expectEvent(await this.erc721Instance.reimbursed(sender, receiver), "reimbursed");
  });

});

/*
it("Should make sure price is set correctly", async () => {
  expect(await this.erc721Instance.setPrice()).to.be.bignumber.equal(testPrice);
});
it("Caller should receive 1 NFT", async () => {
  await this.erc721Instance.awardItem(1, "ohuaz23uh", "metadata");
});
contract('ERC721', accounts => {
  const owner = accounts[0];
  const sender = accounts[1];
  const receiver = [2];
  let testPrice = new BN(10);
  beforeEach(async function () {
    this.erc721Instance = await ERC721.new({from: owner});
  });
  it('Should check price is set correctly', async function() {
    expect(await this.erc721Instance.setPrice(BN(10)).to.equal(testPrice));
  })
   it('Should check ethBalance after transfer', async function() {
      let tokenId = 1;
      let balanceSenderBefore = await this.erc721Instance.balanceOf(owner);
      let balanceOfReceiverBefore = await this.erc721Instance.balanceOf(receiver);
       await this.erc721Instance.transferFrom(owner, receiver, tokenId)
       let balanceSenderAfter = await this.erc721Instance.balanceOf(balanceSenderBefore.sub(price));
       let balanceReceiverAfter = await this.erc721Instance.balanceOf(balanceOfReceiverBefore.add(price));
       expect(balanceReceiverAfter).to.be.bignumber.equal(balanceOfReceiverBefore.add(price));
       expect(balanceSenderAfter).to.be.bignumber.equal(balanceSenderBefore.sub(price));
   })
    it('Should mint one NFT', async function() {
      let balanceOfUserBefore = 0;
      let balanceOfUserAfter = await this.erc721Instance.awardItem(1, "ohuaz23uh", "metadata");
      expect(balanceOfUserBefore + balanceOfUserAfter == balanceOfUserAfter);
      //const received = await this.erc721.awardItem.call(0, "ohuaz23uh", "metadata");
      //expect()
    })
    it('Should setPrice of NFT', async function() {
      let testPrice = new BN(1);
      expect(await this.erc721Instance.setPrice(new BN(1))).to.be.bignumber.equal(testPrice);
      expectEvent(await this.erc721Instance.priceIsSet(testPrice, {from: owner}))
    })
    it('Checks that price is equal to the price set by the seller', async function() {
      expect(await this.erc721Instance.setPrice(1)).to.be.bignumber.equal(testPrice);
    });
    it('should revert if unsufficient funds are sent', async function() {
      expectRevert()
    }) 
})
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