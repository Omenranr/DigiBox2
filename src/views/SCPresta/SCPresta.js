import React from 'react';
import "./SCPresta.css";
import Connection from '../../Connection';

export default function SCPresta() {
    return (
        <div className="SCPresta">
            <h1 className="title"> Service client/prestataire. </h1> <hr></hr>
              <Connection />
        </div>
    )
}