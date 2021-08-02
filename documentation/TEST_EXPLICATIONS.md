# Explanation of tests.

## ERC721 Contract 

  ### In this contract we had in total 4 functions to test. 

  #### Function setPrice 
     1. Revert if price != 0; Make sure every token has a minimum value;
     2. Set newOfferId to equal the currentId;
     3. Checks if event is incremented;

   ```
   
   ```

Basicly, we make sure the price inputted by the seller is the correct output.

  #### Function awardItem
    1. Reverts if the value is smaller then the price of the NFT
    2. No need to check if _mint and _setTokenURI, indeed we check that at the end of the test. If the test went through we will see it displayed in our event.
    3. Check if the ETH balance is updated correctly 
    4. Checks if event was correctly emitted

  ```

  ```

In a few words, we need to make sure that msg.sender receives his NFT once paid for.

  #### Function transferFrom 
    1. Reverts if the caller is not the owner
    2. We then check if the OZ _transfer event happens, 
    3. Check if the balance of the sellers and buyers is correctly updated
    4. Make sure event is submitted correctly

  ```

  ```

  Basicly, we make sure the transfer happened properly

#### Function reimbursement
    1. Check that the require is efficient
    2. Check that the ethBalance of the caller is deduced of it's balance 
    3. Check that the token is properly burnt
    4. Check that the caller has received the eth they are due
 
  ```

  ```

Crucial function to make sure you can be reimbursed or that seller can be paid.  


## Vault Contract