import React, { useState } from 'react';
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import NFT from "../../Components/NFT/NFT";
import Particles from 'react-particles-js';
import Switch from '@material-ui/core/Switch';
import "./HomePage.css";
import LogoDigibox from '../../Images/LogoDigiBox.png';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [showParticles, setShowParticles] = useState(false);

    const handleChange = (event) => {
        setShowParticles(!showParticles);
    };

    return (
        <div className="App">
            <NavBar />
            <Switch checked={showParticles.checkedB} onChange={handleChange} color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
            {showParticles == true &&
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
            }

            <div className="fst-section">
                <div className="grid-column">
                    <h2>Découvrez, Offrez, et Déposez<br/>vos offres sous forme de<br/>NFT</h2>
                    <h3>La première plateforme<br/>de cadeaux en NFTs</h3>
                    <div className="button-container">
                        <Button variant="contained">
                            <Link to={"#snd-section"}>Découvrir</Link>
                        </Button>
                        <Button variant="outlined">
                            <Link to={"/Creation de l'offre"}>Créer</Link>
                        </Button>
                    </div>
                </div>
                <div className="grid-column">
                    <img src={LogoDigibox} alt="logo"/>
                </div>
            </div>
            <div id="#snd-section" className="snd-section">
                <h2>Les dernières offres</h2>
                <NFT />
            </div>
            {/* <div className="thrd-section">
                <h2>Notre Équipe</h2>
            </div>
            <div className="frth-section">
                <h2>Roadmap</h2>
            </div> */}

            <NavBarDetail />
        </div>
    )
}
