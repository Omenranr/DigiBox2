import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import erc721Json from "../../../contracts/TokenERC721.json";
import Web3 from 'web3'
// import axios from 'axios'

export default function ProfilCard(props) {
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  const classes = useStyles();

  const [account, setAccount] = useState(null)
  let [web3, setWeb3] = useState(null)
  const [erc721Contract, setErc721Contract] = useState(null)

  useEffect(() => {
    connectWeb3()
  }, [])
  
  async function connectWeb3() {
    let web3 = new Web3(window.ethereum)
    setWeb3(web3)
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = erc721Json.networks[networkId];
    const erc721 = new web3.eth.Contract(
      erc721Json.abi,
      deployedNetwork && deployedNetwork.address,
    );
    setErc721Contract(erc721);
  }

  // async function transfer() {
  //   var gasValue = web3.utils.toHex(web3.utils.toWei('21000', 'wei'));

  //     await erc721Contract.methods.transferFrom().send({from: account, })
  // }

  // async function refund() {
  //   var gasValue = web3.utils.toHex(web3.utils.toWei('21000', 'wei'));
  //   var amountToReimburse = web3.utils.toBN(tokenPrice);
  //   var weiValue = web3.utils.toWei(tokenPrice,'ether');

  //    await erc721Contract.methods.reimbursment().send({from: address(this), })
  // }

  return (
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={'https://gateway.pinata.cloud/ipfs/'+props.nft.imageIpfsHash}
                />
                <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Nft Id: {props.nft.nftId}
                </Typography>
                <a href={'https://gateway.pinata.cloud/ipfs/' + props.nft.metadataIpfsHash}>Metadata Link</a>
                <Typography variant="body2" color="textSecondary" component="p">
                    Price
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary"  >Transférer</Button>  
                <Button size="small" color="primary" >Remboursement</Button>
            </CardActions>
            </Card>  
  );
}
