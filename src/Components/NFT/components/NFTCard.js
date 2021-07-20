import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_SECRET_API_KEY);

async function updatePinataJSON(hashkey) {
  const metadata = {
    name: 'blabla',
    keyvalues: {
        newKey: 'blabla2',
        existingKey: 'blabla3',
        existingKeyToRemove: null
    }
  };
  pinata.hashMetadata(hashkey, metadata).then((result) => {
      console.log(result);
  }).catch((err) => {
      console.log(err);
  });
}

async function newPinataJSON(customerData) {
  const body = {
    message: 'Pinatas are awesome'
  };
  const options = {
      pinataMetadata: {
          name: "thisisatestname",
          keyvalues: {
              customKey: 'customValue',
              customKey2: 'customValue2'
          }
      },
      pinataOptions: {
          cidVersion: 0
      }
  };
  pinata.pinJSONToIPFS(body, options).then((result) => {
      console.log(result);
  }).catch((err) => {
      console.log(err);
  });
}

async function authenticatePinata() {
  pinata.testAuthentication().then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
}

 function handleBuyButton(){
  if (process.env.REACT_APP_PINATA_API_KEY === undefined) {
    console.log('Pinata keys are not set in your environment !');
  }
  
  // procéder au paiement avant la génération du NFT

  authenticatePinata();
  // updatePinataJSON('QmUHeDovuppZGU3yMccWpcCZ3GbcfiYGmCTMSUUn7XsqLY');
  // newPinataJSON();

  // Mint NFT to the customer with pinata hash ID
  console.log('done');
} 

export default function Equipe(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image=""
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.offer.provider}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {props.offer.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.offer.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.offer.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small" color="primary" onClick={handleBuyButton}>Acheter</Button>
        <Button size="small" color="primary">
          <a href="#">Lien</a>
        </Button>
      </CardActions>
    </Card>
  );
}