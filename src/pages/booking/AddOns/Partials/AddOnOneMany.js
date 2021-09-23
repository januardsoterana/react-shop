/* eslint-disable react/prop-types */
import {
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import { object } from 'prop-types';
import { useHistory } from 'react-router-dom';
import React from 'react';
import SelectUserGuest from '../Common/SelectUserGuest';
import { MOBILE_BREAKPOINT } from '../../../../Helpers/breakpoints'

// import InfoIcon from '@material-ui/icons/Info';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const styles = (theme) => ({
    root: {
        padding: '31px 0',
        backgroundColor: theme.palette.common.white,
        justifyContent: 'space-between',
        minWidth: '550px',
        marginBottom: '12px',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.06)',
        alignItems: 'center',
        '&:last-child': {
            marginBottom: 0,
        },
        width: '100%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            backgroundColor: '#f3f3f3',
            boxShadow: 'none',
        }
    },
    content: {
        textAlign: 'left',
        margin: '0px 0px 0px 21px',
    },
    buttonContainer: {
        maxWidth: '100%',
        width: '378px',
        height: '63px',
        padding: '0',
        margin: '0 0 3px 0',
        border: `1px solid ${theme.palette.secondary[100]}`,
        backgroundColor: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '291px',
            margin: '0 0 3px 53px',
            backgroundColor: '#F9F9F9',
            border: '1px solid #E5E5E5'
        }
    },
    addOnName: {
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        fontFamily: 'AvenirNext',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            display: 'none'
        }
    },
    buttonContainerGrid: {
        textAlign: 'center',
        margin: '34px 0px 0px 0px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '0px 0px 0px 0px',
            textAlign: 'inherit',
        }
    },
    displayFlex: {
        display: 'flex',
        width: '128%',
        margin: '2% -27% 2% -6%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            display: 'none'
        }
    },
    borderBottomCopy: {
        margin: '7px 0px 0px 25px',
        fontSize: '16px',
        whiteSpace: 'nowrap',
    },
    dashedBorder: {
        borderBottom: `1px solid ${theme.palette.common.lightGrey[2]}`,
        width: '34%',
        margin: '0px 5px 7px 41px',
    },
    guestNameButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: theme.palette.secondary[100],
    },
});

const AddOnOneMany = ({ classes, setSelectedUser }) => {
    const history = useHistory();

    const skipAddOns = () => {
        history.push('/booking/select-date');
    };

    return (
        <>
            <Grid className={classes.root}>
                <Grid className={classes.content}>
                    <Typography className={classes.addOnName}>
                        Add one or add many
                    </Typography>

                </Grid>
                <Grid className={classes.buttonContainerGrid}>
                    <Button
                        variant="contained"
                        className={classes.buttonContainer}
                        onClick={() => skipAddOns()}
                    >
                        Skip Add-ons

                    </Button>
                </Grid>

            </Grid>
            <Grid className={classes.root}>
                <Grid className={classes.content}>
                    <Typography className={classes.addOnName}>
                        Add one or add many
                    </Typography>

                </Grid>
                <Grid className={classes.buttonContainerGrid}>
                    <SelectUserGuest setSelectedUser={setSelectedUser} isDifferentServiceEnabled />
                    <Button
                        variant="contained"
                        className={classes.buttonContainer}
                    >
                        No Add-ons for Me

                    </Button>
                </Grid>

            </Grid>
            <div className={classes.displayFlex}>
                <div className={classes.dashedBorder} />
                <span className={classes.borderBottomCopy}>OR</span>
                <div className={classes.dashedBorder} />
            </div>
        </>
    );
};

AddOnOneMany.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(AddOnOneMany);
