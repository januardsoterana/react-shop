/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import {
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import {
    arrayOf, object, string, shape, bool,
} from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import DirectionsIcon from '@material-ui/icons/Directions';
import restClient from '../../api/restClient';
import { cancelAppointment } from '../../api/booking-api';
import { MOBILE_BREAKPOINT } from '../../Helpers/breakpoints';

const styles = (theme) => ({
    container: {
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '11px',
        flexWrap: 'nowrap',
        minWidth: '600px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            minWidth: '393px',
            margin: "9px 0px 0px -26px"
        },

    },
    dateSection: {
        backgroundColor: '#E5E5E5',
        borderRight: '2px solid white',
        width: '93px',
        padding: '18px',
        textAlign: 'center',
    },
    upcomingDateBgColor: {
        backgroundColor: '#FFDD30',
    },
    main: {
        backgroundColor: '#F9F9F9',
        width: 'calc(100% - 95px)',
        padding: '18px',
        justifyContent: 'space-between',
        borderTop: '1px solid #D1D1D1',
        boxSizing: 'border-box',
        flexWrap: 'nowrap',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            backgroundColor: '#FFFFFF',
        },
    },
    heading: {
        fontSize: '15px',
        fontWeight: '600',
        paddingBottom: '6px',
    },
    typography: {
        fontSize: '18px',
        fontWeight: '400',
        wordWrap: 'nowrap',
    },
    services: {
        paddingTop: '31px',
        maxWidth: '70%',
    },
    dateTypography: {
        fontWeight: '400',
    },
    month: {
        fontSize: '15px',
    },
    day: {
        paddingTop: '4px',
        fontSize: '18px',
        fontWeight: '600',
    },
    year: {
        paddingTop: '4px',
        fontSize: '14px',
    },
    time: {
        paddingTop: '9px',
        fontSize: '15px',
    },
    mainButton: {
        backgroundColor: '#FFDD30',
        color: '#54575A',
        '&:hover': {
            backgroundColor: '#b29a21',
        },
    },
    directionsButton: {
        backgroundColor: 'white',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.04)',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    topButtons: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        flexDirection: 'column',
    },
    button: {
        display: 'flex',
        margin: '3px 0',
        fontWeight: '400',
        textTransform: 'none',
        borderRadius: '0',
        minWidth: '79px',
        maxWidth: 'fit-content',
        padding: '8px 22px',
        whiteSpace: 'nowrap',
        '&:focus, &:visited, &:hover, &:link, &:active': {
            textDecoration: 'none',
        },
    },
    detailsButton: {
        fontSize: '16px',
        textDecoration: 'underline',
        color: '#42413D',
        textUnderlinePosition: 'under',
        padding: '4px',
        alignSelf: 'flex-end',
        margin: '0',
        '&:hover': {
            textDecoration: 'underline',
            color: '#42413D',
            textUnderlinePosition: 'under',
            backgroundColor: 'none',
        },
        '&:focus, &:visited, &:link, &:active': {
            textDecoration: 'none',
        },
    },
    textDecorationNone: {
        textDecoration: 'none',
    },
});

// Extract object with date, month, year and 12 hour format time
const extractDataMonthYearTime = (d) => {
    const date = new Date(d);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    // Extract 12 hour format time
    let minutes = date.getMinutes();
    let hour = date.getHours();
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour %= 12;
    hour = hour || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const time = `${hour}:${minutes}${ampm}`;

    return {
        month, day, year, time,
    };
};

// Appontment Card widget - independent component that takes an appointment object
// the object should include following keys
// date, location, services (Array) and status (past or upcoming)

const AppointmentCard = ({
    classes, appointment, isUpcoming, setSelectedAppointment, contentfulStores
}) => {
    const {
        StartDateTimeOffset, LocationName, AppointmentTreatments,
    } = appointment;

    // getting the location name from upcoming past appointments
    const getAppointmentLocation = contentfulStores?.filter(locId => locId?.bookerLocationId === appointment?.LocationID)
    
    const appointmentDate = extractDataMonthYearTime(StartDateTimeOffset);
    const detailsButtonText = isUpcoming ? 'Cancel' : 'View Details';
    const mainButtonText = isUpcoming ? 'Edit' : 'Rebook';
    const handleCancel = async () => {
        if (isUpcoming) {
            const res = await restClient.post(cancelAppointment(appointment.ID));

            if (res.data.IsSuccess) {
                window.location.reload();
            }
        }
        return null;
    };
    return (
        <Grid container className={classes.container}>
            <Grid item className={`${classes.dateSection} ${isUpcoming ? classes.upcomingDateBgColor : ''}`}>
                {
                    // Get date, month, year and time - use class with same name
                    Object.keys(appointmentDate).map((key) => (
                        <Typography key={key} className={`${classes.dateTypography} ${classes[key]}`}>
                            {appointmentDate[key]}
                        </Typography>
                    ))
                }
            </Grid>
            <Grid container className={classes.main}>
                <Grid item>
                    <Grid>
                        <Typography className={`${classes.heading}`}>
                            Location
                        </Typography>
                        <Typography className={classes.typography}>
                            {LocationName || getAppointmentLocation?.[0]?.title}
                        </Typography>
                    </Grid>
                    <Grid className={classes.services}>
                        <Typography className={`${classes.heading}`}>
                            {`Service${AppointmentTreatments?.length ? 's' : ''}`}
                        </Typography>
                        {
                            AppointmentTreatments?.length > 1 ? AppointmentTreatments.map((service) => (
                                // TODO change key style
                                <Grid key={`${service.user}${service.service}`} container justify="space-between">
                                    <Typography className={classes.typography}>
                                        {service.Guest.HasGuest ? `Guest ${service.Guest.GuestID}` : 'Me'}
                                    </Typography>
                                    <Typography className={classes.typography}>
                                        {service.TreatmentName}
                                    </Typography>
                                </Grid>
                            )) : (
                                    <Typography className={classes.typography}>
                                        {AppointmentTreatments[0].TreatmentName}
                                    </Typography>
                                )
                        }

                    </Grid>
                </Grid>
                <Grid className={classes.buttonContainer}>
                    <Grid className={classes.topButtons}>
                        <Button
                            variant="contained"
                            className={`${classes.button} ${classes.mainButton}`}
                            onClick={() => setSelectedAppointment({
                                isUpcoming,
                                appointment,
                            })}
                        >
                            {mainButtonText}
                        </Button>
                        {isUpcoming ? (
                            <Link to="/booking/location">
                                <Button variant="contained" startIcon={<DirectionsIcon />} className={`${classes.button} ${classes.directionsButton}`}>
                                    GetDirections
                                </Button>
                                {' '}

                            </Link>
                        ) : null}
                    </Grid>
                    <Button onClick={handleCancel} className={`${classes.button} ${classes.detailsButton}`}>
                        <Typography>
                            {detailsButtonText}
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

AppointmentCard.propTypes = {
    classes: object.isRequired,
    appointment: shape({
        date: string,
        status: string,
        location: string,
        service: arrayOf(shape({
            user: string,
            service: string,
        })),
    }).isRequired,
    isUpcoming: bool,
};

AppointmentCard.defaultProps = {
    isUpcoming: false,
};

export default withStyles(styles)(AppointmentCard);
