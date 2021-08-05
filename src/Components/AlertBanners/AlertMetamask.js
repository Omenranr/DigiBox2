import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '35%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function DescriptionAlerts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle>Metamask not connected</AlertTitle>
        If you don't have metaMask installed <strong><a href="https://metamask.io/download">here</a></strong>
      </Alert>
    </div>
  );
}