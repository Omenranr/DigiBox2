import React, { useState } from 'react';
import "./WhitePaper.css";
import Container from '@material-ui/core/Container';
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";

export default function WhitePaper() {

    
    return (
        <div className="WhitePaper">
           <NavBar /> 
            <h1 className="white"> WhitePaper. </h1> <hr></hr>
              <div> 
              <iframe src="https://drive.google.com/file/d/1CMpL2HkQnLCNHl-EMX-kydQhXnj9nweS/preview" width="1640" height="680" allow="autoplay"></iframe>
             </div>
            <NavBarDetail /> 
        </div>
    )
}