/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
} from '@material-ui/core';
import FooterLogo from '../../../../assets/images/footerGroup.svg';
import footerMock from '../../../../__mocks__/footerMock.json';
import CopyrightFooter from './copyRightFooter';
import ConnectedCommonLinks from '../Common/CommonLinks';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#FFFFFF',
    },
    containerFooter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '80px',
    },
    footerLogo: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
            margin: '20px 300px',
        },
    },
    footerCopy: {
        fontSize: '18px',
        fontFamily: 'DINCondensed',
        color: '#42413D',
        borderBottom: '1px solid #D1D1D1',
        textTransform: 'uppercase',
        marginBottom: '30px',
    },
    footerSubCopy: {
        fontFamily: 'AvenirNext',
        color: '#42413D',
        textTransform: 'uppercase',
        letterSpacing: '1.00677px',
        margin: '18px 0',
        fontSize: '12px',
    },
    footerLinkContainer: {
        margin: '20px 50px',
        minWidth: '158px',
    },
    footerIcon: {
        margin: '0 10px',
    },
}));

export default function DryBarFooter() {
    const classes = useStyles();

    return (
        <Grid className={classes.root}>
            <Grid container className={classes.containerFooter}>
                <img
                    src={FooterLogo}
                    alt="footer-logo"
                    className={classes.footerLogo}
                />
                {footerMock.map((footer) => (
                    <Grid className={classes.footerLinkContainer}>
                        <div className={classes.footerCopy}>{footer.title}</div>
                        <div className={classes.footerSubCopy}>{footer.help_copy_sub}</div>
                        <div className={classes.footerSubCopy}>{footer.help_copy_sub_pro}</div>
                        <div className={classes.footerSubCopy}>{footer.help_copy_sub_second}</div>
                        <div className={classes.footerSubCopy}>{footer.help_copy_sub_third}</div>
                        <div className={classes.footerSubCopy}>{footer.help_copy_sub_third_pro}</div>
                    </Grid>
                ))}
                <Grid className={classes.footerLinkContainer}>
                    <div className={classes.footerCopy}>Let&apos;s Be Friends</div>
                    <ConnectedCommonLinks />
                </Grid>
            </Grid>
            <CopyrightFooter />
        </Grid>
    );
}
