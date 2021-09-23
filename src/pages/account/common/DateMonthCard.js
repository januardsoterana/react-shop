import {
    Button,
    Typography, withStyles,
} from '@material-ui/core';
import {
    bool, func, object,
} from 'prop-types';
import React from 'react';
import { compose } from 'recompose';

const styles = (theme) => ({
    dateLabel: {
        width: '86px',
        height: '88px',
        background: theme.palette.common.white,
        border: `1px solid ${theme.palette.common.lightGrey[0]}`,
        borderRadius: '4px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        color: theme.palette.common.grey,
        padding: '20px 0 15px',
    },
    buttonContainer: {
        padding: '0px',
    },
    date: {
        fontSize: '22px',
        fontWeight: '800',
    },
    month: {
        textTransform: 'none',
        fontSize: '13px',
        fontWeight: '800',
    },
    selected: {
        backgroundColor: theme.palette.common.lightGrey[1],
        color: theme.palette.common.white,
    },
});

const DateMonthCard = ({
    value, onClick, classes, isSelected,
}) => {
    const dateValue = value.getDate();
    const month = value.toLocaleString('en-us', { month: 'long' });

    return (
        <Button
            classes={{
                label: `${classes.dateLabel} ${isSelected ? classes.selected : ''}`,
            }}
            variant="outlined"
            className={classes.buttonContainer}
            onClick={() => onClick()}
        >
            <Typography className={classes.month}>
                {month}
            </Typography>
            <Typography className={classes.date}>
                {dateValue}
            </Typography>
        </Button>
    );
};

DateMonthCard.propTypes = {
    classes: object.isRequired,
    value: object,
    onClick: func,
    isSelected: bool,
};

DateMonthCard.defaultProps = {
    value: {},
    onClick: () => {},
    isSelected: false,
};

const enhance = compose(
    withStyles(styles),
);

export default enhance(DateMonthCard);
