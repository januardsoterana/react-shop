/* eslint-disable max-len */
import React from 'react';
import { object } from 'prop-types';
import {
    Grid,
    withStyles, Typography,
} from '@material-ui/core';
import {MOBILE_BREAKPOINT, TABLET_BREAKPPOINT} from '../../../Helpers/breakpoints';
import { unstable_concurrentAct } from 'react-dom/test-utils';

const styles = (theme) => ({
    serviceLocatorContainer: {
        // width: '1367px',
        padding: '0 0 40px',
        backgroundColor: '#F9F9F9',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            flexDirection: 'column',
            width: '100%',
            padding: '20px 0'
        },
    },
    titleSection: {
        margin: '40px 20px',
        width: 'calc(100% - 40px)',
        borderTop: '3px dashed #BDBDBD',
        position: 'relative'
    },
    specialOfferCopy: {
        fontFamily: 'MrsEavesSmallCaps',
        fontSize: '20px',
        lineHeight: '23px',
        margin: '12px 0% 0% 14%',
        whiteSpace: 'nowrap',
        letterSpacing: '3.9px',
        color: '#42413D',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            margin: '12px 0% 0%',
            textAlign: 'center'
        },
    },
    borderBottomBetween: {
        borderBottom: '3px dashed #BDBDBD',
        width: '38%',
        margin: '0px 5px 7px 41px',
    },
    displayFlex: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    dashedBorderCopy: {
        borderTop: '3px dashed #BDBDBD',
        width: '93%',
        margin: '22px 0px 0px 23px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            width: 'calc(100% - 40px)',
            margin: '10px 20px',
        },
    },
    desktopMedia: {
        margin: '0 0px 10px',
        width: '100%',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            margin: '0 20px',
            width: 'calc(100% - 40px)'
        }
    },
    mediaSubtitle: {
        margin: '11px 0px 66px 291px;',
        whiteSpace: 'nowrap',
        fontFamily: 'AvenirNext',
        fontSize: '16px',
        lineHeight: '19px',
        textAlign: 'center',
        color: '#42413D',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            padding: '20px !important',
            whiteSpace: 'unset',
        }
    },
    shopLogist: {
        margin: '0px 0px 0px 311px',
        fontFamily: 'AvenirNext',
        fontSize: '15px',
        lineHeight: '18px',
        textAlign: 'center',
        color: '#42413D',
        fontWeight: '600',
    },
    mobileSection: {
        padding: '0 20px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            margin: '10px 0',
            width: '100%'
        }
    },
    title: {
        width: '300px',
        textAlign: 'center',
        backgroundColor: '#F9F9F9',
        display: 'inline-block',
        position: 'absolute',
        top: '-20px',
        left: 'calc(50% - 150px)'
    },
    specialOfferSection: {
        width: '1367px',
        margin: '0 auto',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            width: '100%'
        }
    }
});

const LocatorMixoGlass = ({ classes, marketingData }) => {
    if (!marketingData) {
        return null;
    }
    const marketingStoreCollectionData = marketingData?.marketingComponentsCollection?.items?.[0] || [];
    const marketingDesktopMedia = marketingStoreCollectionData?.marketingComponentsCollection?.items?.[0]?.marketingComponentsCollection || {};
    const SpecialOfferCopy = marketingStoreCollectionData.title || '';
    return (
        <>
            <Grid container className={classes.serviceLocatorContainer}>
                <Grid className={classes.titleSection}>
                    <Grid className={classes.title}>
                        <Typography className={classes.specialOfferCopy}>{SpecialOfferCopy}</Typography>
                    </Grid>
                </Grid>
                
                <Grid container className={classes.specialOfferSection}>
                    {marketingDesktopMedia?.items.map((media) => (
                        <Grid item lg={6} className={classes.mobileSection}>
                            <img src={media.image.desktopMedia.url} alt="mixologist" className={classes.desktopMedia} />
                            <Typography className={classes.mediaSubtitle}>{media.subtitle}</Typography>
                            <Typography className={classes.shopLogist}>Shop Mixologist</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

LocatorMixoGlass.propTypes = {
    marketingData: object.isRequired,
    classes: object.isRequired,
};

export default (withStyles(styles)(LocatorMixoGlass));
