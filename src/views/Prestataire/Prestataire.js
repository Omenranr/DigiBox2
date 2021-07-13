import React from 'react';
import "./Prestataire.css";
import Connection from '../../Connection';

export default function Prestataire() {
    return (
        <div className="Prestataire-Prerequis">
            <h1 className="title"> Devenir partenaire.</h1> <hr></hr>
             <Connection /> 
            <div className="prerequis">
            <h4> Voici les prérequis devenir un prestataire ches DigiBox:</h4>
              <ul className="liste">
                  <li>Etre inscrit au registre du commerce...</li>
                  <li>Avoir un numéro de siret...</li>
                  <li>Avoir un numéro de siret...</li>
                  <li>Avoir un numéro de siret...</li>
              </ul>
            </div>
            <div className="Form">
                <h4>Afin de nous rejoindre, merci de remplir le formulair ci-dessous:</h4>
                <form className="formulaire">
                    <label for="email">Email address:</label>
                    <input type="text" placeholder="email"></input> <br></br> <br></br>
                    <label for="name">Nom de l'entreprise</label>
                    <input type="text" placeholder="Nom"></input>
                </form>
            </div>
        </div>
    )
} 