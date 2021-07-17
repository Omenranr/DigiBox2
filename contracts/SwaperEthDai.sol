  // SPDX-License-Identifier: MIT
  ///@Notice this swap is not functional yet, working on it.
pragma solidity ^0.8.0;

import "../node_modules/@uniswap/v3-periphery/contracts/interfaces/IPeripheryPayments.sol";
import "../node_modules/@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "../node_modules/@uniswap/v3-periphery/contracts/interfaces/IQuoter.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/// Voir si on peux importer directement le smart contract PeripheryPayments directement et faire appel "./Periphery"

 interface IUniswapRouter is ISwapRouter {
    function refundETH() external payable;
 }

contract Vault is Ownable {
    
    using SafeMath for uint;
    
    IPeripheryPayments Iuniswap;
    
    uint256 public storedEth;
    uint256 public storedUsdt;
    uint256 public amountMinimum;
    address public token;

  IUniswapRouter public constant uniswapRouter = IUniswapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
  IQuoter public constant quoter = IQuoter(0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6);
  address private constant multiDaiKovan = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;
  address private constant WETH9 = 0xd0A1E359811322d97991E03f863a0C30C2cF029C;
    
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
        ///Iuniswap.pay();
        
        emit ConvertedEthToUsdt(msg.value);
    } 
    
    ///@dev helper to keep track of balances
    function getBalanceOfETH() public view returns(uint256) {
        return address(this).balance;
    }
    
    function getBalanceOfUSDT() public view returns(uint256) {
        return storedUsdt;
    }
  
  ///Tried this for test only not sure how this works on Kovan, need to test but not enough Keth to test ...
    function convertExactEthToDai() external payable {
    require(msg.value > 0, "Must pass non 0 ETH amount");

    uint256 deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!
    address tokenIn = WETH9;
    address tokenOut = multiDaiKovan;
    uint24 fee = 3000;
    address recipient = msg.sender;
    uint256 amountIn = msg.value;
    uint256 amountOutMinimum = 1;
    uint160 sqrtPriceLimitX96 = 0;
    
    ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams(
        tokenIn,
        tokenOut,
        fee,
        recipient,
        deadline,
        amountIn,
        amountOutMinimum,
        sqrtPriceLimitX96
    );
    
    uniswapRouter.exactInputSingle{ value: msg.value }(params);
    uniswapRouter.refundETH();
    
    // refund leftover ETH to user
    (bool success,) = msg.sender.call{ value: address(this).balance }("");
    require(success, "refund failed");
  }
  
  function convertEthToExactDai(uint256 daiAmount) external payable {
    require(daiAmount > 0, "Must pass non 0 DAI amount");
    require(msg.value > 0, "Must pass non 0 ETH amount");
      
    uint256 deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!
    address tokenIn = WETH9;
    address tokenOut = multiDaiKovan;
    uint24 fee = 3000;
    address recipient = msg.sender;
    uint256 amountOut = daiAmount;
    uint256 amountInMaximum = msg.value;
    uint160 sqrtPriceLimitX96 = 0;

    ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactOutputSingleParams(
        tokenIn,
        tokenOut,
        fee,
        recipient,
        deadline,
        amountOut,
        amountInMaximum,
        sqrtPriceLimitX96
    );

    uniswapRouter.exactOutputSingle{ value: msg.value }(params);
    uniswapRouter.refundETH();

    // refund leftover ETH to user
    (bool success,) = msg.sender.call{ value: address(this).balance }("");
    require(success, "refund failed");
  }
  
  // do not used on-chain, gas inefficient!
  function getEstimatedETHforDAI(uint daiAmount) external payable returns (uint256) {
    address tokenIn = WETH9;
    address tokenOut = multiDaiKovan;
    uint24 fee = 3000;
    uint160 sqrtPriceLimitX96 = 0;

    return quoter.quoteExactOutputSingle(
        tokenIn,
        tokenOut,
        fee,
        daiAmount,
        sqrtPriceLimitX96
    );
  } 

    //@notice allow to receive eth
    receive() external payable{}
}    
