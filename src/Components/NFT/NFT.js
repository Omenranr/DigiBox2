import React, { Component } from 'react';
import "./NFT.css";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const NFT = () => {
        return (
            <section className="holdingContainer">
                <div className="internalContainerLeft">
                    <h4>
                        Left NFT
                    </h4>
                    <img className="test" src="https://www.lagrandemaison.ch/wp-content/uploads/2018/12/homepage_restaurant.jpg" width="250" alt="La grande maison"/>
                    <p>Nuit dans les alpes suisse</p>
                    <p>Description complète !!!!Comment faire pour display une page commune pour tout les NFT</p>
                    <a href="https://www.lagrandemaison.ch/">More infos</a><hr></hr>
                </div>
                <div className="internalContainerCenter">
                    <h4>
                        Center NFT
                    </h4>
                    <img src="https://s1.qwant.com/thumbr/474x331/8/3/6553b61828a46c0e914b11306c21a8eccecbe5ab14d4365b73e715c630db32/th.jpg?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.9Ex_1_trr_a-mN9Drlw6JQHaFL%26pid%3DApi&q=0&b=1&p=0&a=0" width="250" alt="Voilier" />
                    <p>Journée voile</p>
                    <a href="https://www.eaubretagne.fr/voile-bretagne/">More infos</a><hr></hr>
                    <Button variant="contained" color="primary">Achat NFT</Button>
                </div>
                <div className="internalContainerRight">
                    <h4>
                        Right NFT
                    </h4>
                    <img src="https://s2.qwant.com/thumbr/474x355/6/0/5d43756fa472cc617985b64a001335b31c8224e9245143c0a90799f5ea2989/th.jpg?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Xff2Z68FA6vTEWw_E7hO-QHaFj%26pid%3DApi&q=0&b=1&p=0&a=0" width="250" alt="Montbéliard"/>
                    <p>Voyage à Montbéliard</p>
                    <a href="https://www.paysdemontbeliard-tourisme.com/">More infos</a><hr></hr>
                    <button className="buy">Achat NFT</button>
                </div>
            </section>   
        )
}

export default NFT
