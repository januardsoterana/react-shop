/* eslint-disable max-len */
import {
    Box,
    Grid, Typography, withStyles, Button,
    DialogTitle, Dialog, DialogContent, Checkbox,
} from '@material-ui/core';
import { object } from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CloseIcon from '@material-ui/icons/Close';
import {MOBILE_BREAKPOINT} from '../../../Helpers/breakpoints';

import {doQuery} from "../../../state/utils/contentful";
import {
    getBarflyMembershipPrice,
    getChosenStore,
    getUpdatedCustomer,
    getNewCard
} from "../../../state/ducks/Barfly/Barfly-Selectors";
import {setUpdatedCustomer, setCard} from "../../../state/ducks/Barfly/Barfly-Actions";
import useFetch, {useFetchAsync} from "../../../Helpers/useFetch";
import {
    addMembershipToOrder,
    createOrder,
    getAddOnsData,
    updateCustomer,
    addCreditCardCustomer,
    findCustomerMemberships
} from "../../../api/booking-api";
import {toast, ToastContainer} from "react-toastify";
import {
    Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import {withRouter} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import markerIcon from '../../../assets/images/inactiveMarker.svg';
import restClient from '../../../api/restClient';

const styles = (theme) => ({
    container: {
        maxWidth: '1367px',
        width: '100%',
        margin: 'auto',
        padding: '53px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: '19px',
        },

    },
    mainTitle: {
        textTransform: 'uppercase',
        fontFamily: 'DINCondensed',
        fontSize: '42px',
        color: '#42413D',
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
        lineHeight: '51px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '31px',
            width: '79%',
            lineHeight: '37px',
        },
    },
    titleContainer: {
        display: 'flex',
    },
    displayFlex: {
        display: 'flex',
        alignItems: 'center',
        color: '#42413D',
    },
    subTitle: {
        textAlign: 'center',
        fontSize: '18px',
        marginBottom: '25px',
        fontWeight: '400',
        textTransform: 'none',
        fontFamily: 'AvenirNext',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
        },
    },
    submitButton: {
        maxWidth: '378px',
        width: '100%',
        height: '63px',
        fontSize: '18px',
        margin: '91px 0px 110px 450px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '36px 0px 64px 4px',
        },
    },
    summaryContainer: {
        borderRadius: '0px',
        backgroundColor: '#FFFFFF',
        padding: '28px 35px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            backgroundColor: '#F9F9F9',
            height: '203px',
        },
    },
    summaryTitle: {
        fontFamily: 'MrsEavesSmallCaps',
        fontSize: '25px',
        lineHeight: '45px',
        textTransform: 'uppercase',
        color: '#42413D',
        margin: '28px 0px 0px 36px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            whiteSpace: 'nowrap',
            margin: '0px',
        },
    },
    membershipCharge: {
        display: 'flex',
        alignItems: 'flex-start',
        margin: '16px 0'
    },
    theFinePrint: {
        width: '1269px',
        borderRadius: '0px',
        backgroundColor: '#FFFFFF',
        marginTop: '5px',
        marginBottom: '40px',
        padding: '28px 35px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '365px'
        },
    },
    finePrintCopy: {
        fontFamily: 'AvenirNext',
        fontSize: '17px',
        lineHeight: '32px',
        color: '#42413D',
        padding: '25px 25px 0px 25px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            lineHeight: '22px',
        },
    },
    finePrintHeading: {
        fontFamily: 'MrsEavesSmallCaps',
        fontSize: '20px',
        lineHeight: '45px',
        color: '#42413D',
        marginTop: '24px !important',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            lineHeight: '22px',
            marginLeft: '2px',
        },
    },
    slashVector: {
        margin: '0 20px 0 25px',
        content: '""',
        height: '45px',
        transform: 'rotate(20deg)',
        borderRight: '2px solid #42413D',
        // position: 'absolute',
        '&::after': {},
    },
    serviceChargeCotainer: {
        display: 'flex',
        justifyContent: 'center',
        flex: '1',
        height: '197px',
        borderRadius: '0px',
        backgroundColor: '#F7F8F9',
        borderTop: '1px solid #D1D1D1',
        alignItems: 'center',

        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            backgroundColor: '#FFFFFF',
            height: '136px',
            borderRadius: '0px'
        },
    },
    servicePriceCopy: {
        border: '1px solid #FFFFFF',
        background: '#FFFFFF',
        boxShadow: '2px 2px 46px rgba(235, 235, 235, 0.5)',
        borderRadius: '50%',
        fontSize: '32px',
        lineHeight: '34px',
        fontWeight: '600',
        color: '#42413D',
        fontFamily: 'AvenirNext-Bold',
        display: 'flex',
        alignItems: 'center',
        width: '130px',
        height: '130px',
        letterSpacing: '-2px',
        justifyContent: 'center',

        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            background: '#F7F8F9',
            width: '76px',
            borderWidth: '0px',
            padding: '12px',
        },

    },
    serviceChargeData: {
        display: 'flex',
        position: 'relative',
        margin: '33px 0px',
        alignItems: 'center',

        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '11px 0px 0px 5px',
        },
    },
    taxApplicable: {
        fontFamily: 'AvenirNext',
        fontSize: '18px',
        lineHeight: '34px',
        color: '#767676',
        margin: '0 0 0 11px',
    },
    monthCopy: {
        fontSize: '25px',
        lineHeight: '34px',
        fontWeight: '600',
        color: '#42413D',
        fontFamily: 'AvenirNext',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '18px',
        },
    },
    drybarLocation: {
        fontFamily: 'AvenirNext',
        fontSize: '18px',
        lineHeight: '34px',
        color: '#42413D',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            lineHeight: '24px',
        },
    },
    locationDetails: {
        height: '197px',
        borderRadius: '0px',
        backgroundColor: '#F7F8F9',
        borderTop: '1px solid #D1D1D1',
        margin: '0 15px 0 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '15px',

        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            backgroundColor: '#FFFFFF',
            height: '136px',
            borderRadius: '0px'
        },
    },
    confirmedMap: {
        width: '195px',
        height: 'auto',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '134px',
        },
    },
    bookYourAppointmentToday: {
        maxWidth: '378px',
        width: '100%',
        height: '63px',
        fontSize: '18px',
        margin: '20px auto 40px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            maxWidth: '318px',
            height: '55px',
            fontSize: '15px',
            margin: '10px auto 30px',
        },
    },
    thankYouDesc: {
        borderTop: '1px solid #D1D1D1',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '90%',
            margin: '0px 13px 0px 22px',
        },
    },
    thankYouHeading: {
        fontFamily: 'DINCondensed',
        fontWeight: '700',
        fontSize: '34px',
        lineHeight: '41px',
        textTransform: 'uppercase',
        color: '#42413D',
        width: '100%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '251px',
            fontSize: '30px',
            lineHeight: '34px',
        },
    },
    dialogContainer: {
        maxWidth: 890,
        minWidth: 626,
        height: 500,
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            height: 703,
        },
    },
    copyDetails: {
        fontFamily: 'AvenirNext',
        fontSize: '16px',
        lineHeight: '32px',
        color: '#42413D',
        marginTop: '10px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            marginTop: '2px',
            lineHeight: '22px',
            marginLeft: '-23px',
        },
    },
    closeIcon: {
        margin: '20px 0px 0px 30%',
        cursor: 'pointer',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '34px 0px 0px 1%',
        },
    },
    backPageCopy: {
        fontSize: '16px',
        fontWeight: '600',
        paddingTop: '2px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            display: 'none',
        },
    },
    modalContainer: {
        background: 'rgba(255, 255, 255, 0.94)'
    },
    mapInfo: {
        height: '197px',
        width: '180px'
    }
});


const mapStyle = [
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36,
            },
            {
                color: '#333333',
            },
            {
                lightness: 40,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 17,
            },
            {
                weight: 1.2,
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'landscape.natural.landcover',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'landscape.natural.terrain',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#dedede',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#b1f1bb',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 29,
            },
            {
                weight: 0.2,
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 18,
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f2f2f2',
            },
            {
                lightness: 19,
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e9e9e9',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#ade8ff',
            },
        ],
    },
];
const mapStyles = {
    width: '100%',
    height: '100%',
};
const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderTop: '1px solid #d1d1d1'
};

// TODO make this component dynamic - remove repetition
const BarflyConfirmPage = ({ classes, barflyConfirmData, membershipPrice, preferredShop, google, updatedCustomer, newCard, setCustomer, setNewCard, history }) => {
    const [open, setOpen] = React.useState(false)
    const price = membershipPrice || 0

    const [firstCheckboxData, setFirstCheckData] = React.useState('');
    const [secondCheckboxData, setSecondCheckData] = React.useState('');
    const [confirmationData, setConfirmationData] = React.useState('');
    const [firstChecked, setFirstChecked] = React.useState(false);
    const [secondChecked, setSecondChecked] = React.useState(false);

    const finePrintCollection = barflyConfirmData?.finePrint?.json?.content || [];
    const thankYouCollection = barflyConfirmData?.thankYou?.json?.content || [];

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const gplQuery = `{
        channelResourceCollection(where: {slug: "barfly-configurations"}) {
            items {
                sys {
                id
                }
                configuration
            }
        }
    }`
    useEffect(() => {
        doQuery(gplQuery).then(data => {
            const channelResourceItem = data?.channelResourceCollection?.items || [];
            if (channelResourceItem && channelResourceItem.length > 0) {
                setFirstCheckData((channelResourceItem[0].configuration?.barfly?.checkbox_one || '').replace('${price}', '$' + price));
                setSecondCheckData((channelResourceItem[0].configuration?.barfly?.checkbox_two || '').replace('${price}', '$' + price));
                setConfirmationData((channelResourceItem[0].configuration?.barfly?.confirmation_text || '').replace('${price}', '$' + price));
            }
        });
        // getCustomerMemberships();

        return () => {
            setCustomer(null);
            setNewCard(null);
        }
    }, []);


    // const getCustomerMemberships = async () => {
    //     const storeLocationId = updatedCustomer.LocationID
    //     const {data} = await restClient.post(findCustomerMemberships(updatedCustomer.ID, storeLocationId))

    //     if (data?.IsSuccess) {
    //         let memberships = data.Results || [];
    //         memberships = memberships.sort((m1, m2) =>
    //             m1.MembershipBillableItem?.Price?.Amount - m2?.MembershipBillableItem?.Price?.Amount)
    //         setMemberships(memberships);
    //     }
    // };


    const onCompleteMembership = async () => {
        // createOrder

        const { data, error } = await useFetchAsync(createOrder(updatedCustomer.ID));

        if (error) {
            console.log(error);
        }

        if (data) {
            const orderId = data?.Order?.ID || '';
            const locationId = preferredShop.bookerLocationId;

            // add membership to order
            const { data: data1, error: error1 } = await useFetchAsync(addMembershipToOrder({ orderId, locationId }));
            if (error1) {
                console.log(error1);
            }

            if (data1?.IsSuccess) {
                await restClient.post(updateCustomer(updatedCustomer))

                if (newCard && newCard.Number) {
                    await restClient.post(addCreditCardCustomer(newCard.Number, newCard.SecurityCode, updatedCustomer.ID, newCard.NameOnCard))
                }

                handleClickOpen();
            } else {
                if (data1.ArgumentErrors) {
                    toast(data1.ArgumentErrors[0].ErrorMessage, {
                        position: "bottom-right",
                    })
                } else {
                    toast('Something went wrong. Please try later.',{
                        position: "bottom-right",
                    });
                }
            }
        }
    }

    const _mapLoaded = (mapProps, map) => {
        map.setOptions({
            styles: mapStyle,
        });
    };

    // map center pos
    let initialCenter = {
        lat: preferredShop?.contact?.coordinates?.[0],
        lng: preferredShop?.contact?.coordinates?.[1],
    }

    if (!updatedCustomer) {
        history.push('/barfly-membership-enrollment')
    }

    return (
        <Grid className={classes.container}>
            <Grid className={classes.titleContainer}>
                <Grid style={{ paddingTop: '12px' }}>
                    <Link to="/barfly-membership-enrollment" className={classes.displayFlex}>
                        <ArrowBackIosIcon style={{ fontSize: '34px' }} />
                        <Typography className={classes.backPageCopy}>Back</Typography>
                    </Link>
                </Grid>
                <Typography className={classes.mainTitle}>
                    Let’s confirm your details
                    {' '}
                    <Box className={classes.subTitle}>
                        and finalize your barfly membership
                    </Box>
                </Typography>
            </Grid>
            <Grid container className="justify-content-between">
                <Grid item xs={6} style={{ paddingRight: '25px' }}>
                    <Grid item className={classes.summaryContainer}>
                        <Typography className={classes.summaryTitle}>
                            Summary of Charges
                        </Typography>
                        <Grid className={classes.membershipCharge}>
                            <Grid className={classes.serviceChargeCotainer}>
                                <Grid className={classes.serviceChargeData}>
                                    <Box className={classes.servicePriceCopy}>
                                        ${price}
                                    </Box>
                                    <Box className={classes.slashVector} />
                                    <Box className={classes.monthCopy}>
                                        month
                                    </Box>
                                    <Box className={classes.taxApplicable}>
                                        + tax (where applicable)
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6} style={{ paddingLeft: '25px' }}>
                    <Grid item className={classes.summaryContainer}>
                        <Typography className={classes.summaryTitle}>
                            Prefered Shop
                        </Typography>
                        <Grid className={`${classes.membershipCharge}`}>
                            <Grid className={classes.locationDetails}>
                                <Typography className={classes.drybarLocation}
                                            style={{
                                                fontWeight: '600',
                                                fontSize: '20px',
                                                lineHeight: '28px'
                                            }}>{preferredShop.title}</Typography>
                                <Typography className={classes.drybarLocation}
                                    style={{ fontSize: '16px', lineHeight: '20px', marginTop: '15px' }}>
                                    {preferredShop.contact?.street1 + ' ' + preferredShop.contact?.city + ', '
                                        + preferredShop.contact?.state + ' ' + preferredShop.contact?.postalCode}
                                </Typography>
                            </Grid>
                            <Grid className={classes.mapInfo}>
                                <Map
                                    google={google}
                                    containerStyle={containerStyle}
                                    zoom={14}
                                    style={mapStyles}
                                    initialCenter={
                                        initialCenter
                                    }
                                    center={initialCenter}
                                    // bounds={bounds}
                                    onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
                                >
                                    <Marker
                                        title={preferredShop?.contact?.street1}
                                        name={preferredShop?.title}
                                        position={initialCenter}
                                        icon={markerIcon}
                                        style={{margin: '-51px 0px -12px 155px'}}

                                    />
                                </Map>
                                {/* <img src={preferredShop.mapImage?.url} alt="confirmed-map"
                                     className={classes.confirmedMap}/> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Typography className={classes.finePrintHeading}>
                THE FINE PRINT
            </Typography>
            <Grid className={classes.theFinePrint}>
                {finePrintCollection.map((fineItems) => (
                    fineItems.content.map((items) => (
                        <Typography className={classes.finePrintCopy}>{items.value}</Typography>
                    ))
                ))}

                <Grid className="checkbox-container">
                    <Typography className="confirmation-section">{confirmationData}</Typography>
                    <Grid className="checkbox-section">
                        <Checkbox
                            checked={secondChecked}
                            onClick={() => setSecondChecked(!secondChecked)}
                            className="checkbox" />
                        <Typography>{secondCheckboxData}</Typography>
                    </Grid>
                    <Grid className="checkbox-section">
                        <Checkbox
                            checked={firstChecked}
                            onClick={() => setFirstChecked(!firstChecked)}
                            className="checkbox" />
                        <Typography>{firstCheckboxData}</Typography>
                    </Grid>
                </Grid>

            </Grid>

            <Button variant="contained" color="primary" className={classes.submitButton} onClick={() => {
                onCompleteMembership();
            }}>
                Complete Membership
            </Button>
            <ToastContainer hideProgressBar={true} position="top-right"/>
            <Grid>
                <Dialog
                    maxWidth="md"
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                    open={open}
                    classes={{
                        paperWidthMd: classes.dialogContainer,
                        container: classes.modalContainer,
                    }}
                >
                    <Grid style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 24 }}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            <Typography className={classes.thankYouHeading}>
                                {thankYouCollection[0].content[0].value}
                            </Typography>
                        </DialogTitle>
                        <CloseIcon onClick={handleClose} className={classes.closeIcon} />
                    </Grid>

                    <DialogContent className={classes.thankYouDesc}>
                        {thankYouCollection.map((thanksItems) => (
                            thanksItems?.content?.map((items) => (
                                <Typography className={classes.copyDetails}>
                                    {items.value}
                                </Typography>
                            ))
                        ))}
                    </DialogContent>
                    <Button variant="contained" color="primary" className={classes.bookYourAppointmentToday}
                            onClick={() => {
                                location.href = "/booking/location"
                            }}>
                        Book Your Appointment Today
                    </Button>
                </Dialog>
            </Grid>
        </Grid>
    );
};

BarflyConfirmPage.propTypes = {
    classes: object.isRequired,
    barflyConfirmData: object.isRequired,
    google: object,
};

BarflyConfirmPage.defaultProps = {
    google: {},
};

const mapDispatchToProps = (dispatch) => ({
    setCustomer: bindActionCreators(setUpdatedCustomer, dispatch),
    setNewCard: bindActionCreators(setCard, dispatch)
});

const mapStateToProps = (state) => ({
    membershipPrice: getBarflyMembershipPrice(state),
    preferredShop: getChosenStore(state),
    updatedCustomer: getUpdatedCustomer(state),
    newCard: getNewCard(state)
});


// export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withOktaAuth(BarflyConfirmPage)));
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GoogleApiWrapper({
    apiKey: 'AIzaSyDKfzUhxvQz6v6Meo34CYtav4M2X-Wmx6I',
})(withStyles(styles)(BarflyConfirmPage))))