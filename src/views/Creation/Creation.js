import React, { useState, useEffect } from 'react';
import "./Creation.css";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import Container from '@material-ui/core/Container';
import logo from "../../Images/TransparentLogo.png";
import Button from '@material-ui/core/Button';
import Axios from 'axios';

function Creation() {

    const [Provider, setProvider] = useState("");
    const [Title, setTitle] = useState("");
    const [Price, setPrice] = useState("");
    const [Description, setDescription] = useState("");
    const [Ether, setEther] = useState("");

    const addOffer = () => {
        Axios.post('http://localhost:3001/offers/create', {
            Provider: Provider,
            Title: Title,
            Price: Price,
            Description: Description
        }).then(response => {
            console.log(response, "success");
        })
        .catch(error => {
            console.log(error)
        })
    }

   useEffect(() => {
        Axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
        .then(response => {
            setEther(response.data.ethereum.usd);
        }).catch(error => console.log(error))
    }, [Ether]); 

    return (
        <div className="creation-offer">
          <NavBar />  
           <h1 className="title-offer">Création d'une offre</h1> <hr></hr>

                <Container className="Price-Eth" maxWidth="xs">
                            Ethereum current price. <br></br>
                            USD${Ether} <br></br>
                            Price of CoinGecko.
                </Container>

                 <img className="logo-crea" src={logo} alt="logo"/>
                
                  <Grid className="grid" container alignItems="center" justify="center" direction="column" >

                        <Grid item>
                            <TextField
                                id="provider-input"
                                provider="provider"
                                label="Nom du prestataire"
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
                                    label="Titre"
                                    type="text"
                                    onChange={(event) => {
                                        setTitle(event.target.value);
                                    }}
                                />
                            </Grid> <hr></hr>

                                <Grid item>
                                    <TextField
                                        id="price"
                                        name="price"
                                        label="Prix en Ether"
                                        type="text"
                                        onChange={(event) => {
                                            setPrice(event.target.value);
                                        }}
                                    />
                                </Grid> <hr></hr>

                                    <Grid item>
                                        <TextField
                                            id="description"
                                            name="description"
                                            label="Description de l'offre"
                                            type="text"
                                            onChange={(event) => {
                                                setDescription(event.target.value);
                                            }}
                                        />
                                    </Grid> <hr></hr>

                                        <Button onClick={addOffer} variant="contained">Soumettre offre NFT</Button>

                                        <tr></tr>

             {/* <Button onClick={showPrestataire} variant="contained">Afficher Prestataire</Button> */}



             {/* <Grid item>
                 <FormControl>
                     <FormLabel>Secteur</FormLabel>
                     <RadioGroup
                     name="Hotellerie"
                     >
                     <FormControlLabel
                         key="Hotellerie"
                         value="0"
                         control={<Radio size="small" />}
                         label="Hotellerie"
                     />
                     <FormControlLabel
                         key="Aventure"
                         value="1"
                         control={<Radio size="small" />}
                         label="Aventure"
                     />
                     <FormControlLabel
                         key="Gastronomie"
                         value="2"
                         control={<Radio size="small" />}
                         label="Gastronomie"
                     />
                     <FormControlLabel
                         key="Autres"
                         value="3"
                         control={<Radio size="small" />}
                         label="Autres"
                     />
                     </RadioGroup>
                 </FormControl>
                 </Grid> <br></br> */}

          </Grid>
          
         <NavBarDetail /> 
               
        </div>
    )

}

export default Creation;
