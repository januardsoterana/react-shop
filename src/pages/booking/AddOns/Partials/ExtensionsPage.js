/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import {
    Button, Checkbox, Grid, Typography, withStyles,
} from '@material-ui/core';
import React, {useState} from 'react';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setExtensions } from '../../../../state/ducks/Booking/Booking-Actions';
import { getExtensions, getNumberOfGuests, isGuestWithDifferentServices } from '../../../../state/ducks/Booking/Booking-Selectors';
import { MOBILE_BREAKPOINT } from '../../../../Helpers/breakpoints'
import SelectUserGuest from '../Common/SelectUserGuest';

const styles = (theme) => ({
    slotButton: {
        width: '438px',
        height: '72px',
        margin: '24px 0 5px',
        fontSize: '18px',
        color: '#42413D',
        backgroundColor: theme.palette.common.white,
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
        border: 'none',
        lineHeight: '1.5',
        borderRadius: 'none',
        '&:hover': {
            border: 'none',
        },
        [theme.breakpoints.down('sm')]: {
            width: '366px',
            margin: '24px auto 0',
        },
        textTransform: 'none',
    },
    selected: {
        fontWeight: '800',
        backgroundColor: '#FFDD30',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        padding: '31px 0 0',
        backgroundColor: theme.palette.common.white,
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.06)',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            backgroundColor: '#f3f3f3',
            boxShadow: 'none',
        }
    },
    selectContainer: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 0'
    },
    content: {
        textAlign: 'left',
        padding: '0px 0px 0px 21px',
        width: '100%'
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
    differentServiceCard: {
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center'
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
    }
});

// `

const ExtensionsPage = ({
    classes, setExtensionAction, extensions, goToNextPage, guests, isGuestWithDifferentServices
}) => {

    const [selectedUser, setSelectedUser] = useState('Me')
    const [isDifferentServiceEnabled, setIsDifferentServiceEnabled] = useState(false)
    
    return <>
        {
            guests >= 1 && <Grid className={classes.container}>
                <Grid className={classes.content}>
                    <Typography className={classes.addOnName}>
                        Adds approximately 20 mins to your service
                    </Typography>
                </Grid>
                <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 34 }}>
                    <InfoRoundedIcon />
                    <Typography style={{ margin: '3px 0 0 5px' }}>
                        Learn about our extension policy
                        {' '}
                        <Link to="">here</Link>
                        .
                    </Typography>
                </Grid>
                <Grid className={classes.buttonContainerGrid}>
                    <Button
                        variant="contained"
                        className={classes.buttonContainer}
                        onClick={() => skipAddOns()}
                    >
                        No extensions in our party
                    </Button>
                </Grid>
                {
                    !isGuestWithDifferentServices && 
                    <Grid className={classes.differentServiceCard}>
                        <Checkbox
                            checked={isDifferentServiceEnabled}
                            onClick={() => {
                                setIsDifferentServiceEnabled(!isDifferentServiceEnabled)
                            }}
                            className={classes.checkbox}
                        />
                        <Typography >
                            My guests and I will be will be getting different extensions
                        </Typography>
                    </Grid>
                }
                {
                    (isDifferentServiceEnabled || isGuestWithDifferentServices) &&
                    <div style={{width: '100%', padding: '20px 0 0'}}>
                        <SelectUserGuest setSelectedUser={setSelectedUser} isDifferentServiceEnabled={isDifferentServiceEnabled} isExtension />
                    </div>
                }
            </Grid>
        }
        <Grid className={classes.selectContainer}>
            {
                !guests && <>
                    <Grid className={classes.content}>
                        <Typography align="center">
                            Adds approximately 20 mins to your service
                        </Typography>
                    </Grid>
                    <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 34 }}>
                        <InfoRoundedIcon />
                        <Typography style={{ margin: '3px 0 0 5px' }}>
                            Learn about our extension policy
                            {' '}
                            <Link to="">here</Link>
                            .
                        </Typography>
                    </Grid>
                </>
            }
            <Button
                onClick={() => {
                    if (isDifferentServiceEnabled || isGuestWithDifferentServices) {
                        setExtensionAction({
                            ...(extensions || {}),
                            [selectedUser]: false
                        });
                    } else {
                        setExtensionAction(false)
                    }

                    if (!guests || (!isDifferentServiceEnabled && !isGuestWithDifferentServices && guests) || (extensions && Object.keys(extensions).length > guests)) {
                        goToNextPage();
                    }
                }}
                className={`${classes.slotButton} ${((extensions && extensions[selectedUser] === false) || extensions === false ) ? classes.selected : ''}`}
                variant="outlined"
                color="primary"
            >
                No
            </Button>
            <Button
                onClick={() => {
                    if (isDifferentServiceEnabled) {
                        setExtensionAction({
                            ...(extensions || {}),
                            [selectedUser]: true
                        })
                    } else {
                        setExtensionAction(true)
                    }
                    if (!guests || (!isDifferentServiceEnabled && guests) || (extensions && Object.keys(extensions).length >= guests)) {
                        goToNextPage();
                    }
                }}
                className={`${classes.slotButton} ${((extensions && extensions[selectedUser] === true) || extensions === true) ? classes.selected : ''}`}
                variant="outlined"
                color="primary"
            >
                Yes
                <br />
                $20
            </Button>
        </Grid>
    </>
};

const mapDispatchToProps = (dispatch) => ({
    setExtensionAction: bindActionCreators(setExtensions, dispatch),
});

const mapStateToProps = (state) => ({
    extensions: getExtensions(state),
    guests: getNumberOfGuests(state),
    isGuestWithDifferentServices: isGuestWithDifferentServices(state)
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ExtensionsPage));
