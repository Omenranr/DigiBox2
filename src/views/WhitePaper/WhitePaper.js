import React, { useState } from 'react';
import "./WhitePaper.css";
import Container from '@material-ui/core/Container';
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";

export default function WhitePaper() {

    
    return (
        <div className="WhitePaper">
           <NavBar /> 
              <div> 
              <iframe src="https://drive.google.com/file/d/1CMpL2HkQnLCNHl-EMX-kydQhXnj9nweS/preview" allow="autoplay"></iframe>
             </div>
            <NavBarDetail /> 
        </div>
    )
}