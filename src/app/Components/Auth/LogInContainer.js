/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LogInAuth from './Partials/LogIn/LoginUserAuth';

const useStyles = makeStyles((theme) => ({
    requestNoteDetails: {
        float: 'right',
        background: theme.palette.common.white,
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
        margin: 'auto',
        maxWidth: '800px',
        padding: '30px 22px',
        textAlign: 'center',
        height: '427px',
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
        marginBottom: '40px',
    },
    enterEmailPasswordCopy: {
        float: 'left',
        color: theme.palette.common.lightGrey[4],
    },
    recoverPassword: {
        color: theme.palette.common.lightGrey[4],
        textDecoration: 'underline',
        marginTop: '10px !important',
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
        marginBottom: '20px',
    },
    backdrop: {
        zIndex: 11,
        color: '#fff',
    },
}));

export default function LogInCard({buyout}) {
    const classes = useStyles();
    return (
        <>
            <LogInAuth classes={classes} buyout={buyout} />
        </>
    );
}
