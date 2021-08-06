import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import NFT from "../../Components/NFT/NFT";
import "./HomePage.css";
import logo from "../../Images/TransparentLogo.png";
import Particles from 'react-particles-js';

export default function HomePage() {
    return (
        <div className="App">
            <NavBar />
            <Particles

                params={{
                    particles: {
                        retina_detect:true,
                        move:{enable:true,speed:1,direction:"none",random:false,straight:false,out_mode:"out",bounce:false,attract:{enable:false,rotateX:600,rotateY:1200}},
                        number: { value: 80 },
                        density: { enable: true, value_area: 800 },
                        color: { value: "#fff" },
                        shape: { type: "circle", stroke: { width:0, color:"#000000"}, polygon:{ nb_sides:5 }},
                        line_linked: { color: "#fff", distance: 150, enable: true, opacity: 0.4, width: 1 },
                        opacity:{ value:0.5, random:false, anim:{enable:false,speed:1,opacity_min:0.1,sync:false}},
                        size:{value:3,random:true,anim:{enable:false,speed:40,size_min:0.1,sync:false}}
                    }
                }}
            />
                <h1 className="title">DigiBox, le plaisir d'offrir!</h1> <hr></hr>
                    <div className="text-logo">
                        <h2 className="subTitle">Les DigiBox du moment</h2>
                    </div>
                <NFT />
            <NavBarDetail />
        </div>
    )
}
