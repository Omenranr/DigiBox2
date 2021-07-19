import React, { useState, useEffect } from 'react';
import "./Creation.css";
import Connection from '../../Connection';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import Container from '@material-ui/core/Container';
import logo from "../../Images/TransparentLogo.png";
import Button from '@material-ui/core/Button';
import Axios from 'axios';

function Creation() {

    const [Name, setName] = useState("");
    const [Offer, setOffer] = useState("");
    const [Price, setPrice] = useState("");
    const [Description, setDescription] = useState("");
    const [Ether, setEther] = useState("");

    const addOffer = () => {
        Axios.post('http://localhost:3001/users/create', {
            Name: Name,
            Offer: Offer,
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
            console.log(response.data) 
        }).catch(error => console.log(error))
    }, [Ether]); 

    return (
        <div className="creation-offer">
           <h1 className="title-offer">Création d'une offre</h1> <hr></hr>
             <Connection className="btn-meta" />

                <Container className="Price-Eth" maxWidth="xs">
                            Ethereum current price. <br></br>
                            USD${Ether} <br></br>
                            Price of CoinGecko.
                </Container>

                 <img className="logo-crea" src={logo} alt="logo"/>
                
                  <Grid className="grid" container alignItems="center" justify="center" direction="column" >

                        <Grid item>
                            <TextField
                                id="name-input"
                                name="name"
                                label="Nom de la Box"
                                type="text"
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                        </Grid> <hr></hr>

                            <Grid item>
                                <TextField
                                    id="offer-input"
                                    name="offer"
                                    label="Offre"
                                    type="text"
                                    onChange={(event) => {
                                        setOffer(event.target.value);
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
