// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@uniswap/v3-periphery/contracts/interfaces/IPeripheryPayments.sol";
import "../node_modules/@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "../node_modules/@uniswap/v3-periphery/contracts/interfaces/IQuoter.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}

contract TokenERC1155  is ERC1155 {

  constructor() ERC1155("https://gateway.pinata.cloud/ipfs/{id}") {
  }

  function mintNft(uint256 id) public{
    require(balanceOf(msg.sender, id) == 0, "This id is already in use");
    _mint(msg.sender, id, 1, "0x000");
  }
}

contract Vault is Ownable {
    
    using SafeMath for uint;
    
    IPeripheryPayments Iuniswap;
    
    uint256 public storedEth;
    uint256 public storedUsdt;
    uint256 public amountMinimum;
    address public token;

  ///IUniswapRouter public constant uniswapRouter = IUniswapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
  ///IQuoter public constant quoter = IQuoter(0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6);
  ///address private constant multiDaiKovan = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;
  ///address private constant WETH9 = 0xd0A1E359811322d97991E03f863a0C30C2cF029C;
    
    event EthReceived(address From, uint256 Amount);
    event UsdtReceived(address From, uint256 Amount);
    event UsdtSentTo(address recipient, uint256 Amount);
    event ChangedMinAmount(uint256 MinAmountToConvert);
    event ConvertedEthToUsdt(uint256 Amount);
    event ChangedAddressToken(address TokenAddress);
    
    ///@dev toManage if ethPrice fluctuates;
    function setMinAmount(uint256 _minAmount) external onlyOwner() {
        amountMinimum = _minAmount;
        emit ChangedMinAmount(_minAmount);
    }
    
    ///@dev set the token address(stablecoin) to convert to;
    function setStableToConvert(address _tokenAddress) external onlyOwner() {
        token = _tokenAddress;
        emit ChangedAddressToken(_tokenAddress);
    }
    
    ///@notice We implement a function that converts eth => usdt;
    function convertEthToDai() external payable {
        require(storedEth >= amountMinimum, "Not worth because of gas fee, we need more eth before transfer");
        Iuniswap.sweepToken(token, amountMinimum, address(this));
        //Iuniswap.pay();
        
        emit ConvertedEthToUsdt(msg.value);
    } 
    
    ///@dev helper to keep track of balances
    function getBalanceOfETH() public view returns(uint256) {
        return address(this).balance;
    }
    
    function getBalanceOfUSDT() public view returns(uint256) {
        return storedUsdt;
    }
    
    //@notice allow to receive eth
    receive() external payable{
        
    }

    /// Voir si on peux importer directement le smart contract PeripheryPayments directement et faire appel "./Periphery"

    /* contract Test {
    function refundETH() external payable;
        
        function pay(
            address token,
            address payer,
            address recipient,
            uint256 value
        ) internal;
    } */

    ///interface IUniswapRouter is ISwapRouter {
    ///    function refundETH() external payable;
    ///}

}
