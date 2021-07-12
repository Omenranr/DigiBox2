import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import Search from "../../Components/Search/Search";
import NFT from "../../Components/NFT/NFT";

export default function HomePage() {
    return (
        <div className="App">
        <NavBar />
        <h1 className="title">DigiBox, a new way to give...</h1>
        <Search /> 
        <h2 className="subTitle">Les DigiBox du moment</h2>
            <NFT />
        <NavBarDetail />
        </div>
    )
}
