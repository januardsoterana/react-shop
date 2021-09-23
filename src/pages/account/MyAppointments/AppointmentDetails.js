/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import {
    Button,
    Grid, Typography, withStyles,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import React, { useEffect } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConnectedAppoitmentSummary from '../../booking/AppointmentSummary/AppointmentSummaryContainer';
import { clearBookingDetails, editOrRebookAppointment, loadBookingState } from '../../../state/ducks/Booking/Booking-Actions';

const styles = (theme) => ({
    containerShop: {
        background: theme.palette.common.white,
        marginLeft: '15px',
        padding: '34px 22px',
        textAlign: 'center',
        height: 'auto',
    },
    container: {
        width: '710px',
        padding: '0px 0px',
        minWidth: '422px',
        boxShadow: 'none',
    },
    heading: {
        margin: '0px 0px 18px 14px',
        fontFamily: 'MrsEavesSmallCap',
        color: theme.palette.common.grey,
        fontSize: '23px',
    },
    formContainer: {
        margin: '46px 2px 2px 2px',
        width: '710px',
        height: '285px',
        backgroundColor: theme.palette.common.lightGrey[3],
        borderTop: `1px solid ${theme.palette.common.lightGrey[0]}`,
    },
    drybarCopy: {
        margin: '55px 0px 36px 0px',
        fontSize: '18px',
        color: '#55585B',
    },
    orderHistoryAction: {
        width: '378px',
        height: '63px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.lightGrey[1],
        fontSize: '16px',
        margin: '35px 0px 0px 0px',
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: theme.palette.common.hover[1],
        },
    },
    backToAppointment: {
        color: '#42413D',
        textDecoration: 'none',
    },
    BackCopy: {
        color: '#42413D',
        fontWeight: '600',
    },
    displayFlex: {
        display: 'flex',
        float: 'right',
    },
    appointmentSummaryTitle: {
        display: 'none',
    },
    cancelAppointDetails: {
        color: '#42413D',
        margin: '17px 0px 0px 0px',
        textUnderlinePosition: 'under',
        textDecoration: 'underline',
    },
    cancelCopy: {
        color: '#42413D',
        textAlign: 'initial',
        borderTop: '1px solid #D1D1D1',
        margin: '20px 0px 0px 0px',
    },
    copyMargin: {
        marginTop: '27px',
    },
    children: {
        width: 'auto',
        float: 'left',
    },
    fieldLabel: {
        float: 'left',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

/**
 * Static data - make dynamic when connected with API
 */
const AppointmentDetails = ({
    classes, setSelectedAppointment, selectedAppointment, reloadState, clearBookings,
}) => {
    const isRebookAppointment = !selectedAppointment.isUpcoming;

    useEffect(() => {
        clearBookings();
        reloadState(selectedAppointment);
    });

    // const handleClick = () => {
    //     setSelectedAppointment(() => {
    //         editOrRebook({ appointment: selectedAppointment, history });
    //         return null;
    //     });
    // };

    return (
        <Grid className={classes.containerShop}>
            <Grid className={classes.headerContainer}>
                <Typography className={classes.heading}>
                    {isRebookAppointment ? 'Appointment Details' : 'Chosen Appointment Details' }
                </Typography>
                <Button variant="outlined" onClick={() => setSelectedAppointment(null)} className={classes.backToAppointment}>
                    <Grid className={classes.displayFlex}>
                        <ArrowBackIosIcon />
                        <Typography className={classes.BackCopy}>Back</Typography>
                    </Grid>
                </Button>
            </Grid>
            <ConnectedAppoitmentSummary classes={classes} />

            {/* // we don't need Edit Button more on my appointment details have to use edit icons */}

            {/* {isRebookAppointment ? <Button onClick={handleClick} variant="outlined" className={classes.orderHistoryAction}>Rebook Appointment</Button>
                : <Button variant="outlined" onClick={handleClick} className={classes.orderHistoryAction}>Edit</Button>}
            {!isRebookAppointment ? <Typography className={classes.cancelAppointDetails}>Cancel</Typography> : ''} */}
            <Grid className={classes.cancelCopy}>
                <Typography className={classes.copyMargin}>
                    * If you are a BarFly member then we would communicate things related to that here.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                </Typography>
            </Grid>
        </Grid>
    );
};

const mapDispatchToProps = (dispatch) => ({
    editOrRebook: bindActionCreators(editOrRebookAppointment, dispatch),
    reloadState: bindActionCreators(loadBookingState, dispatch),
    clearBookings: bindActionCreators(clearBookingDetails, dispatch),
});

AppointmentDetails.propTypes = {
    classes: object.isRequired,
};

export default withRouter(withStyles(styles)(connect(null, mapDispatchToProps)(AppointmentDetails)));
