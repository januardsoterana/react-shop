/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LogInAuth from './Partials/LogIn/LoginUserAuth';
import SectionTitle from "../SectionTitle";
import {Backdrop, Button, CircularProgress, Grid, Input, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    landingSection: {
        display: 'flex',
        justifyContent: 'center',
    },
    landingInner: {
        background: '#FFFFFF',
        boxShadow: '1px 2px 5px #ccc',
        borderRadius: '2px',
        padding: '40px 50px',
        marginTop: '30px'
    },
    textSection: {
        fontSize: '18px',
        textAlign: 'center'
    },
    bottomSection: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center'
        },
    },
    openAppBtn: {
        background: '#FFDD30',
        color: '#333',
        width: '250px',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '15px 70px !important',
        borderRadius: '1px',
        margin: '5px !important'
    },
    bookBtn: {
        background: '#000000',
        color: '#eee',
        width: '250px',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '15px 70px !important',
        borderRadius: '1px',
        textAlign: 'center',
        margin: '5px !important'
    }
}));

export default function Landing() {
    const classes = useStyles();
    return (
        <>
            <Grid container className={classes.landingSection}>
                <SectionTitle title="YOUR EMAIL IS VALIDATED"/>
                <Grid className={classes.landingInner}>
                    <Grid className={classes.textSection}>
                        <Typography style={{color: '#333'}}>Thanks for signing up to drybar! We're happy to have
                            you.</Typography>
                        <Typography style={{padding: '50px 0 30px', fontSize: '18px', fontWeight: 'bold'}}>What would you like to do
                            now?</Typography>
                    </Grid>
                    <Grid className={classes.bottomSection}>
                        <Link to="/#"><Typography className={classes.openAppBtn}>OPEN
                            APP</Typography></Link>
                        <Link to="/booking/location"><Typography
                            className={classes.bookBtn}>BOOK</Typography></Link>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
