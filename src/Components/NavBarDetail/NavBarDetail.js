import React, { useState, useEffect } from 'react';
import "./NavBarDetail.css";

export default function NavBar() {

    const [toggleMenu, setToggleMenu] = useState(false);
    const [largeur, setLargeur] = useState(window.innerWidth);

    const toggleNavSmallScreen = () => {
        setToggleMenu(!toggleMenu);
    }

    useEffect(() => {

        const changeWidth = () => {
            setLargeur(window.innerWidth);

            if(window.innerWidth > 500) {
               setToggleMenu(false);
            }
        }
      
       window.addEventListener('resize', changeWidth);

       return () => {
           window.removeEventListener('resize', changeWidth);
       }
    }, [])

    return (
        <nav className="details">
            {(toggleMenu || largeur > 500) &&(

                <ul className="list">
                  <li className="items"> Service client prestataire | </li>
                  <li className="items"> Sevice client | </li>
                  <li className="items"> Conditions général de vente | </li>
                  <li className="items"> Comment c'est passé votre expérience ?  </li>
                </ul>

            )}
            <button className="btn" onClick={toggleNavSmallScreen}>Menu</button>
        </nav>
    )

}