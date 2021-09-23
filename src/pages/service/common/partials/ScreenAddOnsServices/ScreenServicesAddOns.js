/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';
import {
    object,
} from 'prop-types';
import {
    withStyles,
} from '@material-ui/core';
import Media from 'react-media';
import MobileServicesAddOns from './MobileServicesAddOns/MobileServiceAddOns';
import DesktopServicesAddOns from './DesktopServicesAddOns/DesktopServicesAddOns';
import { MOBILE_BREAKPOINT, TABLET_BREAKPPOINT } from '../../../../../Helpers/breakpoints';

const styles = (theme) => ({
    container: {
        backgroundColor: '#F9F9F9',
        paddingBottom: '86px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT+1)]: {
            paddingBottom: '60px',
        },
    },
    bannerContainer: {
        background: '#FFFFFF',
        width: '100%',
        height: '390px',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down(TABLET_BREAKPPOINT+1)]: {
            height: '300px'
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            height: '229px',
        },
    },
    banner: {
        width: '1549px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT+1)]: {
            width: 'auto',
            height: '300px',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: 'auto',
            height: '229px',
        },
    },    
    addOnsTitle: {
        marginTop: '50px !important',
        fontFamily: 'DINCondensed',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '70px',
        lineHeight: '84px',
        textAlign: 'center',
        color: '#42413D',
        textTransform: 'uppercase',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '53px',
        },
    },
    headerSubTitle: {
        fontSize: '22px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: '0 10% !important',
            fontSize: '15px',
            lineHeight: '21px'
        },
    },
    addOnsTreatmentOffer: {
        fontFamily: 'AvenirNext',
        fontSize: '22px',
        lineHeight: '26px',
        textAlign: 'center',
        color: '#42413D',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '16px',
        },
    },
    fontWeight: {
        fontWeight: 'bold',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            marginTop: '10px !important',
            padding: '0 10% !important',
            fontSize: '15px',
            lineHeight: '21px'
        },
    },
    addOnsContainer: {
        marginTop: '30px',
        textAlign: 'center',
        marginBottom: '54px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '0px 25px 37px 25px',
        },
    },
    collectionCotainer: {        
        justifyContent: 'center',
        width: '1367px',
        margin: '0 auto !important',
        [theme.breakpoints.down(1367)]: {
            width: '100%',
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            display: 'block',
            padding: '0 10px !important'
        },
    },
    bookYourAddOns: {
        maxWidth: '365px',
        height: '763px',
        background: '#FFFFFF',
        margin: '10px 30px 18px',
        [theme.breakpoints.down(1367)]: {
            // height: '700px',
            // maxWidth: '275px',
            margin: '10px 30px 18px',
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            margin: '10px 30px 18px',
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            display: 'inline-block',
            height: '763px',
            margin: '10px 5px',
            maxWidth: '365px',
            width: 'calc(50% - 10px)',
            verticalAlign: 'top',
            justifyContent: 'top'
        },
        [theme.breakpoints.between(783, 1023)]: {
            display: 'inline-block',
            height: '763px',
            maxWidth: '50%',
            margin: '10px 30px 18px',
            width: 'calc(50% - 60px)',
            verticalAlign: 'top',
            justifyContent: 'top'
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            height: '570px',
        }
    },
    addOnsCopy: {
        fontFamily: 'DINCondensed',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '30px',
        lineHeight: '36px',
        textTransform: 'uppercase',
        color: '#42413D',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '25px',
            lineHeight: '30px'
        },
    },
    addOnsDetails: {
        margin: '35px 19px 10px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '7px 11px 16px 11px',
        },
    },
    addOnsDesc: {
        borderTop: '1px solid #D1D1D1',
        marginTop: '12px',
        // maxHeight: '128px',
    },
    addOnsDescServices: {
        borderTop: '1px solid #D1D1D1',
        marginTop: '12px',
        // maxHeight: '161px',
    },
    addOnsDescJson: {
        marginTop: '18px !important',
        fontFamily: 'AvenirNext',
        fontSize: '15px',
        lineHeight: '23px',
        color: '#42413D',
        width: '100%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '100%',
            fontSize: '16px',
            lineHeight: '19px',
        },
    },
    subtitle: {
        fontFamily: 'AvenirNext',
        fontSize: '15px',
        lineHeight: '28px',
        color: '#42413D',
    },
    displayflex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    addOnsTextBold: {
        fontFamily: 'AvenirNext',
        fontSize: '16px',
        lineHeight: '28px',
        color: '#42413D',
        fontWeight: 'bold',
    },
    bestForCopy: {
        fontFamily: 'AvenirNext',
        fontSize: '15px',
        lineHeight: '21px',
        color: '#42413D',
        fontWeight: '600',
        marginTop: '24px !important',
        textTransform: 'uppercase'
    },
    selected: {
        backgroundColor: theme.palette.primary.main,
        fontWeight: '800',
        '&:hover': {
            backgroundColor: theme.palette.common.hover[1],
        },
        height: '55px',
        margin: '0 20px',
        borderRadius: '0px',
        textTransform: 'capitalize',
        fontSize: '18px',
        width: 'calc(100% - 40px)',
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            margin: '0 10px',
            width: 'calc(100% - 20px)',
        }
    },
    borderAddOns: {
        borderBottom: '1px solid #D1D1D1',
        width: '91%',
        margin: '0px 0px 54px 75px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            width: '100%',
            margin: '0px 0px 47px 0px',
        },
    },
    imageAddOns: {
        padding: '7px',
        width: '100%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            
        },
    },
    margin: {
        margin: '8px 0px 0px 179px',
    },
    serviceTime: {
        position: 'relative',
        width: '100%',
        background: '#F9F9F9',
        borderTop: '1px solid #D1D1D1',
        marginTop: '21px',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15 ,
        [theme.breakpoints.between(600, 672)]: {
            padding: "15px 10px",
            flexDirection: "column !important",
        },
    },
    servicesTime: {
        fontFamily: 'AvenirNext',
        fontSize: '15px',
        lineHeight: '28px',
        color: '#42413D',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '13px !important',
        },
    },
    marginLeft: {        
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            marginLeft: '5px !important',
            float: 'right'
        },
    },
    marginServiceTime: {
        position: 'absolute',
        top: '15px',
        right: '10px',
        zIndex: '1000'
    },
    howWorksMargin: {
        margin: '19px 0px -16px 0px !important',
    },
    height: {
        height: '200px',
    },
    advertiseContainer: {
        margin: '0 auto !important',
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
        padding: '36px 0 69px',
        borderTop: '3px dashed #BDBDBD',
        [theme.breakpoints.down(TABLET_BREAKPPOINT + 1)]: {
            display: 'inline-block',
            margin: '19px 0px 0px 0px',
            padding: '36px 0 36px',
        },
    },
    advertiseImg: {
        width: '100%'
    },
    blowoutsBtnWrap: {
        justifyContent: 'center'
    },
    blowoutsBtn: {
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: '20px 57px !important'
        },
    },
    sliderDotsWrap: {
        marginTop: '-20px !important'
    },
    modalContent: {
        backgroundColor: "#F9F9F9",
        padding: "20px 10px"
    },
    customModal: {
        margin: 12  
    },
    slideSection: {
        marginBottom: 32
    },
    textCenter: {
        textAlign: "center",
        maxWidth: 270,
        margin: "0 auto 20px",
    },
    modalFlexItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "7px 14px",
        margin: "15px 0"
    },
    TitleIndex: {
        fontFamily: 'AvenirNext',
        fontSize: '15px',
        lineHeight: '21px',
        color: '#42413D',
        fontWeight: 600,
        marginBottom: 8
    },
    serviceDescription: {
        fontFamily: 'AvenirNext',
        fontSize: '15px',
        lineHeight: '22px',
        color: '#42413D',
        fontWeight: 400
    },
    descriptionItem: {
        marginBottom: 25
    },
    flexTitle: {
        fontFamily: 'AvenirNext',
        fontSize: '16px',
        lineHeight: '45px',
        color: '#42413D',
        fontWeight: 300
    },
    flexDescription: {
        fontFamily: 'AvenirNext',
        fontSize: '16px',
        lineHeight: '45px',
        color: '#42413D',
        fontWeight: 600
    },
    borderTop: {
        borderTop: "1px solid #D1D1D1"
    },
    backIcon: {
        position: "absolute",
        top: 23,
        zIndex: 1
    }
});

const ScreenServicesAndAddOnsCollection = ({
    classes, screenServicesAddOnsData,
}) => (
    <Media query={{ maxWidth: 599 }}>
        {(matches) => (matches ? (
            <MobileServicesAddOns classes={classes} screenServicesAddOnsData={screenServicesAddOnsData} />
        ) : (
            <DesktopServicesAddOns classes={classes} screenServicesAddOnsData={screenServicesAddOnsData} />
        )) }
    </Media>
);

ScreenServicesAndAddOnsCollection.propTypes = {
    screenServicesAddOnsData: object.isRequired,
    classes: object.isRequired,
};

export default withStyles(styles)(ScreenServicesAndAddOnsCollection);
