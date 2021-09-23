/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from './LoginWithGoogle';
import facebookLogin from '../../../../../assets/images/facebookLogin.svg';
import appConfig from '../../../../../app.config';

const useStyles = makeStyles((theme) => ({
    borderBottomBetween: {
        borderBottom: `1px solid ${theme.palette.common.lightGrey[0]}`,
        width: '24%',
        margin: '0px 5px 7px 41px',
    },
    displayFlex: {
        display: 'flex',
        margin: '-62px 0px 21px 28%',
    },
    borderBottomCopy: {
        margin: '7px 0px 0px 25px',
    },
    logInWithGoogle: {
        textAlign: 'center',
    },
    logInWithFacebook: {
        textAlign: 'center',
    },
    facebookLogin: {
        backgroundColor: '#FFFFFF',
        color: '#42413D',
        border: 'calc(.06887vw + .67769px) solid #FFFFFF',
        height: '64px',
        width: '378px',
        fontSize: '13px',
        textTransform: 'capitalize',
        margin: '20px 0',
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
    facebookLogInIcon: {
        padding: '10px',
        // float: 'left',
    },
}));

const LoginGoogleFacebook = ({ handleSocialLogin }) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.displayFlex}>
                <div className={classes.borderBottomBetween} />
                <span className={classes.borderBottomCopy}>OR</span>
                <div className={classes.borderBottomBetween} />
            </div>
            <Grid className={classes.logInWithGoogle}>
                <GoogleLogin handleSocialLogin={handleSocialLogin} />
            </Grid>
            <Grid className={classes.logInWithFacebook}>
                <Button
                    className={classes.facebookLogin}
                    onClick={() => handleSocialLogin(appConfig.facebookIdp)}
                    startIcon={<img src={facebookLogin} alt="facebook-login" className={classes.facebookLogInIcon} />}
                    classes={{
                        label: classes.buttonLabel,
                        text: classes.buttonText,
                    }}
                >

                    <Typography style={{ width: '100%', display: 'block' }}>
                        Login With Facebook
                    </Typography>
                </Button>
            </Grid>
        </>
    );
};

export default LoginGoogleFacebook;
