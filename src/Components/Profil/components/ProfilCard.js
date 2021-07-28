import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import marketPlaceJson from "../../../contracts/MarketPlace.json";
import erc721Json from "../../../contracts/TokenERC721.json";
import Web3 from 'web3'
import axios from 'axios'

export default function Equipe(props) {

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
  const [marketPlaceContract, setMarketPlaceContract] = useState(null)
  const [erc721Contract, setErc721Contract] = useState(null)

  useEffect(() => {
    connectWeb3()
  }, [])
  
  // invoke to connect to wallet account
  // async function activate() {
  //   if (window.ethereum) {
  //     try {
  //       // await window.ethereum.enable();
  //       await window.ethereum.request({ method: 'eth_requestAccounts' });
  //       connectWeb3()
  //     } catch (err) {
  //       console.log('user did not add account...', err)
  //     }
  //   }
  // }
  
  async function connectWeb3() {
    let web3 = new Web3(window.ethereum)
    setWeb3(web3)
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = marketPlaceJson.networks[networkId];
    const marketPlace = new web3.eth.Contract(
      marketPlaceJson.abi,
      deployedNetwork && deployedNetwork.address,
    );
    const erc721 = new web3.eth.Contract(
      erc721Json.abi,
      deployedNetwork && deployedNetwork.address,
    );

    setMarketPlaceContract(marketPlace)
    setErc721Contract(marketPlace)
  }

 /* async function makeDeposit(etherPrice) {
    var gasValue = web3.utils.toHex(web3.utils.toWei('21000', 'wei'));
    var etherAmount = web3.utils.toBN(etherPrice);
    var weiValue = web3.utils.toWei(etherAmount,'ether');

    await marketPlaceContract.methods.buyProduct(1).send({from: account, gas: gasValue, value: weiValue}, function(err, res){ })
  }

  async function transfert() {
    var gasValue = web3.utils.toHex(web3.utils.toWei('21000', 'wei'));

      await erc721Contract.methods.transferFrom().send({from: account, })
  }

  async function rembourser() {
    var gasValue = web3.utils.toHex(web3.utils.toWei('21000', 'wei'));
    var amountToReimburse = web3.utils.toBN(tokenPrice);
    var weiValue = web3.utils.toWei(tokenPrice,'ether');

     await erc721Contract.methods.reimbursment().send({from: address(this), })
  }*/

  async function createPinata() {
    // separate in other functions
    if (process.env.REACT_APP_PINATA_API_KEY === undefined) {
      console.log('Pinata keys are not set in your environment !');
    }
    if (account === undefined) {
      alert("Please connect your Metamask");
    }

    axios.post(process.env.REACT_APP_API_URL + '/pinata/create', {
      Owner: account,
      OfferId: props.offer.id
    })
    .then(response => {
        console.log(response, "success");
    })
    .catch(error => {
        console.log(error)
    })

    // call awardItem from erc 721 contract, with price and hash informations

    // Store NFT/Owner infos in db to display them afterwards in front
  }

  return (
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                //image={process.env.REACT_APP_API_URL + '/uploads/'+props.offer.filename}
                //title={props.offer.filename}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Provider
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    Title
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Price
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Description
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary"  >Transfert</Button>  
                <Button size="small" color="primary" >Etre payer et/ou remboursement</Button>
            </CardActions>
            </Card>  
  );
}
///onClick={() => { transfert() }}
///onClick={() => { rembourser() }}