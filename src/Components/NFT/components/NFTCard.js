import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MarketPlaceContract from "../../../contracts/MarketPlace.json";
import Web3 from 'web3'

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
  const pinataSDK = require('@pinata/sdk');
  const pinata = pinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_SECRET_API_KEY);
  
  const [account, setAccount] = useState(null)
  let [web3, setWeb3] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    checkAccount()
  }, [])
  
  // invoke to connect to wallet account
  async function activate() {
    if (window.ethereum) {
      try {
        // await window.ethereum.enable();
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        checkAccount()
      } catch (err) {
        console.log('user did not add account...', err)
      }
    }
  }
  
  // invoke to check if account is already connected
  async function checkAccount() {
    let web3 = new Web3(window.ethereum)
    setWeb3(web3)
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = MarketPlaceContract.networks[networkId];
    const contract = new web3.eth.Contract(
      MarketPlaceContract.abi,
      deployedNetwork && deployedNetwork.address,
    );

    setContract(contract)
    console.log('NFT.js -> web3 loaded')
  }

  async function makeDeposit() {
    console.log(account);
    var etherPrice = 10;

    var gasValue = web3.utils.toHex(web3.utils.toWei('21000', 'wei'));
    var etherAmount = web3.utils.toBN(etherPrice);
    var weiValue = web3.utils.toWei(etherAmount,'ether');
    console.log(contract);
    console.log(account, gasValue, weiValue);

    await contract.methods.buyProduct(1).send({from: account, gas: gasValue, value: weiValue}, function(err, res){ })
  }

  function handleBuyButton(etherPrice){
    if (process.env.REACT_APP_PINATA_API_KEY === undefined) {
      console.log('Pinata keys are not set in your environment !');
    }

    // procéder au paiement avant la génération du NFT
    // makeDeposit();

    
    // authenticatePinata();
    // updatePinataJSON('QmUHeDovuppZGU3yMccWpcCZ3GbcfiYGmCTMSUUn7XsqLY');
    // newPinataJSON();

    // Mint NFT to the customer with pinata hash ID
    console.log('done');
  }

  async function updatePinataJSON(hashkey) {
    const metadata = {
      name: 'blabla',
      keyvalues: {
          newKey: 'blabla2',
          existingKey: 'blabla3',
          existingKeyToRemove: null
      }
    };
    pinata.hashMetadata(hashkey, metadata).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
  }

  async function newPinataJSON(customerData) {
    const body = {
      message: 'Pinatas are awesome'
    };
    const options = {
        pinataMetadata: {
            name: "thisisatestname",
            keyvalues: {
                customKey: 'customValue',
                customKey2: 'customValue2'
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    pinata.pinJSONToIPFS(body, options).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
  }

  async function authenticatePinata() {
    pinata.testAuthentication().then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={process.env.REACT_APP_API_URL + '/uploads/'+props.offer.filename}
          title={props.offer.filename}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.offer.provider}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {props.offer.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.offer.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.offer.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small" color="primary" onClick={() => { makeDeposit() }}>Acheter</Button>
        <Button size="small" color="primary">
          <a href="#">Lien</a>
        </Button>
      </CardActions>
    </Card>
  );
}