import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavBar from "../../Components/NavBar/NavBar";
import NavBarDetail from "../../Components/NavBarDetail/NavBarDetail";
import "./Profil.css";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function Profil() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className={classes.root}>
           <NavBar /> 
            <h1 className='titleProfil'> Profil. </h1> <hr></hr>
             <div className={classes.root}>
                 <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-contents"
                    id="panel1bh-header"
                    >
                        <Typography className={classes.heading}> Your transactions </Typography>
                        <Typography className={classes.secondaryHeading}> See transactions</Typography>
                    </AccordionSummary>
                    <ol>
                        <li>Input the transactions here</li>
                        <li>Input the transactions here</li>
                    </ol>
                 </Accordion>
                 <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-contents"
                    id="panel2bh-header"
                    >
                        <Typography className={classes.heading}> See your NFT </Typography>
                        <Typography className={classes.secondaryHeading}> See NFT</Typography>
                    </AccordionSummary>
                    <ol>
                        <li>Input the NFT here</li>
                        <li>Input the NFT here</li>
                    </ol>
                 </Accordion>
                 <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-contents"
                    id="panel3bh-header"
                    >
                        <Typography className={classes.heading}> Your comments </Typography>
                        <Typography className={classes.secondaryHeading}> See comments you've made</Typography>
                    </AccordionSummary>
                    <ol>
                        <li>Input the comments received here</li>
                        <li>Input the comments received here</li>
                    </ol>
                 </Accordion>
                 <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-contents"
                    id="panel4bh-header"
                    >
                        <Typography className={classes.heading}> Received comments </Typography>
                        <Typography className={classes.secondaryHeading}> See received comments</Typography>
                    </AccordionSummary>
                    <ol>
                        <li>Input the comments gave here</li>
                        <li>Input the comments gave here</li>
                    </ol>
                 </Accordion>
             </div>
           <NavBarDetail /> 
        </div>
    )
}