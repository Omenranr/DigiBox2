import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import MarketPlaceContract from "../../contracts/MarketPlace.json";
import "./Profil.css";
//import getWeb3 from "../../getWeb3";
//import { Button } from 'bootstrap';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


export default function Profil() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [account, setAccount] = useState(null)
    let [web3, setWeb3] = useState(null)
    const [contract, setContract] = useState(null)
  
    useEffect(() => {
      checkAccount()
    }, [])

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

    // const contractABI = require("../../../contracts/MarketPlace.json")
    // const contract = new web3.eth.Contract(
    //   contractABI,
    //   '0xCd998a6949875C756DF54BDdE0A80Ac41F3B02d3'
    // );

    setContract(contract)
    console.log('MarketPlace.js -> web3 loaded')
  }

  async function withdrawAll() {
      console.log(account);
      let amount = 1;

      let gasValue = web3.utils.toHex(web3.utils.toWei('10', 'gwei'));
      let totalAmount = web3.utils.toBN(amount);
      var weiValue = web3.utils.toWei(totalAmount,'ether');
      console.log(account, gasValue, weiValue);

      await contract.methods.withdrawFunds().send({from: account, gas: gasValue, value: weiValue}, function(err, res) {})
  }
    

    return (
        <div className={classes.root}>
           <NavBar /> 
            <h1 className='titleProfil'> Profil. </h1> <hr></hr>
             <div className={classes.root}>
                 <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-contents"
                    id="panel1bh-header"
                    >
                        <Typography className={classes.heading}> Your transactions. </Typography>
                        <Typography className={classes.secondaryHeading}> See transactions.</Typography>
                    </AccordionSummary>
                    <ol>
                        <li>Input the transactions here</li>
                        <li>Input the transactions here</li>
                    </ol>
                 </Accordion>
                 <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-contents"
                    id="panel2bh-header"
                    >
                        <Typography className={classes.heading}> See your NFT. </Typography>
                        <Typography className={classes.secondaryHeading}> See NFT.</Typography>
                    </AccordionSummary>
                    <ol>
                        <li>Input the NFT here</li>
                        <li>Input the NFT here</li>
                    </ol>
                 </Accordion>
                 <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-contents"
                    id="panel3bh-header"
                    >
                        <Typography className={classes.heading}> Your comments. </Typography>
                        <Typography className={classes.secondaryHeading}> See comments you've made.</Typography>
                    </AccordionSummary>
                    <ol>
                        <li>Input the comments received here</li>
                        <li>Input the comments received here</li>
                    </ol>
                 </Accordion>
                 <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-contents"
                    id="panel4bh-header"
                    >
                        <Typography className={classes.heading}> Received comments. </Typography>
                        <Typography className={classes.secondaryHeading}> See received comments.</Typography>
                    </AccordionSummary>
                    <ol>
                        <li>Input the comments gave here</li>
                        <li>Input the comments gave here</li>
                    </ol>
                 </Accordion>
                 <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-contents"
                    id="panel4bh-header"
                    >
                        <Typography className={classes.heading}> Your funds. </Typography>
                        <Typography className={classes.secondaryHeading}> Withdraw available funds.</Typography>
                    </AccordionSummary>
                    <p>Display available funds : HERE</p>
                    <button className="btn-with" onClick={() => {(withdrawAll())}}>Withdraw funds</ button><br></br>
                 </Accordion><br></br>
             </div><br></br>
           <NavBarDetail /> 
        </div>
    )
  }
  
  
  ///onClick={() => {()}}
