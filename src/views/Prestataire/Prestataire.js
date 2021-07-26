import React, { useState } from 'react';
import "./Prestataire.css";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import Container from '@material-ui/core/Container';
import logo from "../../Images/TransparentLogo.png";
import Button from '@material-ui/core/Button';
import Axios from 'axios'

export default function Prestataire() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");

    const [prestataireList, setPrestataireList] = useState([]);

    const addPrestataire = () => {
        Axios.post('http://localhost:3001/users/create', {
            name: name,
            email: email,
            website: website
        }).then(response => {
            console.log(response, "success");
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getPrestataire = () => {
        Axios.get('http://localhost:3001/users/', {})
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