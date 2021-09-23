/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Grid, Typography, Button, Box,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ICalendarLink from "react-icalendar-link";

import BookedTime from '../../../assets/images/BookedTime.svg';
import CalendarBooked from '../../../assets/images/CalendarBooked.svg';
import BlowoutAddOns from '../../../assets/images/BlowoutAddOns.svg';
import ChaseShine from '../../../assets/images/ChaserShine.svg';
import {
    getAddOnsServiceData, getLocationData, getSelectedDate, getSelectedSlot, getServicesData,
} from '../../../state/ducks/Booking/Booking-Selectors';
import {getDateDDmm, getNumberOfDaysBetween, getTimeFromDate} from '../../../Helpers/dateTime';

const useStyles = makeStyles((theme) => ({
    summaryCopy: {
        marginTop: '20px',
        textAlign: 'center',
        fontFamily: theme.typography.fontFamily[0],
        fontWeight: '800',
    },
    summaryCopySub: {
        fontWeight: '300',
        fontStyle: 'oblique',
    },
    summaryCopyLocation: {
        padding: '10px 10px !important',
        marginBottom: '5px !important',
        position: 'relative',
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: theme.typography.fontFamily[0],
    },
    requestNoteDetails: {
        float: 'right',
        background: theme.palette.common.white,
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
    },
    allSetTitle: {
        fontFamily: 'DINCondensed',
        fontSize: '39px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: theme.palette.common.grey,
    },
    allSetCopy: {
        margin: '25px auto 38px !important',
    },
    requestServiceContainer: {},
    locationSummary: {
        background: theme.palette.common.lightGrey[3],
    },
    BookedTime: {
        background: theme.palette.common.white,
        border: `1px solid ${theme.palette.common.lightGrey[0]}`,
        boxSizing: 'border-box',
        borderRadius: '4px',
        textAlign: 'center',
        width: '208px',
        height: '208px',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-aaound',
        padding: '50px 0',
    },
    gridAll: {
        margin: '0 auto',
        borderRadius: '0px',
        background: '#fff',
        boxShadow: '2px 2px 46px rgba(235, 235, 235, 0.5)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: '19px',
    },
    parentGrid: {
        margin: '5px 0px 0px 40px',
    },
    parentDiv: {
        background: theme.palette.secondary[200],
        width: '100%',
        backgroundColor: '#F8F8F8',
        borderTop: '1px solid #D1D1D1',
        padding: '23px',
    },
    parentSection: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    nextAction: {
        background: theme.palette.common.lightGrey[1],
    },
    nextClick: {
        fontFamily: theme.typography.fontFamily[0],
        fontSize: '18px',
        lineHeight: '45px',
        color: theme.palette.common.black,
        width: '378px',
        maxWidth: '100%',
        textTransform: 'capitalize',
        margin: '32px auto',
    },
    addToCalendar: {
        fontFamily: theme.typography.fontFamily[0],
        fontSize: '15px',
        textDecoration: 'underline',
    },
    alignItemCenter: {
        textAlign: 'center',
    },
    displayFlex: {
        display: 'flex',
    },
    borderBottomCopy: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'MrsEavesSmallCaps',
        fontSize: '20px',
        '&::before': {
            content: '""',
            borderTop: '2px dashed #BDBDBD',
            flex: '1 0 20px',
            marginRight: '10px',
        },
        '&::after': {
            content: '""',
            borderTop: '2px dashed #BDBDBD',
            flex: '1 0 20px',
            marginLeft: '10px',
        },
        margin: '40px auto',
    },
    dashedBorder: {
        borderBottom: `3px dashed ${theme.palette.common.lightGrey[2]}`,
    },
    chaserShine: {
        textAlign: 'center',
    },
    container: {
        // background: theme.palette.common.lightGrey[3],
        maxWidth: '800px',
        margin: '75px auto',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        textAlign: 'center',
    },
    showCalendarAction: {
        display: 'flex',
        color: '#42413D',
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            whiteSpace: 'nowrap',
        },
    },
    getDirection: {
        position: 'absolute',
        right: '0',
        top: '0',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    linkGetDirection: {
        fontSize: '15px',
        lineHeight: '22px',
        textDecoration: 'underline',
        color: '#42413d',
        marginLeft: '10px'
    },
    guestTitle: {
        width: '100%'
    }
}));

function BookingConfirmationContainer({
                                          location,
                                          date,
                                          addons,
                                          slot, services
                                      }) {
    const classes = useStyles();
    const locationState = location?.state || '';
    const Treatment = locationState?.appointmentDetails?.Treatment || '';
    const event = {
        title: 'Drybar Booking',
        description: '',
        startTime: date,
        endTime: date,
        location: location?.contact?.street1 + ', ' + location?.contact?.city + ' ' + location?.contact?.state + ' ' + location?.contact?.postalCode
    }

    console.log('date:', date, slot)

    return (
        <Grid className={classes.container}>
            <Typography className={classes.allSetTitle}>
                you’re all set!
            </Typography>
            <Typography className={classes.allSetCopy}>
                Some last minute notes will go here lorem ipsum dolor consectuer.
            </Typography>
            <Grid className={classes.gridAll}>
                <Typography className={classes.summaryCopyLocation}>
                    {location?.title + ', ' + location?.contact?.street1 + ', ' + location?.contact?.city}
                    <div className={classes.getDirection}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.2541 7.15803L14.2541 7.158L14.2487 7.15263L8.84737 1.75128C8.379 1.28291 7.621 1.28291 7.15263 1.75128L1.75128 7.15263C1.28291 7.621 1.28291 8.379 1.75128 8.84737L7.15263 14.2487C7.621 14.7171 8.379 14.7171 8.84737 14.2487L14.2464 8.84969C14.7249 8.38003 14.7083 7.62391 14.2541 7.15803ZM9.7973 8.05485V8.003V7.403H9.1973H6.7967H6.1967V8.003V9.20345H6.1964V7.40285L6.19655 7.4027H9.1973H9.7973V6.8027V6.75085L10.4493 7.40285L9.7973 8.05485Z" stroke="#42413D" stroke-width="1.2"/>
                        </svg>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${location?.contact?.coordinates[0]},${location?.contact?.coordinates[1]}`}
                            className={classes.linkGetDirection}
                            target="_blank"
                        >
                            Get Directions
                        </a>
                    </div>
                </Typography>

                {
                    Object.keys(slot).map((user) => {
                        let s = slot[user]
                        return <div className={classes.parentDiv}>
                            <Typography className={classes.guestTitle}>
                                {user}
                            </Typography>
                            <Grid className={classes.parentSection}>
                                <Grid className={classes.BookedTime}>
                                    <img src={BookedTime} alt="booked-time"/>
                                    <Typography className={classes.summaryCopy}>
                                        {getTimeFromDate(s.startDateTime)}
                                    </Typography>
                                </Grid>
                                <Grid className={classes.BookedTime}>
                                    <img src={CalendarBooked} alt="booked-time"/>
                                    <Typography className={classes.summaryCopy}>
                                        <Box>
                                            {getDateDDmm(new Date(s.startDateTime))}
                                        </Box>
                                        <Box className={classes.summaryCopySub}>
                                            {`in ${getNumberOfDaysBetween(new Date(s.startDateTime))} days` || 'Today'}
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid className={classes.BookedTime}>
                                    <img src={BlowoutAddOns} alt="booked-time"/>
                                    <Typography className={classes.summaryCopy} style={{marginTop: '14px'}}>
                                        {Treatment.Name ? (
                                            <Box>
                                                {Treatment.Name}
                                            </Box>
                                        ) : null}
                                        <Box className={Treatment.Name ? classes.summaryCopySub : ''}>
                                            {`${addons.length || 'No'} add ons`}
                                        </Box>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    })
                }
                
                <Link className={classes.nextClick} to="/account/my-appointments">
                    <Button
                        style={{fontSize: '18px', lineHeight: '45px', width: '378px', maxWidth: '378px'}}
                        variant="contained"
                        color="primary">
                        Manage Appointments
                    </Button>
                </Link>

                <Button variant="container" className={classes.showCalendarAction}>
                    <CalendarTodayIcon style={{height: '15px', marginRight: '3px'}}/>
                    <ICalendarLink event={event}>
                        <Typography style={{fontSize: '15px', height: '20px'}}>
                            Add To Calendar
                        </Typography>
                    </ICalendarLink>
                </Button>
            </Grid>
            <Typography className={classes.borderBottomCopy}>OUR SPECIAL OFFER</Typography>
            <Grid className={classes.chaserShine}><img src={ChaseShine} alt="chase-shine"/></Grid>
        </Grid>

    );
}

const mapStateToProps = (state) => ({
    slot: getSelectedSlot(state),
    date: getSelectedDate(state),
    services: getServicesData(state),
    addons: getAddOnsServiceData(state),
    location: getLocationData(state)
});

export default withRouter(connect(mapStateToProps)(BookingConfirmationContainer));
