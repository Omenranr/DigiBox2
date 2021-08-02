# Explanation of tests.

## ERC721 Contract 

  In this contract we had in total 4 functions to test. 

Our first test was the test of setPrice.
   ```
   
   ```
We make sure that the price that our seller inserts is the correct output

We then did a check on the function awardItem
  ```

  ```

We need to make sure that msg.sender receives his NFT once paid for.

The function transferFrom was the next on the list.

  ```

  ```

Just making sure the recipient receives the NFT with correct Id

And finally, the reimbursement function

  ```

  ```

Crucial function to make sure you can be reimbursed or that seller can be paid.  


During the tests we also checked that all events were emitted properly.


## Vault Contract