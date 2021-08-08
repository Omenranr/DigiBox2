
import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props, {message}) {
  const classes = useStyles();
  const {open, setOpen, severity, alertMessage, autoHideDuration, anchorOriginTopRight} = props

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); 
  };

  return (
    <div className={classes.root}>
      <Snackbar
       open={open} 
       autoHideDuration={autoHideDuration ? autoHideDuration : 10000000} 
       onClose={handleClose}
       anchorOriginTopRight={anchorOriginTopRight}
       >
        <Alert onClose={handleClose} severity={severity} >
            {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}