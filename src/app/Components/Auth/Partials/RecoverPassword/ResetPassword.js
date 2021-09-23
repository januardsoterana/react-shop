/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
    Button, Grid,
    Input, Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import SectionTitle from '../../../SectionTitle';
import { recoverPassword } from '../../../../../api/auth-api'
import restClient from '../../../../../api/restClient';
import RecoverSuccessDialog from "./Partials/RecoverSuccessModal";

const useStyles = (theme) => ({
    requestNoteDetails: {
        float: 'right',
        background: theme.palette.common.white,
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
        margin: 'auto',
        maxWidth: '800px',
        padding: '30px 22px',
        textAlign: 'center',
        height: '286px',
        width: '754px',
    },
    authOperation: {
        fontSize: '18px',
        lineHeight: '45px',
        color: theme.palette.common.white,
        textTransform: 'capitalize',
        background: theme.palette.secondary.main,
        height: '63px',
        width: '378px',
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
        },
    },
    requestServiceContainer: {
        background: theme.palette.common.lightGrey[3],
        marginBottom: '86px',
    },
    enterYourEmail: {
        width: '100%',
        padding: '7px 0px 0px 0px',
    },
    enterEmailPassword: {
        padding: '29px 0px 0px 0px',
    },
    enterEmailPasswordCopy: {
        float: 'left',
        color: theme.palette.common.lightGrey[4],
    },
    recoverPassword: {
        color: theme.palette.common.lightGrey[4],
        textDecoration: 'underline',
        marginTop: '29px',
        cursor: 'pointer',
    },
    logInWithGoogleFacebook: {
        textAlign: 'center',
    },
    facebookLogin: {
        '& .kep-login-facebook': {
            backgroundColor: theme.palette.common.white,
        },
    },
    visibilityIcon: {
        float: 'right',
        margin: '-33px 0px 0px 0px',
        cursor: 'pointer',
    },
    fieldsContainer: {
        marginBottom: '69px',
    },
    errorMessage: {
        color: '#FF0000',
        textAlign: 'left',
        paddingTop: '5px',
        paddingLeft: '3px'
    },
    backdrop: {
        zIndex: 11,
        color: '#fff',
    },
    modalTitle: {
        textAlign: "center",
        fontSize: "31px",
        fontFamily: 'DINCondensed',
        lineHeight: "37px",
        textTransform: "uppercase",
        fontWeight: "600"
    },
    registerEmail: {
        textAlign: "center",
        fontSize: "32px",
        color: "#42413D"
    },
    recoverOperation: {
        fontSize: '18px',
        lineHeight: '45px',
        textTransform: 'capitalize',
        height: '63px',
        width: '378px',
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
            color: '#FFFFFF'
        },
        background: "#F9F9F9",
        margin: "14px 2px 19px 111px",
        border: "1px solid #54575A",
        color: "#54575A"
    }
});


const RecoverPassword = ({
    classes, oktaAuth, authState, history,
}) => {
    const [email, setEmailValue] = useState('');
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [sessionToken, setSessionToken] = useState('');
    const handleEmailChange = (e) => {
        const newError = { ...errors };
        delete newError.email;
        setErrors(newError);
        setEmailValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newError = { ...errors };
        delete newError.signin;
        if (!email?.length) {
            newError.email = '* Email is required';
        } else {
            delete newError.email;
        }

        setErrors(newError);
        if (!Object.keys(newError).length) {
            restClient.post(recoverPassword(email)).then((response) => {
                console.log("reset",response)
                if (response) {
                    setSessionToken(response.sessionToken);
                    setOpen(true);
                }
            }).catch((err) => {
                console.log("errr ===>",err)
                setErrors({ signin: err.errorSummary })});
        }
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Grid container className={classes.requestServiceContainer}>
                <SectionTitle title="Recover Password" />
                <Grid className={classes.requestNoteDetails}>
                    <Grid className={classes.requestContainer}>
                        <form onSubmit={handleSubmit} className={classes.subscribeEmailForm}>
                            <Grid>
                                <Grid className={classes.fieldsContainer}>
                                    <Typography className={classes.enterEmailPasswordCopy}>Email</Typography>
                                    <Input
                                        classes={{
                                            input: classes.input,
                                        }}
                                        id="standard-adornment-amount"
                                        error={errors.email}
                                        value={email}
                                        onChange={(e) => handleEmailChange(e)}
                                        startAdornment=""
                                        placeholder="Your email here..."
                                        className={classes.enterYourEmail}
                                    />
                                    <Grid className={classes.errorMessage}>{errors.email}</Grid>
                                </Grid>
                            </Grid>
                            <Button type="submit" className={classes.authOperation} variant="outlined">
                                Recover Password
                            </Button>
                            <Link to="/auth/login"><Typography className={classes.recoverPassword}>Log In</Typography></Link>
                        </form>
                    </Grid>
                </Grid>
                {open &&
                <RecoverSuccessDialog openModal={open} classes={classes} sessionToken={sessionToken} onClose={handleClose} />
                }
            </Grid>
        </>
    );
};

RecoverPassword.prototype = {
    classes: object.isRequired,
};

export default withRouter(withStyles(useStyles)(RecoverPassword));
