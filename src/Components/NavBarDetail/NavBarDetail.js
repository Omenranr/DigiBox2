import React from 'react';
import "./NavBarDetail.css";
import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function NavBar() {

    return (
        <div>
            <p className="copyright">All rights reserved: Digibox fundation</p>
            <a href="https://github.com/alpsoft/DigiBox" target="_blank" raised>
                {<GitHubIcon />}
            </a>
            <a href="https://t.me/DigiBoxOfficialGroup" target="_blank" raised>
                {<TelegramIcon/>}
            </a>
        </div>
    )

}