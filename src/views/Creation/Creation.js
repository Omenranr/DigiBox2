import React, { useState, useEffect, useRef } from 'react';
import "./Creation.css";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import Container from '@material-ui/core/Container';
import logo from "../../Images/TransparentLogo.png";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import erc721Json from "../../contracts/TokenERC721.json";
import Web3 from 'web3'
import { AlertBanner } from "../../Components/AlertBanners/SnackBarAlert";
import InfoIcon from '@material-ui/icons/Info';
import { classNames } from '@react-pdf-viewer/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Particles from 'react-particles-js';

function Creation() {

    const [Provider, setProvider] = useState("");
    const [Title, setTitle] = useState("");
    const [Price, setPrice] = useState("");
    const [Description, setDescription] = useState("");
    const [Ether, setEther] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const fileInput = useRef();

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
        console.log(deployedNetwork)
        const erc721 = new web3.eth.Contract(
          erc721Json.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setErc721Contract(erc721);
    }
    
    const config = {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data'
        }
    }

    // event:
    // erc721Contract.events.priceIsSet().on('data', (event) => addOffer(event)).on('error', console.error);
    const setPriceContract = async () => {
        return new Promise((resolve, reject) => {
            const weiPrice = Web3.utils.toWei(Price, 'ether');

            erc721Contract.methods.setPrice(weiPrice).send({from: account})
              .then(response => {
                resolve(response);
              })
              .catch(error => {
                reject(error);
              })
          })
    }

    const addOffer = async () => {
        const smartContractRes = await setPriceContract();
        const smartContractOfferId = smartContractRes.events.priceIsSet.returnValues.offerId;
        const weiPrice = Web3.utils.toWei(Price, 'ether');

        let formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("Provider", Provider);
        formData.append("Title", Title);
        formData.append("Price", weiPrice);
        formData.append("Description", Description);
        formData.append("smartContractOfferId", smartContractOfferId);

        axios.post(process.env.REACT_APP_API_URL + '/offers/create', formData, config)
        .then(response => {
            console.log(response, "success");
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
        .then(response => {
            setEther(response.data.ethereum.usd);
        }).catch(error => console.log(error))
    }, [Ether]);

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file.size / 1000 > 1024)
            alert("File size cannot exceed more than 1MB" );
        else
            setSelectedFile(file);
    }

    return (
        <div className={classNames.root}>
            <NavBar />  
            <Particles
                params={{
                    particles: {
                        retina_detect: true,
                        move: { enable:true,speed:1,direction:"none",random:false,straight:false,out_mode:"out",bounce:false,attract: { enable:false,rotateX:600,rotateY:1200 }},
                        number: { value: 80 },
                        density: { enable: true, value_area: 800 },
                        color: { value: "#4448bd" },
                        shape: { type: "circle", stroke: { width:0, color:"#000000" }, polygon:{ nb_sides:5 }},
                        line_linked: { color: "#4448bd", distance: 150, enable: true, opacity: 0.4, width: 1 },
                        opacity: { value:0.5, random:false, anim:{ enable:false,speed:1,opacity_min:0.1,sync:false }},
                        size: { value:3,random:true,anim: { enable:false,speed:40,size_min:0.1,sync:false }}
                    }
                }}
            />
            <h1 className="title-offer">Création d'une offre</h1> <hr></hr> <br></br>

            <h1 className="titre"> Vous souhaitez proposer une offre ?</h1>

                <img className="logo-crea" src={logo} alt="logo"/>
                
                <Grid className="grid" container alignItems="center" justify="center" direction="column" >

                    <div className="file-uploader">
                        <input className="inputFichier" ref={fileInput} type="file" onChange={handleFileInput}  />
                        <Button onClick={e => fileInput.current && fileInput.current.click()} variant="contained" color="primary">Upload File</Button>
                    </div>

                    <Grid item>
                        <TextField
                            id="provider-input"
                            provider="provider"
                            label="Nom du prestataire"
                            style={{ margin: 8}}
                            type="text"
                            onChange={(event) => {
                                setProvider(event.target.value);
                            }}
                        />
                    </Grid> <hr></hr>

                    <Grid item>
                        <TextField
                            id="title-input"
                            name="title"
                            label="Titre de l'offre"
                            style={{ margin: 8}}
                            fullWidth
                            type="text"
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                        />
                    </Grid> <hr></hr>

                    <Grid item>
                        <TextareaAutosize
                            id="description"
                            name="description"
                            label="Description de l'offre"
                            placeholder="Description"
                            style={{ margin: 8}}
                            minRows={5}
                            type="text"
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                        /> <br></br>
                    </Grid> <hr></hr>

                    <Grid item>
                        <TextField
                            id="price"
                            name="price"
                            label="Prix en Ether"
                            style={{ margin: 8}}
                            type="text"
                            onChange={(event) => {
                                setPrice(event.target.value);
                            }}
                        />
                    </Grid> <hr></hr><br></br>

                       <Container 
                            className="Price-" maxWidth="xs">
                            <InfoIcon />
                            1 ETH =  
                            USD${Ether} 
                            - mis à jour par CoinGecko
                        </Container> <br></br>
                    <Button  onClick={addOffer} variant="contained" color="primary" >Soumettre mon offre</Button>
                </Grid>
        <NavBarDetail /> 
        </div>
    )
}
export default Creation;