import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import { ProfilCard } from "../../Components/Profil/components";
//import Profil from "../../Components/NFT/NFT";
import "./Profil.css";


export default function userNFT() {
    return (
        <div className="App">
        <NavBar />
        <h1 className="title">Vos NFT</h1> <hr></hr>
            <ProfilCard /><hr></hr>
        <h3 className="historique">Historique</h3> <hr></hr> <br></br><br></br>  
        <NavBarDetail />
        </div>
    )
}

///offer={item}

/*<div className="holdingContainer">
            {data[0] !== undefined && data.map(item => (
                <div key={item} className="cardDisplay">
                    <NFTCard offer={item}/>
                </div>
            ))}
        </div>*/
  
  
  ///onClick={() => {()}}
