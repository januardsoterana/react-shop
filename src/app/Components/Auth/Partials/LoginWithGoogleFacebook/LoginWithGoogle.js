/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import appConfig from '../../../../../app.config';
import googleLogo from '../../../../../assets/images/googleLogo.svg';

const useStyles = makeStyles(() => ({
    logInWithGoogle: {
        textAlign: 'center',
    },
    googleLogin: {
        backgroundColor: '#FFFFFF',
        color: '#42413D',
        border: 'calc(.06887vw + .67769px) solid #FFFFFF',
        height: '64px',
        width: '378px',
        fontSize: '13px',
        textTransform: 'capitalize',
        margin: '10px 0',
        maxWidth: '100%',
        textDecoration: 'none',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.04)',
    },
    buttonLabel: {
        display: 'flex',
    },
    buttonText: {
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: '#fff',
        },
    },
    googleLogInIcon: {
        padding: '10px',
        // float: 'left',
    },
}));

const googleLogIn = ({ handleSocialLogin }) => {
    const classes = useStyles();
    return (
        <Grid className={classes.logInWithGoogle}>
            <Button
                className={classes.googleLogin}
                onClick={() => handleSocialLogin(appConfig.googleIdp)}
                startIcon={<img src={googleLogo} alt="facebook-login" className={classes.googleLogInIcon} />}
                classes={{
                    label: classes.buttonLabel,
                    text: classes.buttonText,
                }}
            >
                <Typography style={{ width: '100%', display: 'block' }}>
                    Login With Google
                </Typography>
            </Button>
        </Grid>
    );
};

export default googleLogIn;
