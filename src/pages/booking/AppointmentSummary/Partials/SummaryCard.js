/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import {
    Grid, Typography, withStyles,
} from '@material-ui/core';
import { bool, node, object } from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DirectionsIcon from '@material-ui/icons/Directions';

const styles = () => ({
    card: {
        background: '#F9F9F9',
        padding: '24px 16px',
        marginBottom: '8px',
    },
    fieldLabel: {
        fontWeight: 600,
        fontSize: '14px',
        margin: '5px 0',
    },
    fieldValueContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    children: {
        width: '100%',
    },
    displayFlex: {
        display: 'flex',
        textDecoration: 'underline',
        textUnderlinePosition: 'under',
        marginTop: '-31px',
    },
});

const SummaryCard = ({
    heading,
    classes,
    children,
    editClickPath,
    isAccountAppointmentDetails,
}) => {
    const getDirection = () => (
        <Grid className={classes.displayFlex}>
            <DirectionsIcon />
            <Typography>Get Directions</Typography>
        </Grid>
    );
    return (
        <Grid className={classes.card}>
            <Typography className={classes.fieldLabel}>
                {heading}
            </Typography>
            <Grid className={classes.fieldValueContainer}>
                <Grid className={classes.children}>
                    {children}
                </Grid>
                <Link to={editClickPath} style={{ color: '#42413D' }}>
                    {isAccountAppointmentDetails ? getDirection() : <EditIcon className={classes.editIcon} />}
                </Link>
            </Grid>
        </Grid>
    );
};

SummaryCard.propTypes = {
    heading: object.isRequired,
    classes: object.isRequired,
    children: node.isRequired,
    isAccountAppointmentDetails: bool.isRequired,
};

export default withStyles(styles)(SummaryCard);
