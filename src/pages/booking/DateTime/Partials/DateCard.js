import {
    Button,
    Grid, Typography, withStyles,
} from '@material-ui/core';
import {
    bool, func, object, // string,
} from 'prop-types';
import React from 'react';
import { compose } from 'recompose';

const styles = (theme) => ({
    root: {
        width: '90px',
        margin: '0 10px',
        [theme.breakpoints.down('sm')]: {  width: '46px' },
    },
    dateLabel: {
        width: '100%',
        height: '84px',
        background: theme.palette.common.white,
        border: `1px solid ${theme.palette.common.lightGrey[0]}`,
        borderRadius: '4px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: theme.palette.common.grey,
        [theme.breakpoints.down('sm')]: { height: '53px' },
    },
    buttonContainer: {
        width: '100%',
        padding: '0',
    },
    day: {
        fontSize: '15px',
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: '10px',
    },
    date: {
        fontSize: '22px',
        fontWeight: '800',
        margin: '5px',
        [theme.breakpoints.down('sm')]: { fontSize: '15px' },
    },
    slots: {
        fontSize: '13px',
    },
    selected: {
        backgroundColor: theme.palette.common.lightGrey[1],
        color: theme.palette.common.white,
        [theme.breakpoints.down('sm')]: { height: '53px' },
    },
    disabled: {
        backgroundColor: '#ebebeb',
        color: 'gray',
        cursor: 'default',
        [theme.breakpoints.down('sm')]: { 
        height: '53px',
        backgroundColor: '#FFFFFF'
        },

    },
});

const DateCard = ({
    date, onDateSelect, classes, selectedDate, disabled, // , slots,
}) => {
    const dateValue = date.getDate();
    const day = date.toLocaleString('en-us', { weekday: 'short' });

    return (
        <Grid className={classes.root}>
            <Typography className={classes.day}>
                {day}
            </Typography>
            <Button
                classes={{
                    label: `${classes.dateLabel} ${selectedDate.getDate() === dateValue ? classes.selected : ''} ${disabled ? classes.disabled : ''}`,
                }}
                disabled={disabled}
                variant="outlined"
                className={classes.buttonContainer}
                onClick={() => onDateSelect(date)}
            >
                <Typography className={classes.date}>
                    {dateValue}
                </Typography>
                {/* <Typography className={classes.slots}>
                    {`(${slots || 14})`}
                </Typography> */}
            </Button>
        </Grid>
    );
};

DateCard.propTypes = {
    classes: object.isRequired,
    date: object,
    selectedDate: object,
    // slots: string,
    onDateSelect: func.isRequired,
    disabled: bool.isRequired,
};

DateCard.defaultProps = {
    date: {},
    selectedDate: {},
    // slots: '',
};

const enhance = compose(
    withStyles(styles),
);

export default enhance(DateCard);
