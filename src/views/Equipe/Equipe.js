import React from 'react';
import "./Equipe.css";
import Connection from '../../Connection';

export default function Equipe() {
    return (
        <div className="Team">
            <h1 className="titleTeam"> L'Equipe derrière le projet.</h1> <hr></hr>
              <Connection />
        </div>
    )
}