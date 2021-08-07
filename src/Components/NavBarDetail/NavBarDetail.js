import React from 'react';
import "./NavBarDetail.css";
import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function NavBar() {

    return (
        <div>
            <p className="copyright">All rights reserved: Digibox fundation</p>
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
    )

}