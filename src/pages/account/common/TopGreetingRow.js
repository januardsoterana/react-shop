import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import DateMonthCard from './DateMonthCard';
import { TABLET_BREAKPPOINT } from '../../../Helpers/breakpoints';
/* eslint-disable react/prop-types */

const styles = (theme) => ({
    container: {
        borderBottom: '1px solid #D1D1D1',
        backgroundColor: '#fff',
    },
    greetingContainer: {
        height: '189px',
        backgroundColor: '#F9F9F9',
    },
    widthController: {
        maxWidth: '1400px',
        padding: '29px 38px',
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
        height: '100%',
    },
    greetingText: {
        fontSize: '30px',
        marginLeft: '80px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            fontSize: '22px',
            marginLeft: '13px',
            whiteSpace: 'nowrap',
        },
    },
    borderedDiv: {
        border: '1px solid #D1D1D1',
        height: '100%',
        margin: '0 75px',
    },
    appointmentDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    nextAppointmentCopy: {
        fontSize: '13px',
        marginBottom: '11px',
        whiteSpace: 'nowrap',
    },
});

const TopGreetingRow = ({ user, classes }) => (
    <Grid className={classes.container}>
        <Grid className={classes.greetingContainer}>
            <Grid className={classes.widthController}>
                <Typography className={classes.greetingText}>
                    {`Hi ${user.given_name}, good ${'afternoon!'}`}
                </Typography>
                <Grid className={classes.borderedDiv} />
                <Grid className={classes.appointmentDiv}>
                    <Typography className={classes.nextAppointmentCopy}>
                        Next Appointment
                    </Typography>
                    <DateMonthCard value={new Date()} />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default withStyles(styles)(TopGreetingRow);
