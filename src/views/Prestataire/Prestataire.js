import React, { useState, useEffect } from 'react';
import "./Prestataire.css";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import Container from '@material-ui/core/Container';
import logo from "../../Images/LogoDigiBox.png";
import Button from '@material-ui/core/Button';
import Axios from 'axios'
import { AlertBanners } from '../../Components/index';

export default function Prestataire() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    // following is new
    const [processingSign, setprocessingSign] = useState(false);
    const [notPresta, setNotPresta] = useState(false);
    const [signedIn, setSigned] = useState(false); 
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (name == '' || email == '' || website == '') {
            setNotPresta(true)
        } else {
            setprocessingSign(true);
        }
      })

 
    const addPrestataire = () => {
        Axios.post(process.env.REACT_APP_API_URL + '/users/create', {
            name: name,
            email: email,
            website: website
        }).then(response => {
            console.log(response, "success");
            setMessage(response.data);
            setSigned(true);
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getPrestataire = () => {
        Axios.get(process.env.REACT_APP_API_URL + '/users/', {})
        .then(response => {
            console.log(response, "success");
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="Prestataire-Prerequis">
            
          <NavBar />  
            <h1 className="title"> Devenir partenaire.</h1> <hr></hr>

             <h3 className="description"> Rejoignez l'équipe Digibox en quelques clicks !</h3>

             <img className="logoPresta" src={logo} alt="logo"/>

             <Container className="text" maxWidth="xs">
                 <p> Avant de nous rejoindre veuillez lire attentivement nos CGV, notre whitePaper etc etc ... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
             </Container>

             <Grid container alignItems="center" justify="center" direction="column">
             
                <Grid item>
                    <TextField
                        id="name-input"
                        name="name"
                        label="Name"
                        type="text"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </Grid> <hr></hr>

                <Grid item>
                    <TextField
                        id="email-input"
                        name="email"
                        label="Email"
                        type="text"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                </Grid> <hr></hr>

                <Grid item>
                    <TextField
                        id="website"
                        name="website"
                        label="Link your website"
                        type="text"
                        onChange={(event) => {
                            setWebsite(event.target.value);
                        }}
                    />
                </Grid> <hr></hr>

                <Button onClick={addPrestataire} variant="contained">Inscription Prestataire</Button>
                <Button onClick={getPrestataire} variant="contained">Show Prestataire</Button>

                <AlertBanners 
                  open={notPresta} 
                  setOpen={setNotPresta} 
                  severity="warning"
                  alertMessage="Ils nous manquent des informations, merci de remplir tous les champs !"
                  autoHideDuration={1100}
                />

               <AlertBanners 
                    open={processingSign} 
                    setOpen={setprocessingSign} 
                    severity="success"
                    alertMessage="Merci d'avoir renseigné toutes les infos nécessaires, veuillez valider"
                    autoHideDuration={1500}
               />

             </Grid>
             
            <NavBarDetail /> 
        </div>
    )
} 