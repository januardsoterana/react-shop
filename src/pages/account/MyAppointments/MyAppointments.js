/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import { object } from 'prop-types';
import AppointmentCard from '../../../app/Components/AppointmentCard';
import BarflyImage from '../../../assets/images/barfly-membership.svg';
import AppointmentDetails from './AppointmentDetails';
import {  MOBILE_BREAKPOINT } from '../../../Helpers/breakpoints';


const styles = (theme) => ({
    container: {
        backgroundColor: '#fff',
        padding: '36px 22px',
        marginLeft: '15px',
        height: '100%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            backgroundColor: '#f9f9f9',
            padding: '0px 22px',
            minHeight: "456px"
        },
    },
    heading: {
        fontWeight: '800',
        marginBottom: '15px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: "14px 0px 0px -20px !important"
        },
    },
    noAppointmentText: {
        backgroundColor: '#F9F9F9',
        padding: '80px 45px',
        fontSize: '18px',
        textAlign: 'center',
        borderTop: '1px solid #D1D1D1',
        marginBottom: '35px',
    },
    bookButton: {
        width: '378px',
        maxWidth: '100%',
        height: '63px',
        fontSize: '18px',
    },
    noUpcomingContainer: {
        textAlign: 'center',
    },
    barfleyContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '45px 0',
        textDecoration: 'underline',
        textUnderlinePosition: 'under',
    },
});

const MyAppointments = ({ classes, upcoming, past, contentfulStores }) => {
    const [selectedAppointment, setSelectedAppointment] = useState();

    if (selectedAppointment) {
        return (
            <AppointmentDetails
                selectedAppointment={selectedAppointment}
                setSelectedAppointment={setSelectedAppointment}
            />
        );
    }

    return (
        <Grid className={classes.container}>
            <Typography className={classes.heading}>
                Upcoming
            </Typography>
            {upcoming?.length
                ? upcoming?.map((appointment) => (
                    <AppointmentCard
                        isUpcoming
                        appointment={appointment}
                        setSelectedAppointment={setSelectedAppointment}
                        contentfulStores={contentfulStores}
                    />
                ))
                : (
                    <Grid className={classes.noUpcomingContainer}>
                        <Grid className={classes.noAppointmentText}>
                            <Typography style={{ lineHeight: '2' }}>
                                You do not have any upcoming appointments.
                                <br />
                                Book one from here or easily rebook from one of your previous visits.
                            </Typography>
                        </Grid>
                        <Button variant="contained" color="secondary" className={classes.bookButton}>
                            Book an Appointment
                        </Button>
                        <Grid className={classes.barfleyContainer}>
                            <img style={{ margin: '0 32px' }} src={BarflyImage} alt="Barfly" />
                            <Typography>
                                Save 10% on your rebook with a Barfly Membership
                            </Typography>
                        </Grid>

                    </Grid>
                )}
            <Typography className={classes.heading} style={{ marginTop: '30px' }}>
                Past
            </Typography>
            {past?.length
                ? past.map((appointment) => (
                    <AppointmentCard
                        appointment={appointment}
                        setSelectedAppointment={setSelectedAppointment}
                        contentfulStores={contentfulStores}
                    />
                ))
                : <Typography>You don't have any Past Appointments.</Typography>}
        </Grid>
    );
};

MyAppointments.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(MyAppointments);
