# Avoiding common attacks.

   List of known and frequently used attacks.

 - Self destruct.
 - DelegateCall.
 - Re-Entrancy.
 - Overflow/underflow.
 - Accessing Private Data.
 - Source of randomness.
 - Denial-Of-Service.
 - Phising => tx.origin.
 - Front running.
 - Block TimeStamp manipulation by miners.
 - Signature Replay.

 ## Measures we took against possible vulnerabilities.

   1. We avoid Reentrancy by re-setting the current balance of the caller at the beggining of the function ✅

  ```
    function reimbursement(uint256 tokenId) external payable {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        ethBalance[msg.sender] -= tokenPrice[tokenId]; ✅
        _burn(tokenId); 

        (bool sent, ) = msg.sender.call{value: tokenPrice[tokenId]}("");
        require(sent, "Failed to withdraw");

        emit reimbursed(msg.sender, tokenPrice[tokenId]);
    }
  ```

   2. By using the library Counters given by OZ we sort of counter the problem of OverFlow and underFlow. ✅
      We do not expect other problem with overFlow or underFlow in our smart contract.

```
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenERC721 is ERC721URIStorage {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  Counters.Counter private _offerIds;

   ....
   
  function setPrice(uint256 price) public returns (uint256) {
    _offerIds.increment();
    uint256 newOfferId = _offerIds.current();
    prices[newOfferId] = price;

    return newOfferId;
  } 
  ```


 ## Unecessary measures for this project.

   1. Self-destruct 🟩
   2. DelegateCall 🟥
   3. Accessing private data 🟥
   4. Phising => tx.origin 🟥
   5. Front running 🟥
   6. Block TimeStamp manipulation by miners 🟥
   7. Signature Replay 🟥
   8. Denial-of-service 🟩

   ### Legend

   ✅ => Has been worked on
   🟩 => To be studied if launched on mainnet.
   🟥 => Not to be worried about in our this project.
   
 

 