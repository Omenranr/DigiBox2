import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import NFT from "../../Components/NFT/NFT";
import Connection from "../../Connection";
import "./HomePage.css";
import logo from "../../Images/LogoDigiBox.png";

export default function HomePage() {
    return (
        <div className="App">
        <NavBar />
        <h1 className="title">DigiBox, le plaisir d'offrir!</h1> <hr></hr>
        <Connection />
                <div className="text-logo">
                    <h2 className="subTitle">Les DigiBox du moment</h2>
                    <img className="logo" src={logo} alt="logo" />
                </div>
            <NFT />
        <NavBarDetail />
        </div>
    )
}
