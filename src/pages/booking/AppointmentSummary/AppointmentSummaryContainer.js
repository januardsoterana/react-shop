/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import {
    Button, FormControl, Grid, Input, Typography, withStyles,
} from '@material-ui/core';
import {
    array, bool, func, object,
} from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
    getAddOnsServiceData, getLocationData, getSelectedDate, getSelectedSlot, getServicesData, getNotesMessage, getExtensions, getNumberOfGuests
} from '../../../state/ducks/Booking/Booking-Selectors';
import SummaryCard from './Partials/SummaryCard';
import { getDateStringMMDDYY, getTimeFromDate } from '../../../Helpers/dateTime';
import { getSpecialByCode } from '../../../api/booking-api'
import restClient from '../../../api/restClient';
import CancelIcon from '@material-ui/icons/Cancel';
import { setEditEnabled } from '../../../state/ducks/Booking/Booking-Actions';

/*
    Displays an Appointment Summary Card with
     - all selected options
     - Option to edit them
     - and estimated total price
*/

const styles = (theme) => ({
    container: {
        backgroundColor: '#fff',
        boxShadow: '2px 2px 46px rgba(235, 235, 235, 0.5)',
        padding: '26px 22px',
        minWidth: '422px',
        margin: '0 15px',
        width: '422px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    fullWidth: {
        backgroundColor: 'transparent',
        padding: '26px 22px',
        margin: '0 15px',
    },
    appointmentSummaryTitle: {
        fontSize: '16px',
        fontWeight: '600',
        textAlign: 'center',
        color: '#42413D',
        marginBottom: '15px !important',
    },
    cardsContainer: {
        borderTop: '1px solid #D1D1D1',
    },
    estimateCard: {
        display: 'flex',
        background: '#E5E5E5;',
        alignItems: 'center',
        padding: '22px 16px',
        justifyContent: 'space-between',
        marginTop: '24px',
    },
    price: {
        fontWeight: 800,
    },
    bigNextButton: {
        width: '100%',
        maxWidth: '100%',
        height: '63px',
        marginBottom: '37px',
        color: '#54575A',
        backgroundColor: '#FFDD30',
        '&:hover': {
            backgroundColor: '#b29a21',
        },
    },
    services: {
        display: 'flex',
        flexDirection: 'row',
    },
    serviceText: {
        width: '80%',
        marginRight: '15px',
    },
    priceText: {
        fontWeight: 800,
        marginLeft: '10px',
        color: '#42413D',
    },
    userText: {
        minWidth: '74px',
        fontSize: '18px',
    },
    promoCodeContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        margin: '20px 0',
    },
    promoCodeInput: {
        width: '100%',
    },
    applyPromoCode: {
        textTransform: 'none',
        margin: '0',
    },
    appointmentSummCopy: {
        fontSize: '18px',
        fontFamily: 'AvenirNext',
        color: '#42413',
    },
    displayContent: {
        display: "flex"
    },
    marginRight: {
        marginRight: "74% !important"
    },
    marginRight84: {
        marginRight: "81% !important"
    },
    couponNotValid: {
        background: "#e65146",
        color: "white",
        textAlign: "center",
        padding: "7px !important",
        marginTop: "19px !important"
    },
    couponValid: {
        background: "#4CAF50",
        color: "white",
        textAlign: "center",
        padding: "7px !important",
        marginTop: "19px !important",
        display: "flex"
    },
    // disabled: {
    //     background: "yellow"
    // }
});

const AppointmentSummaryContainer = ({
    location,
    locationStore,
    classes,
    nextButtonEnabled,
    onButtonClick,
    selectedServices,
    fullWidth,
    showPromoCode,
    addons,
    slot,
    dateTime,
    getSavedNoteMessage,
    extensions,
    guests
}) => {
    // const [estimatedTotal, setEstimatedTotal] = useState(0);
    const [discountAmount, setDiscountAmnt] = useState(0);
    const [promoMessage, setPromoMessage] = useState("");
    const [isSuccess, setIsSucess] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const isAccountAppointmentDetails = location?.pathname?.includes('appointment-details');
    const [promoValue, setPromoValue] = useState("")
    const isAppointmentReview = location?.pathname?.includes('/booking/review');

    let estimatedTotal = selectedServices.reduce((s, cur) => {
        s += cur?.data?.Price?.Amount
        return s
    }, 0)


    if (extensions && extensions !== true) {
        estimatedTotal += Object.keys(extensions).reduce((s, cur) => s + (extensions[cur] ? 20 : 0), 0)
    }

    if (extensions) estimatedTotal += (guests + 1) * 20

    const applyPromoCode = async () => {
        const res = await restClient.post(getSpecialByCode(promoValue));
        console.log(res.data)
        if (res.data.IsSuccess) {
            setDiscountAmnt(res.data.DiscountAmount)
            setPromoMessage(res.data.Name)
            setIsSucess(true)
            setIsFail(false)
        } else {
            setPromoMessage(res.data.ArgumentErrors[0].ErrorMessage)
            setIsFail(true)
            setIsSucess(false)
        }
    }

    const handlePromoChange = (event) => {
        setPromoValue(event.target.value)
    }

    const cancelPromoCode = () => {
        setIsSucess(false)
        setDiscountAmnt(0)
        setPromoValue("")
    }

    return (
        <Grid className={fullWidth ? classes.fullWidth : classes.container}>
            {nextButtonEnabled ? (
                <Button
                    variant="contained"
                    // color="secondary"
                    onClick={onButtonClick}
                    className={classes.bigNextButton}
                >
                    Next
                </Button>
            ) : null}
            <Typography className={classes.appointmentSummaryTitle}>
                Appointment Summary
            </Typography>
            {
                // Location Card
                locationStore?.title
                    ? (
                        <Grid className={classes.cardsContainer}>
                            <SummaryCard editClickPath="/booking/location" heading="Location" classes={classes} isAccountAppointmentDetails={isAccountAppointmentDetails}>
                                <Typography>
                                    {locationStore.title}
                                </Typography>
                            </SummaryCard>
                        </Grid>
                    ) : null
            }
            {
                // Services Card
                selectedServices?.length
                    ? (
                        <SummaryCard editClickPath="/booking/services" classes={classes} heading={`Service${selectedServices?.length > 1 ? 's' : ''}`}>
                            {selectedServices?.length > 1 ? selectedServices.map((service) => (
                                <Grid className={classes.services}>
                                    <Typography className={classes.userText}>
                                        {service?.user}
                                    </Typography>
                                    <Grid className={`${classes.services} ${classes.serviceText}`}>
                                        <Typography style={{ display: 'flex' }}>
                                            <span className={classes.appointmentSummCopy}>{service.data?.Name}</span>
                                            <span className={classes.priceText}>{` ($${service.data?.Price?.Amount})`}</span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))
                                : (
                                    <Typography style={{ display: 'flex' }}>
                                        <span className={classes.appointmentSummCopy}>{selectedServices?.[0].data?.Name}</span>
                                        <span className={classes.priceText}>{` ($${selectedServices?.[0]?.data?.Price?.Amount})`}</span>
                                    </Typography>
                                )}
                        </SummaryCard>
                    ) : null
            }
            {
                // Addons card
                addons?.length
                    ? (
                        <SummaryCard editClickPath="/booking/addons" classes={classes} heading={`Add-on${addons?.length > 1 ? 's' : ''}`}>
                            {addons?.length > 1 ? addons.map((addon) => (
                                <Grid className={classes.services}>
                                    <Typography className={classes.userText}>
                                        {addon?.user}
                                    </Typography>
                                    <Grid>
                                        {addon.data.map((addonData) => (
                                            <Grid className={`${classes.services} ${classes.serviceText}`}>
                                                <Typography style={{ display: 'flex' }}>
                                                    <span className={classes.appointmentSummCopy}>{addonData.Name}</span>
                                                    <span className={classes.priceText}>{` ($${addonData.Price.Amount || '10'})`}</span>
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            ))
                                : (
                                    addons?.[0]?.data?.map((addon) => (
                                        <>
                                            <Typography style={{ display: 'flex' }}>
                                                <span className={classes.appointmentSummCopy}>{addon.Name}</span>
                                                <span className={classes.priceText}>
                                                    {` ($${addon.Price.Amount || '10'})`}
                                                </span>
                                            </Typography>
                                        </>
                                    ))
                                )}
                        </SummaryCard>
                    ) : null
            }
            {
                extensions && extensions !== true && <SummaryCard editClickPath="/booking/addons" classes={classes} heading={`Extensions`}>
                    {
                        Object.keys(extensions).filter(k => extensions[k]).map((k) => <Grid className={classes.services} key={k}>
                            <Typography className={classes.userText}>
                                {k}
                            </Typography>
                            <Grid>
                                <span className={classes.appointmentSummCopy}>Yes</span>
                                <span className={classes.priceText}>($20)</span>
                            </Grid>
                        </Grid>)
                    }
                </SummaryCard>
            }
            {
                extensions === true && <SummaryCard editClickPath="/booking/addons" classes={classes} heading={`Extensions`}>
                    {
                        <Grid>
                            <span className={classes.appointmentSummCopy}>Yes</span>
                            <span className={classes.priceText}>($20)</span>
                        </Grid>
                    }
                </SummaryCard>
            }
            {
                // Date and time
                slot?.startDateTime?.length && dateTime?.length
                    ? (
                        <SummaryCard classes={classes} editClickPath="/booking/select-date" heading="Date & Time">
                            <Typography>
                                {`${getDateStringMMDDYY(new Date(dateTime))} at ${getTimeFromDate(slot.startDateTime)}`}
                            </Typography>
                        </SummaryCard>
                    )
                    : null
            }

            {
                showPromoCode ? (
                    <FormControl fullWidth className={classes.promoCodeContainer}>
                        <Input
                            id="standard-adornment-amount-1"
                            value={promoValue}
                            onChange={(event) => handlePromoChange(event)} // this will use in future when data come from API
                            startAdornment=""
                            className={classes.promoCodeInput}
                            placeholder="Promo Code"
                            disabled={isSuccess ? true : false}
                            classes={{
                                disabled: classes.disabled
                            }}
                        />
                        <Button className={classes.applyPromoCode} variant="contained" color="secondary" onClick={() => applyPromoCode()}>
                            Apply
                        </Button>
                    </FormControl>
                ) : null
            }

            {/* // will refactor below code in future */}
            {!isAppointmentReview ? (
                <Grid className={classes.estimateCard}>
                    <Typography >
                        Estimated Total *
                    </Typography>
                    <Typography c className={classes.price}>
                        {`$${estimatedTotal}`}
                    </Typography>
                </Grid>
            ) : (
                    <>
                        <Grid container className={classes.estimateCard}>
                            <Grid item xs={12} className={classes.displayContent}>
                                <Typography className={classes.marginRight}>
                                    Estimated Total *
                                </Typography>
                                <Typography c className={classes.price}>
                                    {`$${estimatedTotal}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.displayContent}>
                                <Typography className={classes.marginRight84}>
                                    Discount *
                        </Typography>
                                <Typography c className={classes.price}>
                                    ${(estimatedTotal / 100) * discountAmount}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.displayContent}>
                                <Typography className={classes.marginRight84}>
                                    Net Total *
                        </Typography>
                                <Typography c className={classes.price}>
                                    ${discountAmount > 0 ? estimatedTotal - (estimatedTotal / 100) * discountAmount : `${estimatedTotal}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                )
            }

            {isFail && (
                <Grid className={classes.couponNotValid}>
                    <Typography >{promoMessage}</Typography>
                </Grid>
            )}

            {isSuccess && (
                <Grid className={classes.couponValid}>
                    <Typography style={{ margin: "0 auto" }}>{promoMessage} Coupon Applied</Typography>
                    <CancelIcon style={{ cursor: "pointer" }} onClick={() => cancelPromoCode()} />
                </Grid>
            )}
        </Grid>
    );
};

AppointmentSummaryContainer.propTypes = {
    locationStore: object.isRequired,
    classes: object.isRequired,
    nextButtonEnabled: bool.isRequired,
    onButtonClick: func.isRequired,
    selectedServices: array.isRequired,
};

const mapStateToProps = (state) => ({
    locationStore: getLocationData(state),
    services: getServicesData(state),
    selectedServices: getServicesData(state),
    addons: getAddOnsServiceData(state),
    slot: getSelectedSlot(state),
    dateTime: getSelectedDate(state),
    getSavedNoteMessage: getNotesMessage(state),
    extensions: getExtensions(state),
    guests: getNumberOfGuests(state)
});

const enhance = compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps),
);

export default enhance(AppointmentSummaryContainer);
