import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import erc721Json from "../../../contracts/TokenERC721.json";
import Popover from '@material-ui/core/Popover';
import Web3 from 'web3'
import "./ProfilCard.css";
// import axios from 'axios'

export default function ProfilCard(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    typography: {
      padding: theme.spacing(2),
    },
    popoverButton: {
      display: 'block',
      margin: '0 auto',
      padding: '10px 20px'
    }
  }));
  const classes = useStyles();

  const [account, setAccount] = useState(null)
  const [transferAddress, setTransferAddress] = useState(null)
  const [web3, setWeb3] = useState(null)
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
        <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          Transfert
        </Button>
        <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{vertical: 'top', horizontal: 'center',}}
        >
          <TextField
              label="Addresse de transfert"
              type="text"
              onChange={(event) => { setTransferAddress(event.target.value); }}
          />
          <Button className={classes.popoverButton} size="small" color="primary">Transférer</Button>
        </Popover>
        <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          Remboursement
        </Button>
      </CardActions>
    </Card>
  );
}
