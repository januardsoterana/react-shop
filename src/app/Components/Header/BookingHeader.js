import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import HeaderLogo from '../../../assets/images/drybarLogo.svg';
import PhoneLogo from '../../../assets/images/phoneLogo.svg';

const useStyles = makeStyles((theme) => ({
    headerCopy: {
        color: '#42413D',
        background: '#F9F9F9',
        padding: '20px 2px 20px 0px',
        textAlign: 'center',
        fontSize: '20px',
        fontFamily: 'AvenirNext',
    },
    backDryBarPage: {
        fontSize: '17px',
        fontFamily: 'AvenirNext',
        color: '#42413D',
    },
    headerContainer: {
        padding: '18px 2px 18px 18px',
        background: '#FFFFFF',
        [theme.breakpoints.down('sm')]: { display: 'none' },

    },
    backHeaderIcon: {
        margin: '-0px 2px 2px 2px',
    },
    displayInline: {
        display: 'inline-flex',
        margin: '9px 0px 0px 0px',
    },
    dryBarLogo: {
        margin: '-36px 0px -13px -97px',
    },
    bookingHelp: {
        display: 'contents',
    },
    bookingHelpCopy: {
        fontFamily: 'AvenirNext',
        fontSize: '15px',
        margin: '14px 13px 2px -35px',
    },
    bookingHelplineNo: {
        fontFamily: 'AvenirNext',
        fontSize: '14px',
        margin: '14px 2px 2px 13px',
    },
    backLink: {
        color: '#42413D',
        '&:focus, &:hover, &:visited, &:link, &:active': {
            textDecoration: 'none',
        },
        display: 'flex',
    },
}));

export default function TopHeader() {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.headerContainer}>
                <Grid item xs={6} className={classes.displayInline}>
                    <Link to="/" className={classes.backLink}>
                        <ArrowBackIosIcon fontSize="small" className={classes.backHeaderIcon} />
                        <span className={classes.backDryBarPage}>Back to Drybar Shops</span>
                    </Link>
                </Grid>
                <Grid item xs={5} className={classes.dryBarLogo}>
                    <Link to="/">
                    <img
                        src={HeaderLogo}
                        alt="header-logo"
                    />
                    </Link>
                </Grid>
                <Grid item xs={1} className={classes.bookingHelp}>
                    <span className={classes.bookingHelpCopy}>Need booking help?</span>
                    <img
                        src={PhoneLogo}
                        alt="header-logo"
                    />
                    <span className={classes.bookingHelplineNo}>888-555-1212</span>
                </Grid>
            </Grid>
        </div>
    );
}
