/* eslint-disable max-len */
import {
    Button,
    Grid, Typography, withStyles,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ConnectedAppoitmentSummary from '../../booking/AppointmentSummary/AppointmentSummaryContainer';

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
        padding: '52px 0px',
        minWidth: '422px',
        boxShadow: 'none',
    },
    heading: {
        float: 'left',
        paddingBottom: '18px',
        fontFamily: 'MrsEavesSmallCap',
        color: theme.palette.common.grey,
        fontSize: '20px',
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
    editIcon: {
        display: 'none',
    },
});

/**
 * Static data - make dynamic when connected with API
 */
const AppointmentDetails = ({ classes, location }) => {
    const isRebookAppointment = location?.pathname?.includes('appointment-rebook');

    return (
        <Grid className={classes.containerShop}>
            <Typography className={classes.heading}>
                {isRebookAppointment ? 'Appointment Details' : 'Chosen Appointment Details' }
            </Typography>
            <Link to="/account/my-appointments" className={classes.backToAppointment}>
                <Grid className={classes.displayFlex}>
                    <ArrowBackIosIcon />
                    <Typography>Back</Typography>
                </Grid>
            </Link>
            <ConnectedAppoitmentSummary classes={classes} />
            {isRebookAppointment ? <Button variant="outlined" className={classes.orderHistoryAction}>Rebook Appointment</Button>
                : <Link to="/booking/review" className={classes.backToAppointment}><Button variant="outlined" className={classes.orderHistoryAction}>Edit</Button></Link>}
            {!isRebookAppointment ? <Typography className={classes.cancelAppointDetails}>Cancel</Typography> : ''}
            <Grid className={classes.cancelCopy}>
                <Typography className={classes.copyMargin}>
                    * If you are a BarFly member then we would communicate things related to that here.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                </Typography>
            </Grid>
        </Grid>
    );
};

AppointmentDetails.propTypes = {
    classes: object.isRequired,
    location: object.isRequired,
};

export default withRouter(withStyles(styles)(AppointmentDetails));
