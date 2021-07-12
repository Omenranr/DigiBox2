import React from 'react';
//import { useState, useEffect } from 'react';
import "./Search.css";

function Search() {

    return (
        <>
        <div className="searchBar">
            <input className="champ"
            type="text"
            name="searchBar" 
            placeholder="Trouver l'expérience parfaite..."
            />
        </div>
        <button className="btn-research" type="submit">Rechercher</button>
        </>
    );
}

export default Search;