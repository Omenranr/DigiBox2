import React from 'react';
import "./NavBarDetail.css";
import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LogoFooter from '../../Images/LogoFooter.png';
import {Link} from "react-router-dom"

export default function NavBar() {

    return (
        <div className="footer">
            <div className="container">
                <div className="grid-column">
                    <img className="logofooter" src={LogoFooter} alt="logo"/>
                </div>
                <div className="grid-separator"></div>
                <div className="grid-column alist">
                    <h4>Liens utiles</h4>
                    <Link to={"/Retour%20sur%20votre%20experience"}>Avis clients</Link>
                    <Link to={"/Equipe"}>Carrière</Link>
                    <Link to={"/Service%20client"}>Nous contacter</Link>
                    <Link to={"/CGV"}>CGV</Link>
                </div>
                <div className="grid-separator"></div>
                <div className="grid-column social">
                    <h4>Suivez-nous</h4>
                    <a href="https://twitter.com/DigiBox10" target="_blank" raised >
                    {<TwitterIcon />}
                    </a>
                    <a href="https://github.com/alpsoft/DigiBox" target="_blank" raised>
                        {<GitHubIcon />}
                    </a>
                    <a href="https://t.me/DigiBoxOfficialGroup" target="_blank" raised>
                        {<TelegramIcon/>}
                    </a>
                    <a href="https://www.instagram.com/digibox.blockchain/" target="_blank" raised>
                        {<InstagramIcon />}
                    </a>
                </div>
            </div>
            <p className="copyright">© Digibox 2021 - Tous droits réservés.</p>
        </div>
    )

}