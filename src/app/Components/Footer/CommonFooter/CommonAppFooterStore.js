/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Grid, Typography,
} from '@material-ui/core';
import Media from 'react-media';
import drybarFooterIcon from '../../../../assets/images/drybarFooterIcon.svg';
import drybarAppStoreIcon from '../../../../assets/images/downloadAppStore.svg';
import downloadPlayStore from '../../../../assets/images/downloadPlayStore.svg';
import ConnectedCommonLinks from '../Common/CommonLinks';
import ConnectedCopyRightFooter from '../Partials/copyRightFooter';
import { DESKTOP_BREAKPOINT, TABLET_BREAKPPOINT } from '../../../../Helpers/breakpoints';
import drybarBlackSmallLogo from '../../../../assets/images/drybarBlackSmall.svg';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '35px 0',
        textAlign: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F9F9F9',
        [theme.breakpoints.down('md')]: {
            
            flexDirection: 'column',
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            padding: '30px 0 15px',
            backgroundColor: '#FFF',
        },
    },
    copyrightText: {
        margin: '10px',
        fontSize: '14px',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        },
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px !important'
    },
    copyrightLinks: {
        margin: '10px',
        width: '100%',
    },
    link: {
        fontSize: '14px',
        display: 'inline-block',
        margin: '0 10px',
        color: '#42413D',
    },
    displayFlex: {
        display: 'flex',
        margin: '0 35px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            flexDirection: 'column',
        },
        [theme.breakpoints.down(DESKTOP_BREAKPOINT)]: {
            justifyContent: 'center',
            marginBottom: '20px',
        },
        alignItems: 'center',
    },
    drybarFooterIcon: {
        margin: '0 7px',
    },
    footerCopy: {
        fontSize: '17px',
        fontFamily: 'DINCondensed',
        color: '#42413D',
        textTransform: 'uppercase',
        fontWeight: '700',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            marginBottom: '13px',
        },
        paddingRight: '10px !important',
        letterSpacing: '1.1px'
    },
    displayFlexLinksIcon: {
        display: 'flex',
        padding: '0 30px',
        alignItems: 'center',
        [theme.breakpoints.down(DESKTOP_BREAKPOINT)]: {
            justifyContent: 'center',
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT+100)]: {
            marginBottom: '10px'
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            backgroundColor: '#F9F9F9',
            padding: '30px',
            margin: '0 0 36px',
            justifyContent: 'center',
            flexDirection: 'column',
        },
    },
    linksCommonFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            marginTop: '15px',
        },
    },
    drybarBookingApp: {
        display: 'flex',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            marginBottom: '20px',
        },
    },
    bookingAppText: {
        fontSize: '11px',
        color: '#42413D',
    }
}));

const CommonAppStoreFooter = () => {
    const classes = useStyles();

    return (
        <>
            <Grid className={classes.container}>
                <Media
                    query={{ maxWidth: TABLET_BREAKPPOINT }}
                >
                    {(matches) => (matches ? (
                        <Grid className={classes.displayFlexLinksIcon}>
                            <Typography className={classes.footerCopy}>Let&apos;s Be Friends!</Typography>
                            <Grid className={classes.linksCommonFooter}>
                                <ConnectedCommonLinks />
                            </Grid>
                        </Grid>
                    ) : null)}
                </Media>
                <Grid className={classes.displayFlex}>
                    <Grid className={classes.drybarBookingApp}>
                        <img alt="prop-footer" src={drybarFooterIcon} />
                        <Typography className={classes.copyrightText}>
                            <img src={drybarBlackSmallLogo} alt="Drybar" style={{ marginRight: '5px' }} />
                            <Box className={classes.bookingAppText}>
                                BOOKING APP
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid>
                        <img alt="prop-footer" src={drybarAppStoreIcon} className={classes.drybarFooterIcon} />
                        <img alt="prop-footer" src={downloadPlayStore} className={classes.drybarFooterIcon} />
                    </Grid>
                </Grid>
                <Media
                    query={{ maxWidth: TABLET_BREAKPPOINT }}
                >
                    {(matches) => (!matches ? (
                        <Grid className={classes.displayFlexLinksIcon}>
                            <Typography className={classes.footerCopy}>Let&apos;s Be Friends!</Typography>
                            <Grid className={classes.linksCommonFooter}>
                                <ConnectedCommonLinks />
                            </Grid>
                        </Grid>
                    ) : null)}
                </Media>

            </Grid>
            <ConnectedCopyRightFooter />
        </>

    );
};

export default CommonAppStoreFooter;
