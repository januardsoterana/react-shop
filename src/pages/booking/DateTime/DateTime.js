/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
import {
    Button, Grid, Typography, withStyles, Checkbox
} from '@material-ui/core';
import { object } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Media from 'react-media';
import { bindActionCreators } from 'redux';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DateCard from './Partials/DateCard';
import { getSelectedDateTime, getSelectedSlot, getServicesDataFormatted, getNumberOfGuests, isGuestWithDifferentServices } from '../../../state/ducks/Booking/Booking-Selectors';
import {
    getDateStringMMDDYY, monthNames, getWeekByFirstDate,
} from '../../../Helpers/dateTime';
import { setDateTimeClient, setSlotTime, availEmployeeBookingSlots,availRoomBookingSlot } from '../../../state/ducks/Booking/Booking-Actions';
import Calendar from './Partials/Calendar';
import SlotsContainer from './Partials/SlotsContainer';
import { getBookerTimeSlot } from '../../../api/booking-api'
import restClient from '../../../api/restClient';
import SelectUserGuest from '../AddOns/Common/SelectUserGuest';

const styles = (theme) => ({
    topContainer: {
        width: '100%',
        backgroundColor: theme.palette.common.white,
        height: '350px',
        padding: '26px 22px 0',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#f3f3f3',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
    },
    heading: {
        marginBottom: '15px',
        [theme.breakpoints.down('sm')]: {
            width: '24rem',
            textAlign: 'center',
            marginBottom: '41px !important'
        },
    },
    datePickerContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderTop: `1px solid ${theme.palette.common.lightGrey[0]}`,
        backgroundColor: theme.palette.common.lightGrey[3],
        padding: '24px 16px',
        marginBottom: '8px',
        [theme.breakpoints.down('sm')]: {
            width: '377px',
            backgroundColor: '#f3f3f3',
        },
    },
    datePicker: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginTop: '20px',
        [theme.breakpoints.down('sm')]: { width: '64%' },
    },
    monthName: {
        margin: '0 10px',
        fontWeight: '800',
        fontSize: '18px',
        [theme.breakpoints.down('sm')]: { margin: '0px 242px 0px -27px !important' },
    },
    datePickerSections: {
        margin: 'auto',
    },
    openingsText: {
        fontSize: '13px',
        margin: '10px 5px',
    },
    bottomContainer: {
        padding: '43px',
        [theme.breakpoints.down('sm')]: { padding: '0px' },
    },
    fullDate: {
        fontSize: '18px',
        fontWeight: '800',
        [theme.breakpoints.down('sm')]: {
            whiteSpace: 'nowrap',
            margin: '0px 0px -56px 21px',
        },
    },
    showCalendarAction: {
        display: 'flex',
        color: '#42413D',
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            whiteSpace: 'nowrap',
        },
    },
    differentServiceCard: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20
    }
});

const DateTime = ({
    classes,
    getSelectedCalendarInfo,
    setDateTime,
    setSlot,
    goToNextPage,
    selectedSlot,
    availableDates,
    actionTriggerToSetDateTime,
    hasLocationId,
    serviceData,
    actionTriggerToSetEmployeeId,
    actionTriggerToSetRoomId,
    guests,
    isGuestWithDifferentServices
}) => {
    const weekStartDate = availableDates?.[0] ? new Date(availableDates[0]) : new Date();
    const [selectedDate, setSelectedDate] = useState(getSelectedCalendarInfo ? new Date(getSelectedCalendarInfo) : weekStartDate);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedUser, setSelectedUser] = useState('Me')
    const [isDifferentServiceEnabled, setIsDifferentServiceEnabled] = useState(false)

    const guestNames = [];

    if (guests) {
        for (let i = 0; i < guests + 1; i += 1) {
            if (i === 0) {
                guestNames.push('Me');
            } else {
                guestNames.push(`Guest ${i}`);
            }
        }
    }


    const handleSelectSlot = (slot) => {

        let updatedSlot = {
            ...selectedSlot,
           [selectedUser]: slot 
        }

        if (!isGuestWithDifferentServices && !isDifferentServiceEnabled && guestNames.length) {
            updatedSlot = guestNames.reduce((obj, cur) => {
                obj[cur] = slot
                return obj
            }, {})
        }

        setSlot(updatedSlot);
        getTimeSlots(slot);

        if (Object.keys(updatedSlot).length > guests) {
            goToNextPage();
        }
    };

    const getTimeSlots = async (slot) => {

        const selectedStartTime = slot?.startDateTime
        const selectedServiceId = serviceData?.serviceId
        const AvailTimeSlots = await restClient.post(getBookerTimeSlot(selectedStartTime, hasLocationId,selectedServiceId));
        if(AvailTimeSlots.status === 200){
            const getAvailableDetails = AvailTimeSlots?.data || {}
            const getAvailEmployeeDetails = getAvailableDetails?.employees?.filter(empID => empID.available === 'Yes');
            const getAvailRoomDetails = getAvailableDetails?.rooms?.filter(roomID => roomID.available === 'Yes');
            actionTriggerToSetEmployeeId(getAvailEmployeeDetails);
            actionTriggerToSetRoomId(getAvailRoomDetails);
        }
    }

    const onDateSelect = (date) => {
        setSelectedDate(date);
        actionTriggerToSetDateTime(date.toLocaleString());
        setShowCalendar(false);
        setSlot({});
    }

    return (
        <>
            <Grid className={classes.topContainer}>
                <Media query={{ maxWidth: 599 }}>
                    {(matches) => (matches ? (
                        <Typography className={classes.heading}>
                            Plan for
                            {' '}
                            <strong>50 mins</strong>
                            {' '}
                            for your service
                            {' '}
                        </Typography>
                    ) : (
                            <Typography className={classes.heading}>
                                Plan for
                                {' '}
                                <strong>50 mins</strong>
                                {' '}
                            for your service
                            </Typography>
                        )
                    )}
                </Media>
                <Grid className={classes.datePickerContainer}>
                    <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography className={classes.monthName}>
                            {monthNames[selectedDate.getMonth()]}
                        </Typography>
                        <Button onClick={() => setShowCalendar(true)} variant="container" className={classes.showCalendarAction}>
                            <Typography style={{ borderBottom: '0.5px solid #42413D', fontSize: '13px', height: '20px' }}>
                                Show Calendar
                            </Typography>
                            <CalendarTodayIcon style={{ height: '13px' }} />
                        </Button>
                    </Grid>
                    <Grid className={classes.datePickerSections}>
                        <Grid className={classes.datePicker}>
                            {getWeekByFirstDate(selectedDate).map((date) => (
                                <DateCard
                                    date={date}
                                    disabled={!availableDates?.length || !availableDates.some((d) => new Date(d).toDateString() === date.toDateString())}
                                    selectedDate={selectedDate}
                                    onDateSelect={onDateSelect}
                                />
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid>
                    <Typography className={classes.fullDate}>
                        {getDateStringMMDDYY(selectedDate)}
                    </Typography>
                </Grid>
                {
                    guests > 0 && !isGuestWithDifferentServices &&
                    <Grid className={classes.differentServiceCard}>
                        <Checkbox
                            checked={isDifferentServiceEnabled}
                            onClick={() => {
                                setIsDifferentServiceEnabled(!isDifferentServiceEnabled)
                            }}
                            className={classes.checkbox}
                        />
                        <Typography >
                            My guests and I will be will be getting different slots
                        </Typography>
                    </Grid>
                }
            </Grid>
            {
                (isDifferentServiceEnabled || isGuestWithDifferentServices) && <Grid>
                    <SelectUserGuest setSelectedUser={setSelectedUser} isDifferentServiceEnabled isDate />
                </Grid>
            }
            <Grid className={classes.bottomContainer}>
                {availableDates.some((d) => new Date(d).toDateString() === selectedDate.toDateString()) ? (
                    <SlotsContainer
                        handleSelectSlot={handleSelectSlot}
                        selectedSlot={selectedSlot}
                        serviceData={serviceData}
                        selectedDate={selectedDate}
                        hasLocationId={hasLocationId}
                        selectedUser={selectedUser}
                        guests={guests}
                    />
                ) : null}
            </Grid>
            <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                open={showCalendar}
                onClose={() => setShowCalendar(false)}
                onClick={onDateSelect}
                hasLocationId={hasLocationId}
            />
        </>
    );
};

DateTime.propTypes = {
    classes: object.isRequired,
    getSelectedCalendarInfo: object,
};

DateTime.defaultProps = {
    getSelectedCalendarInfo: '',
};

const mapStateToProps = (state) => ({
    getSelectedCalendarInfo: getSelectedDateTime(state),
    selectedSlot: getSelectedSlot(state),
    serviceData: getServicesDataFormatted(state),
    guests: getNumberOfGuests(state),
    isGuestWithDifferentServices: isGuestWithDifferentServices(state)
});

const mapDispatchToProps = (dispatch) => ({
    setDateTime: bindActionCreators(setDateTimeClient, dispatch),
    setSlot: bindActionCreators(setSlotTime, dispatch),
    actionTriggerToSetDateTime: bindActionCreators(setDateTimeClient, dispatch),
    actionTriggerToSetEmployeeId: bindActionCreators(availEmployeeBookingSlots, dispatch),
    actionTriggerToSetRoomId: bindActionCreators(availRoomBookingSlot, dispatch)
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
);

export default enhance(DateTime);
