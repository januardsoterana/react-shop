/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Box, Button, Grid, IconButton, Typography,
} from '@material-ui/core';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SummaryWrapper from './SummaryWrapper';
import {resetOnGuestChange, setNumberOfGuests} from '../../state/ducks/Booking/Booking-Actions';
import {getNumberOfGuests} from '../../state/ducks/Booking/Booking-Selectors';
import {MOBILE_BREAKPOINT} from '../../Helpers/breakpoints';
import TreatmentDetailsModal from "../../app/Components/TreatmentDetailsModal";
import ContactModal from "../../app/Components/ContactModal";
import appConfig from "../../app.config";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        padding: '60px',
    },
    buttonsWrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    button: {
        width: '438px',
        height: '73px',
        margin: '12px 0',
        backgroundColor: theme.palette.common.white,
        textTransform: 'none',
        fontSize: '18px',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 28px',
            maxWidth: '100%',
            width: '373px',
            height: '83px',
        },

    },
    selected: {
        backgroundColor: theme.palette.primary.main,
        fontWeight: '800',
        '&:hover': {
            backgroundColor: theme.palette.common.hover[1],
        },
    },
    mobileOnly: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    selectGuest: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        margin: '50px 0',
    },
    text: {
        textAlign: 'center',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            whiteSpace: 'nowrap',
            margin: '0px 0px 0px 232px !important',
        },
    },
    icons: {
        fontSize: '40px',
        fontWeight: '100',
    },
    changeGuestButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '30px 0',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '0px 0px 0px 232px',
        },
    },
    numberOfGuests: {
        fontSize: '26px',
        fontWeight: 800,
        display: 'flex',
        margin: '0 33px',
        paddingTop: '3px',
    },
    moreGuestButton: {
        margin: 'auto',
    },
}));

const HowManySummary = ({
                            totalGuests,
                            setTotalGuests,
                            goToNextPage,
                            resetData,
                        }) => {
    const [contactModal, setContactModal] = useState(false);
    const classes = useStyles();
    const [preferredShopChoices, setPreferredShopChoices] = useState([]);
    const [preferredStartTimeChoices, setPreferredStartTimeChoices] = useState([]);
    const [partySizeChoices, setPpartySizeChoices] = useState([]);

    useEffect(() => {
        window
            .fetch(`https://cors-anywhere.herokuapp.com/https://${appConfig.wufoo.subDomain}.wufoo.com/api/v3/forms/${appConfig.wufoo.genericPartyFormId}/fields.json`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(appConfig.wufoo.apiKey + ':password')}`
                },
                redirect: 'follow'
            })
            .then((response) => response.json())
            .then(data => {
                const fields = data?.Fields || [];
                fields.forEach(field => {
                    if (field['Title'] === 'Preferred Shop') {
                        setPreferredShopChoices(field['Choices'].map(choice => choice.Label || ''));
                    } else if (field['Title'] === 'Select a Choice') {
                        setPreferredStartTimeChoices(field['Choices'].map(choice => choice.Label || ''));
                    } else if (field['Title'] === 'Party Size') {
                        setPpartySizeChoices(field['Choices'].map(choice => choice.Label || ''));
                    }
                });
            })
            .catch(error => console.log('error in wufoo api ', error));
    }, []);

    const handleMeClick = () => {
        if (totalGuests > 0) {
            resetData();
        }

        setTotalGuests(0);
        goToNextPage();
    };

    const addGuest = () => {
        if (totalGuests < 4) {
            setTotalGuests(totalGuests + 1);
        }
    };

    const removeGuest = () => {
        if (totalGuests > 1) {
            setTotalGuests(totalGuests - 1);
        }
    };

    const handleGuestsClick = () => {
        if (!(totalGuests > 0)) {
            resetData();
            addGuest();
        }
    };

    return (
        <SummaryWrapper
            title="WHO&apos;S COMING?"
            nextButtonEnabled={totalGuests}
            onButtonClick={() => goToNextPage()}
        >
            <Grid className={classes.container}>
                <Grid className={classes.buttonsWrapper}>
                    <Button
                        onClick={handleMeClick}
                        className={`${classes.button} ${totalGuests === 0 ? classes.selected : ''}`}
                        variant="outlined"
                    >
                        Just Me
                    </Button>
                    <Button
                        onClick={() => handleGuestsClick()}
                        className={`${classes.button} ${totalGuests > 0 ? classes.selected : ''}`}
                        variant="outlined"
                    >
                        Me & Guest
                    </Button>
                </Grid>
                {totalGuests > 0 ? (
                    <Grid className={classes.selectGuest}>
                        <Typography className={classes.text}>
                            <Box fontSize="18px" marginBottom="12px">
                                How Many Guests?
                            </Box>
                            <Box fontSize="15px" fontStyle="oblique">
                                You may book up to 4 guests.
                            </Box>
                        </Typography>
                        <Grid className={classes.changeGuestButtons}>
                            <IconButton onClick={removeGuest}>
                                <RemoveCircleOutlineRoundedIcon className={classes.icons}/>
                            </IconButton>
                            <Typography className={classes.numberOfGuests}>
                                {totalGuests}
                            </Typography>
                            <IconButton onClick={addGuest}>
                                <AddCircleOutlineRoundedIcon className={classes.icons}/>
                            </IconButton>
                        </Grid>
                        <Button
                            onClick={goToNextPage}
                            className={`${classes.button} ${classes.selected} ${classes.mobileOnly}`}
                            variant="outlined"
                        >
                            Next
                        </Button>
                        <Grid style={{textAlign: 'center'}}>
                            <Button variant="text" className={classes.moreGuestButton}
                                    onClick={() => setContactModal(true)}>
                                I want to book more than 4
                            </Button>
                            {contactModal ? (
                                <ContactModal
                                    preferredShopChoices={preferredShopChoices}
                                    preferredStartTimeChoices={preferredStartTimeChoices}
                                    partySizeChoices={partySizeChoices}
                                    onClose={() => setContactModal(false)}
                                />
                            ) : null}
                        </Grid>
                    </Grid>
                ) : null}
            </Grid>
        </SummaryWrapper>
    );
};

const mapStateToProps = (state) => ({
    totalGuests: getNumberOfGuests(state),
});

const mapDispatchToProps = (dispatch) => ({
    setTotalGuests: bindActionCreators(setNumberOfGuests, dispatch),
    resetData: bindActionCreators(resetOnGuestChange, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HowManySummary);
