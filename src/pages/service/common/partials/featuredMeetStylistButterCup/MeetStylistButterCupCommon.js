/* eslint-disable max-len */
import React from 'react';
import { object } from 'prop-types';
import {
    Grid, Typography, withStyles,
} from '@material-ui/core';
import CommonFeaturedMeetStylistButterCup from './FeaturedStylistButterCup';
import { MOBILE_BREAKPOINT, TABLET_BREAKPPOINT } from '../../../../../Helpers/breakpoints';
import butterCupAd from '../../../../../assets/images/butter-cup-ad.png';

const styles = (theme) => ({
    container: {
        backgroundColor: '#F9F9F9'
    },
    heroBannerContainer: {
        background: '#FFFFFF',
        width: '100%',
        height: '390px',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            height: '300px',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            height: '229px',
        },
    },
    stylistHeroBanner: {
        width: '1549px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            width: 'auto',
            height: '300px',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: 'auto',
            height: '229px',
        },
    },
    meetOurCopy: {
        fontFamily: 'DINCondensed',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '102px',
        lineHeight: '122px',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#5F5E5B',
        marginTop: '-248px !important',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            fontSize: '67px',
            marginTop: '-210px !important',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '37px',
            marginTop: '-170px !important',
        },
    },
    featuredStyleCopy: {
        fontFamily: 'DINCondensed',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '42px',
        lineHeight: '50px',
        textTransform: 'uppercase',
        color: '#42413D',
        margin: '20px 11px 0px -19px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '20px 11px 0px 14px',
            fontSize: '30px',
            lineHeight: '30px',
        },
    },
    featuredStylistContainer: {
        background: '#ffffff',
        width: '1549px',
        margin: '30px 0px 0px -21px',
        padding: '15px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            padding: '20px',
            width: '100%',
            margin: '19px 0px 0px 0px',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: '20px',
            width: '100%',
            display: 'inline-block',
            margin: '19px 0px 0px 0px',
        },
    },
    stylistBioContainer: {
        margin: '12px 0px 0px 69px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            margin: '-2px 0px 0px 20px',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '-2px 0px 0px 0px',
            maxWidth: '100%',
        },
    },
    featuredStyleName: {
        fontFamily: 'AvenirNext',
        fontSize: '20px',
        lineHeight: '45px',
        fontWeight: '600',
        color: '#42413D',
        textTransform: 'uppercase',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            lineHeight: '45px',
        },
    },
    featuredStyleBioDetails: {
        fontFamily: 'AvenirNext',
        fontSize: '20px',
        lineHeight: '34px',
        color: '#42413D',
        width: '105%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '100%',
            fontSize: '15px',
            lineHeight: '22px',
        },
    },
    displayFlex: {
        display: 'flex',
        marginTop: '31px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            marginTop: '15px',
        },
    },
    instagramIcon: {        
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '13px'
        },
    },
    instagramHandlerId: {
        fontFamily: 'AvenirNext',
        fontSize: '20px',
        lineHeight: '45px',
        margin: '2px 0px 0px 21px !important',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '2px 0px 0px 10px !important',
            fontSize: '15px',
            lineHeight: '20px',
        },
    },
    marginAuto: {
        margin: '40px auto 30px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            margin: '20px auto 25px',
            padding: '0 20px'
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '20px auto 25px',
            padding: '0 20px'
        },
    },
    featuredImage: {
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            width: '100%',
        }
    },
    advertiseContainer: {
        margin: '0 auto',
        width: '1549px',
        [theme.breakpoints.down(1549)]: {
            width: '100%'
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            width: '100%',
            padding: '0 20px',
        },
    },
    advertiseImgWrap: {
        width: '100%',
        margin: '40px 0 0',
        padding: '36px 0 86px',
        borderTop: '3px dashed #BDBDBD',
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            display: 'inline-block',
            margin: '19px 0px 0px 0px',
            padding: '36px 0 60px',
        },
    },
    advertiseImg: {
        width: '100%'
    }
});

// this is common component for meet our stylist and butter-cup
const MeetOurStylist = ({ classes, meetStylistData }) => {
    if (!meetStylistData) {
        return null;
    }
    const meetStylistHeroBanner = meetStylistData?.marketingComponentsCollection?.items?.[0]?.marketingComponentsCollection?.items?.[0]?.image || [];
    const stylistCollection = meetStylistData?.stylistsCollection?.items || [];

    return (
        <Grid container className={classes.container}>
            <Grid className={classes.heroBannerContainer}>
                <div>
                    <img src={meetStylistHeroBanner.desktopMedia.url} alt={meetStylistHeroBanner.title} className={classes.stylistHeroBanner} />
                    <Typography className={classes.meetOurCopy}>{meetStylistData.title}</Typography>
                </div>
            </Grid>
            <Grid className={classes.marginAuto}>
                <Typography className={classes.featuredStyleCopy}>{meetStylistData.featuredHeading}</Typography>
                {stylistCollection.map((item) => (
                    <CommonFeaturedMeetStylistButterCup featuredStylistData={item} classes={classes} /> // this is common featured stylist component for meet our stylist and butter-cup
                ))}

            </Grid>
            <Grid className={classes.advertiseContainer}>
                <Grid container>
                    <Grid>
                        <Grid container className={classes.advertiseImgWrap}>
                            <img src={butterCupAd} className={classes.advertiseImg}></img>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

MeetOurStylist.propTypes = {
    meetStylistData: object.isRequired,
    classes: object.isRequired,
};

export default withStyles(styles)(MeetOurStylist);
