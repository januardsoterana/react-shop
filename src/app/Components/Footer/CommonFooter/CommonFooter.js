/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Typography, FormControl, Input, Button,
} from '@material-ui/core';
import Media from 'react-media';
import footerMock from '../../../../__mocks__/footerMock.json';
import CommonFooterAppStore from './CommonAppFooterStore';
import MobileFooterLinks from './MobileFooterLinks';
import { TABLET_BREAKPPOINT } from '../../../../Helpers/breakpoints';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#FFFFFF',
    },
    containerFooter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '80px 40px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            padding: '0 28px',
            borderTop: '1px solid #D1D1D1'
        },
    },
    footerLogo: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
            margin: '20px 300px',
        },
    },
    footerCopy: {
        fontSize: '17px',
        letterSpacing: '1.1px',
        fontFamily: 'DINCondensed',
        color: '#42413D',
        borderBottom: '1px solid #D1D1D1',
        textTransform: 'uppercase',
        marginBottom: '20px !important',
        fontWeight: '700',
        paddingBottom: '15px !important',
        paddingRight: '30px !important'
    },
    footerSubCopy: {
        fontFamily: 'AvenirNext',
        color: '#42413D',
        textTransform: 'uppercase',
        letterSpacing: '1.00677px',
        margin: '22px 0 !important',
        fontSize: '11px',
        paddingRight: '30px !important'
    },
    footerLinkContainer: {
        margin: '0px 50px 0px 0px',
        // minWidth: '158px',
    },
    footerIcon: {
        margin: '0 10px',
    },
    propValueFooterColor: {
        width: '100%',
    },
    footerCopyValueProp: {
        textAlign: 'left',
        width: '100%',
        fontSize: '15px',
        lineHeight: '18px',
        marginBottom: '20px',
        color: '#42413D',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            textAlign: 'center',
            fontSize: '17px',
            lineHeight: '21px'
        },
    },
    enterYourEmail: {
        width: '100%',
        height: '40px',
        marginRight: '20px',
    },
    subscribeEmail: {
        background: '#54575A',
        borderRadius: '0px',
        color: '#FFFFFF',
        fontSize: '13px',
        width: '65px',
        height: '40px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            margin: '30px 0',
            width: '100%',
        },
    },
    subscribeEmailForm: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            flexDirection: 'column',
        },
        marginTop: '30px'
    },
    input: {
        '&::placeholder': {
            fontStyle: 'oblique',
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            textAlign: 'center',
        },
    },
    menuSection:{
        // paddingRight: '20px'
    },
    joinUsSection: {
        width: '100%',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {

            margin: '50px 0 40px',
        },
    },
    emailUsHeader: {
        fontFamily: 'DINCondensed',
        fontSize: '1.7rem',
        fontWeight: '700',
        whiteSpace: 'noWrap',
        color: '#42413D',
        marginBottom: '12px !important',
        paddingLeft: '18px !important',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            paddingLeft: '0 !important',
        },
    },
    emailUsHeaderBorder: {
        height: '16px',
        width: '18rem',
        backgroundColor: '#FFDD30',
        marginBottom: '-25px',
    },
    joinusHeaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            margin: '20px 0',
            // paddingTop: '70px',
            alignItems: 'center',
            // borderTop: '3px dashed #BDBDBD'
        }
    },
    joinBtnText: {
        fontFamily: 'AvenirNext',
        fontWeight: '400'
    }
}));

export default function DryBarCommonFooter() {
    const classes = useStyles();

    const joinBtn = <span className={classes.joinBtnText}>Join</span>
    return (
        <Grid className={classes.root}>
            <Grid container className={classes.containerFooter}>
                <Media
                    query={{ maxWidth: TABLET_BREAKPPOINT }}
                >
                    {(matches) => (matches ? (
                        // refactor JOIN us section to indiviual component
                        <>
                            <Grid item md={2} className={classes.joinUsSection}>
                                <Grid className={classes.joinusHeaderContainer}>
                                    <Grid className={classes.emailUsHeaderBorder} />
                                    <Typography className={classes.emailUsHeader}>EMAIL VALUE PROP HEADER</Typography>
                                </Grid>

                                <Typography className={classes.footerCopyValueProp}>Subscribe to get all the latest Drybar news and exclusive offers. Get value proposition for user when they sign up.</Typography>
                                <FormControl fullWidth className={classes.subscribeEmailForm}>
                                    <Input
                                        classes={{
                                            input: classes.input,
                                        }}
                                        id="standard-adornment-amount"
                                        value=""
                                        // onChange={handleChange('amount')} // this will use in future when data come from API
                                        startAdornment=""
                                        placeholder="Enter your emaill address"
                                        className={classes.enterYourEmail}
                                    />
                                    <Button className={classes.subscribeEmail} variant="outlined">
                                        Join
                                    </Button>
                                </FormControl>
                            </Grid>
                            <MobileFooterLinks />
                        </>
                    ) : (
                        <>
                            {footerMock.map((footer) => (
                                <Grid item className={classes.menuSection}>
                                    <Typography className={classes.footerCopy}>{footer.title}</Typography>
                                    <Grid>
                                        <Typography style={footer.styleOverride?.help_copy_sub}>{footer.help_copy_sub}</Typography>
                                        <Typography style={footer.styleOverride?.help_copy_sub_text}>{footer.help_copy_sub_text}</Typography>
                                    </Grid>
                                    <Typography className={classes.footerSubCopy}>{footer.help_copy_sub_pro}</Typography>
                                    <Typography className={classes.footerSubCopy}>{footer.help_copy_sub_second}</Typography>
                                    <Typography className={classes.footerSubCopy}>{footer.help_copy_sub_third}</Typography>
                                    <Typography className={classes.footerSubCopy}>{footer.help_copy_sub_third_pro}</Typography>
                                </Grid>
                            ))}
                            <Grid item xs={3} className={classes.joinUsSection}>
                                <Grid className={classes.joinusHeaderContainer}>
                                    <Grid className={classes.emailUsHeaderBorder} />
                                    <Typography className={classes.emailUsHeader}>EMAIL VALUE PROP HEADER</Typography>
                                </Grid>

                                <Typography className={classes.footerCopyValueProp}>Subscribe to get all the latest Drybar news and exclusive offers. Get value proposition for user when they sign up.</Typography>
                                <FormControl fullWidth className={classes.subscribeEmailForm}>
                                    <Input
                                        classes={{
                                            input: classes.input,
                                        }}
                                        id="standard-adornment-amount"
                                        value=""
                                        // onChange={handleChange('amount')} // this will use in future when data come from API
                                        startAdornment=""
                                        placeholder="Enter your emaill address"
                                        className={classes.enterYourEmail}
                                    />
                                    <Button className={classes.subscribeEmail} variant="outlined" children={joinBtn}>
                                    </Button>
                                </FormControl>
                            </Grid>
                        </>
                    ))}
                </Media>
            </Grid>
            <CommonFooterAppStore />
        </Grid>
    );
}
