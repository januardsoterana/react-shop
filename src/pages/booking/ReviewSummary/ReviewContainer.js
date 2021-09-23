/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState, useEffect} from 'react';
import {
    Button, Grid, Checkbox, withStyles, Typography, Backdrop, CircularProgress,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { object } from 'prop-types';
import { compose } from 'recompose';
import { withOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SectionTitle from '../../../app/Components/SectionTitle';
import AppointmentSummaryContainer from '../AppointmentSummary/AppointmentSummaryContainer';
import { createAppointment } from '../../../api/booking-api';
import restClient from '../../../api/restClient';
import { getIsEditEnabled, getSelectedSlot, getServicesDataFormatted, getLocationData,getAvailableEmpId,getAvailableRoomId } from '../../../state/ducks/Booking/Booking-Selectors';
import { clearBookingDetails } from '../../../state/ducks/Booking/Booking-Actions';

const useStyles = () => ({
    summaryCopy: {
        textAlign: 'center',
        fontFamily: 'AvenirNext',
    },
    requestNoteDetails: {
        float: 'right',
        background: '#FFFFFF',
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
        maxWidth: '754px',
        margin: 'auto',
    },
    nextClick: {
        fontSize: '18px',
        lineHeight: '45px',
        textTransform: 'none',
        width: '378px',
        maxWidth: '100%',
        height: '63px',
        margin: 'auto',
        color: '#54575A',
        backgroundColor: '#FFDD30',
        '&:hover': {
            backgroundColor: '#b29a21',
        },
    },
    haveAnyRequest: {
        fontFamily: 'DINCondensed',
        fontSize: '39px',
        textTransform: 'uppercase',
        color: '#42413D',
    },
    requestServiceContainer: {
        background: '#F9F9F9',
    },
    locationSummary: {
        background: '#F9F9F9',
    },
    locationCopy: {
        fontFamily: 'sans-serif',
        fontSize: '15px',
    },
    locationName: {
        fontFamily: 'sans-serif',
        width: '86%',
    },
    editLocationSummary: {
        width: '100%',
        display: 'inline-flex',
    },
    editLocationIcon: {
        cursor: 'pointer',
    },
    promoCodeInput: {
        width: '86%',
    },
    applyPromoCode: {
        width: '79px',
        background: '#54575A',
        borderRadius: '0px',
        color: '#FFFFFF',
        fontSize: '13px',
    },
    estimatedTotal: {
        width: '97%',
        display: 'inline-flex',
        background: '#E5E5E5;',
    },
    estimatedCopy: {
        width: '100%',
        fontFamily: 'sans-serif',
        color: '#42413D',
    },
    estimatedPrice: {
        width: '10%',
        float: 'right',
        fontFamily: 'sans-serif',
    },
    cancellationPolicy: {
    },
    cancellationPolicyIcon: {
        marginRight: '14px',
    },
    cancellationPolicyCopy: {
        fontFamily: 'AvenirNext',
        fontSize: '16px',
    },
    cancellationPolicyDetail: {
        fontFamily: 'AvenirNext',
        fontSize: '14px',
    },
    understandPolicy: {
    },
    notChangeCopy: {
        textAlign: 'center',
        fontFamily: 'AvenirNext',
        fontSize: '13px',
        margin: '30px 0',
    },
    atBottomBorder: {
        borderBottom: '1px solid #D1D1D1',
        width: '94%',
    },
    barflyBottomCopy: {
        fontFamily: 'AvenirNext',
        fontSize: '15px',
        padding: '25px 0',
    },
    content: {
        margin: '15px 37px',
        display: 'flex',
        flexDirection: 'column',
    },
    textContainer: {
        display: 'flex',
    },
    checkbox: {
        padding: '0',
        marginRight: '14px',
    },
    checkboxContainer: {
        margin: '30px 0',
    },
    cancellationPolicyContainer: {
        margin: '10px 0',
    },
    backdrop: {
        zIndex: 11,
        color: '#fff',
    },
    appointmentErrorMessage: {
        border: "1px solid",
        background: "red",
        color: "white",
        padding: "13px"
    }
});

const ReviewContainer = ({
    history, classes, slot, serviceData, clearState, isEditEnabled, locationSelectedData, getEmployeeId, getRoomId,oktaAuth
}) => {
    console.log("serviceData",getEmployeeId, getRoomId)

    const [showLoader, setShowLoader] = useState(false);
    const hasLocationId =  locationSelectedData?.bookerLocationId
    const [appointmentMessage, setAppointmentMsg] = useState("")
    const [user, setUser] = useState(null);

    console.log('slot:', slot)

    useEffect(() => {
        oktaAuth.getUser().then((res) => {
            setUser(res);
       });
    }, []);

    const isBookingConfirm = async () => {
        if (Object.keys(slot).length > 0) {
            setShowLoader(true)
            const res = await restClient.post(createAppointment({
                TreatmentID: serviceData.serviceId,
                EmployeeID: getEmployeeId?.[0]?.employeeId,
                RoomID: getRoomId?.[0]?.roomId,
                locationId: hasLocationId || '11031',
                authUser: user || {},
                slot
            }));
            setShowLoader(false)
            if (res.data.IsSuccess) {
                // clearState();
                history.push({
                    pathname: '/appointment-confirm',
                    state: {
                        appointmentDetails: res.data.Appointment,
                    },
                });
            } else {
                setAppointmentMsg(res.data.ErrorMessage)
            }
        }

    };
    return (
        <>
            <Grid container className={classes.requestServiceContainer}>
                <SectionTitle title="REVIEW" />
                <Grid className={classes.requestNoteDetails}>
                    <AppointmentSummaryContainer fullWidth showPromoCode />
                    <Grid className={classes.content}>
                        <div className={classes.cancellationPolicy}>
                            <Typography className={`${classes.textContainer} ${classes.cancellationPolicyContainer}`}>
                                <RemoveCircleIcon className={classes.cancellationPolicyIcon} />
                                <span className={classes.cancellationPolicyCopy}>Cancellation & No-Show Policy</span>
                            </Typography>
                            <div className={classes.cancellationPolicyDetail}>
                                You may cancel up to 2 hours before the start of your appointment. By entering your credit card information, you agree to accept a $20 cancellation fee if you cancel within 2 hours of the start of your appointment or do not show up. For group appointments of six or less, your...
                            </div>
                            <Typography className={`${classes.textContainer} ${classes.checkboxContainer}`}>
                                <Checkbox
                                    className={classes.checkbox}
                                    defaultChecked
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                />
                                <span className={classes.cancellationPolicyCopy}>
                                    Yes, I understand this policy
                                </span>
                            </Typography>
                        </div>
                        <Button className={classes.nextClick} onClick={() => isBookingConfirm()} variant="contained" color="secondary">
                            {isEditEnabled ? 'Update Appointment' : 'Book This Appointment'}
                        </Button>
                        <div className={classes.notChangeCopy}>
                            You will not be charged until after your appointment
                        </div>
                        {appointmentMessage?.length > 0 &&
                            <div className={classes.appointmentErrorMessage}>
                                {appointmentMessage}
                            </div>
                        }

                        <div className={classes.atBottomBorder} />
                        <div className={classes.barflyBottomCopy}>
                            * If you are a BarFly member then we would communicate things related to that here.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                        </div>
                    </Grid>

                </Grid>
            </Grid>
            {showLoader ? (
                <Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : null}
        </>
    );
};

ReviewContainer.propTypes = {
    history: object.isRequired,
};

const mapStateToProps = (state) => ({
    slot: getSelectedSlot(state),
    serviceData: getServicesDataFormatted(state),
    isEditEnabled: getIsEditEnabled(state),
    locationSelectedData: getLocationData(state),
    getEmployeeId: getAvailableEmpId(state),
    getRoomId: getAvailableRoomId(state)
});

const mapDispatchToProps = (dispatch) => ({
    clearState: bindActionCreators(clearBookingDetails, dispatch),
});

const enhance = compose(
    withRouter,
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(withOktaAuth(ReviewContainer));
