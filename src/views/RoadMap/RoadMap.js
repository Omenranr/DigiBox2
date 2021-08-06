import React from 'react';
import "./RoadMap.css";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import roadMap from "../../Images/RoadMap.png";

export default function RoadMap() {
    return (
        <div className="RoadMap">
           <NavBar /> 
            <h1 className="road"> RoadMap. </h1> <hr></hr>
            <img className="map" src={roadMap} alt="map"/>
           <NavBarDetail /> 
        </div>
    )
}