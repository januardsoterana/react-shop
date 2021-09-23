/* eslint-disable max-len */
import {Button, Grid, withStyles} from '@material-ui/core';
/* eslint-disable react/prop-types */
import React from 'react';
import {getSlots} from '../../../../api/booking-api';
import {getTimeFromDate} from '../../../../Helpers/dateTime';
import useFetch from '../../../../Helpers/useFetch';
import ServiceSkeleton from '../../../../app/Components/Skeleton/ServiceSkeleton';

const styles = (theme) => ({
    slotsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '41px',
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 41
        }
    },
    slotButton: {
        width: '438px',
        height: '72px',
        margin: '24px 0',
        fontSize: '18px',
        color: '#42413D',
        backgroundColor: theme.palette.common.white,
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
        border: 'none',
        borderRadius: 'none',
        [theme.breakpoints.down('sm')]: {
            width: '366px',
            margin: '24px auto 0',
        },

    },
    selected: {
        fontWeight: '800',
    },
    slotsAvailable: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '20px',
        marginLeft: '20px',
    },
});

const SlotsContainer = ({
                            selectedDate, handleSelectSlot, classes, selectedSlot, hasLocationId, serviceData, guests
                        }) => {
    const {data, error, loading} = useFetch(getSlots(selectedDate, hasLocationId, serviceData.serviceId));
    const slotData = data?.[0]?.serviceCategories?.[0]?.services?.[0]?.availability;

    if (loading) {
        return <ServiceSkeleton/>;
    }

    if (error) {
        return null;
    }

    if (data) {
        console.log('slot data ', slotData[0]);
        return (
            <Grid className={classes.slotsContainer}>

                {slotData ? slotData.map((slot) => {
                    const date = getTimeFromDate(slot.startDateTime);
                    return (
                        <Grid>
                            <Button
                                onClick={() => handleSelectSlot(slot)}
                                className={`${classes.slotButton} ${getTimeFromDate(selectedSlot.startDateTime) === date ? classes.selected : ''}`}
                                variant="outlined"
                                color="primary"
                            >
                                {date}
                            </Button>
                            {
                                guests > 1 && <span className={classes.slotsAvailable}>{slot.employees.length} slots available</span>
                            }
                        </Grid>
                    );
                }) : null}
            </Grid>
        );
    }
    return null;
};

export default withStyles(styles)(SlotsContainer);
