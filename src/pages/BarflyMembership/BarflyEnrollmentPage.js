import {
    Box,
    Button,
    Grid, TextField, Typography, withStyles,
} from '@material-ui/core';
import {object} from 'prop-types';
import React, {useEffect, useState, useCallback} from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link, withRouter} from 'react-router-dom';
import Media from 'react-media';
import {withOktaAuth} from '@okta/okta-react';
import {MOBILE_BREAKPOINT} from '../../Helpers/breakpoints';

import {getCustomer, updateCustomer, findMemberships} from '../../api/booking-api';
import restClient from '../../api/restClient';
import usStates from './Partials/usStates.json';
import BackdropCircularProgress from '../../app/Components/common/BackdropCircularProgress';
import {getUpdatedCustomer, getNewCard, getChosenStore} from "../../state/ducks/Barfly/Barfly-Selectors";
import {setUpdatedCustomer, setCard} from "../../state/ducks/Barfly/Barfly-Actions";
import MasterCard from '../../assets/images/paymentCard.svg';

const styles = (theme) => ({
    container: {
        maxWidth: '1367px',
        width: '100%',
        margin: 'auto',
        padding: '34px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: '19px',
        },
    },
    fieldContainer: {
        backgroundColor: '#fff',
        padding: '15px 21px 25px 21px',
        margin: '10px 0 35px',
    },
    textField: {
        width: '100%',
        margin: '14px 15px',
        '& input': {
            padding: '10px 0',
            fontSize: '20px',
        },
        '& label': {
            fontSize: '18px',
        },
        '& select': {
            padding: '10px 0',
            fontSize: '20px',
        },
        '& option': {
            padding: '15px',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '14px 8px',
        },
    },
    singleLineTextFieldsContainer: {
        display: 'flex',
    },
    fieldContainerTitle: {
        fontFamily: 'MrsEavesSmallCaps',
        color: '#42413D',
        fontSize: '16px',
    },
    mainTitle: {
        textTransform: 'uppercase',
        fontFamily: 'DINCondensed',
        fontSize: '42px',
        color: '#42413D',
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '31px',
        },
    },
    titleContainer: {
        display: 'flex',
    },
    displayFlex: {
        display: 'flex',
        alignItems: 'center',
        color: '#42413D',
    },
    subTitle: {
        textAlign: 'center',
        fontSize: '18px',
        marginBottom: '25px',
        fontWeight: '400',
        textTransform: 'none',
        fontFamily: 'AvenirNext',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
        },
    },
    submitButton: {
        maxWidth: '378px',
        width: '100%',
        height: '63px',
        fontSize: '18px',
        margin: 'auto',
    },
    addressOneWidth: {
        width: '70%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '100%',
        },
    },
    addressTwoWidth: {
        width: '30%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '100%',
        },
    },
    cardSelectionContainer: {
        position: 'relative',
        [theme.breakpoints.down('sm')]: { maxWidth: '800px' },
        display: 'flex',
        justifyContent: 'center',
        marginTop: 40
    },

    cardColumn: {
        position: 'relative',
        maxWidth: '223px',
        height: '163.07px',
        margin: '0% 2% 8% 2%',
        width: '33%'
    },
    masterCard: {
        cursor: 'pointer',
        width: '100%',
    },
    cardDetails: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    cardEnding: {
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.common.lightGrey[1],
        fontSize: '14px',
        cursor: 'pointer'
    },
    cardDigit: {
        fontFamily: theme.typography.fontFamily,
        margin: '9px 0px 0px 0px',
        cursor: 'pointer'
    }
});

const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const yearArray = [2020, 2021, 2022, 2023];

// TODO make this component dynamic - remove repetition
const BarflyEnrollmentPage = ({classes, oktaAuth, history, updatedCustomer, setCustomer, newCard, setNewCard, preferredShop}) => {

    const [user, setUser] = useState(updatedCustomer);
    const [card, setCard] = useState(newCard || {});
    const [birth, setBirth] = useState({})
    const [maxDays, setMaxDays] = useState(31)
    
    useEffect(async () => {
        if (!updatedCustomer) {
            const res = await oktaAuth.getUser()
            if (res.bookerID) {
                const customer = await restClient.post(getCustomer(res.bookerID))
                setUser(customer.data?.Customer?.Customer)
            }
        }
    }, [setUser, updatedCustomer]);

    useEffect(() => {
        if (user?.DateOfBirthOffset) {
            const [year, month, day, _extra] = user.DateOfBirthOffset.split('-');

            console.log('DateOfBirthOffset:', year, month, day)

            const propsBirth = {
                year: parseInt(year) - 1,
                month: parseInt(month) - 1, 
                day: parseInt(day.split('T')[0]) - 1
            }
            setBirth(propsBirth)
        }
    }, [user])
    if (!preferredShop.contact) {
        history.push('/barfly-membership')
    }

    const goToConfirmBarfly = async () => {
        let dateOfBirthOffset = null;

        if (birth.year !== undefined && birth.month !== undefined && birth.day !== undefined) {
            dateOfBirthOffset = new Date(birth.year, birth.month, birth.day).toISOString()
            dateOfBirthOffset = `${dateOfBirthOffset.split('T')[0]}T00:00:00+00:00`
        }

        setCustomer({
            ...user,
            DateOfBirthOffset: dateOfBirthOffset
        })
        setNewCard(card)
        history.push('/barfly-confirm')
    };

    const onFieldChange = useCallback(
        (e) => {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        },
        [setUser, user]
    )

    const onCardFieldChange = useCallback(
        (e) => {
            setCard({
                ...card,
                [e.target.name]: e.target.value
            })
        },
        [setCard, card]
    )

    const onCardAddressFieldChange = useCallback(
        (e) => {
            setCard({
                ...card,
                Address: {
                    ...card.Address,
                    [e.target.name]: e.target.value
                } 
            })
        },
        [setCard, card]
    )

    const onAdressFieldChange = useCallback(
        (e) => {
            setUser({
                ...user,
                Address: {
                    ...user.Address,
                    [e.target.name]: e.target.value
                }
            })
        },
        [setUser, user]
    )


    if (!user) {
        return <BackdropCircularProgress/>;
    }
    const handleBirthChange = (event) => {

        const newBirth = {
            ...birth,
            [event.target.name]: event.target.value !== undefined ? parseInt(event.target.value) : undefined
        }

        if (event.target.name !== 'day') {
            // console.log(new Date((newBirth.year || 2000), (newBirth.month || 0) + 1, 0), new Date((newBirth.year || 2000), (newBirth.month || 0) + 1, 0).getDate());
            setMaxDays(new Date((newBirth.year || 2000), (newBirth.month || 0) + 1, 0).getDate())
        }

        setBirth(newBirth)
    }
    const handleChange = (event, setFunc) => {
    }

    if (user) {
        return (
            <Grid className={classes.container}>
                <Media
                    query={{maxWidth: MOBILE_BREAKPOINT}}
                >
                    {
                        (matches) => (matches
                            ? (
                                <Grid className={classes.titleContainer}>
                                    <Grid style={{paddingTop: '12px'}}>
                                        <Link to="/barfly-membership" className={classes.displayFlex}>
                                            <ArrowBackIosIcon style={{fontSize: '34px'}}/>
                                        </Link>
                                    </Grid>
                                    <Typography className={classes.mainTitle}>
                                        <Box>
                                            Lets Get
                                        </Box>
                                        <Box>
                                            A Bit More Information
                                        </Box>
                                        <Box className={classes.subTitle}>
                                            and complete your barfly membership
                                        </Box>
                                    </Typography>
                                </Grid>
                            )
                            : (
                                <Grid className={classes.titleContainer}>
                                    <Grid style={{paddingTop: '12px'}}>
                                        <Link to="/barfly-membership" className={classes.displayFlex}>
                                            <ArrowBackIosIcon style={{fontSize: '34px'}}/>
                                            <Typography style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                paddingTop: '2px'
                                            }}>Back</Typography>
                                        </Link>
                                    </Grid>
                                    <Typography className={classes.mainTitle}>
                                        Lets Get A Bit More Information
                                        <Box className={classes.subTitle}>
                                            and complete your barfly membership
                                        </Box>
                                    </Typography>
                                </Grid>
                            ))
                    }
                </Media>

                <Typography className={classes.fieldContainerTitle}>GENERAL INFORMATION</Typography>
                <Grid className={classes.fieldContainer}>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="First Name"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={user.FirstName}
                            name="FirstName"
                            onChange={onFieldChange}
                            // helperText={firstNameError}
                        />
                        <TextField
                            label="Last Name"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={user.LastName}
                            name="LastName"
                            onChange={onFieldChange}
                        />
                    </Grid>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="Email"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={user.Email}
                            name="Email"
                            onChange={onFieldChange}
                        />
                    </Grid>
                    <Media
                        query={{maxWidth: MOBILE_BREAKPOINT}}
                    >
                        {
                            (matches) => (matches
                                ? (
                                    <>
                                        <Grid className={classes.singleLineTextFieldsContainer}>
                                            <TextField
                                                label="Address 1"
                                                className={`${classes.textField} ${classes.addressOneWidth}`}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                name="Street1"
                                                value={user.Address.Street1}
                                                onChange={onAdressFieldChange}
                                            />
                                        </Grid>
                                        <Grid className={classes.singleLineTextFieldsContainer}>

                                            <TextField
                                                label="Address 2"
                                                className={`${classes.textField} ${classes.addressTwoWidth}`}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                name="Street2"
                                                value={user.Address.Street2}
                                                onChange={onAdressFieldChange}
                                            />
                                        </Grid>
                                    </>
                                )
                                : (
                                    <Grid className={classes.singleLineTextFieldsContainer}>
                                        <TextField
                                            label="Address 1"
                                            className={`${classes.textField} ${classes.addressOneWidth}`}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="Street1"
                                            value={user.Address.Street1}
                                            onChange={onAdressFieldChange}
                                        />
                                        <TextField
                                            label="Address 2"
                                            className={`${classes.textField} ${classes.addressTwoWidth}`}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            name="Street2"
                                            value={user.Address.Street2}
                                            onChange={onAdressFieldChange}
                                        />
                                    </Grid>
                                ))
                        }
                    </Media>

                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="City"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={user.Address.City}
                            name="City"
                            onChange={onAdressFieldChange}
                        />
                        <TextField
                            select
                            label="State"
                            className={classes.textField}
                            SelectProps={{
                                native: true,
                            }}
                            value={user.Address.State}
                            name="State"
                            onChange={onAdressFieldChange}
                        >
                            {usStates.map((state) => (
                                <option style={{padding: '20px'}} key={state['alpha-2']} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="Postal Code"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={user.Address.Zip}
                            name="Zip"
                            onChange={onAdressFieldChange}
                        />
                        <TextField
                            label="Phone Number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={user.CellPhone}
                            name="CellPhone"
                            onChange={onFieldChange}
                        />
                    </Grid>
                </Grid>
                <Typography className={classes.fieldContainerTitle}>PAYMENT INFORMATION</Typography>
                {
                    user.CustomerCreditCards && user.CustomerCreditCards.length > 0 && <div className={classes.cardSelectionContainer}>
                    {user.CustomerCreditCards?.map((cardKey) => (
                        <div className={classes.cardColumn}>
                            <img
                                src={MasterCard}
                                alt=""
                                className={classes.masterCard}
                            />
                            <div className={classes.cardDetails}>
                                <div className={classes.cardEnding}>User card ending</div>
                                <div className={classes.cardDigit}>{cardKey.CreditCard.Number}</div>
                                {/* <div className={classes.cardDigit}>{cardKey.user_card_number}</div> */}

                            </div>
                        </div>
                    ))}
                </div>
                }
                {
                    (!user.CustomerCreditCards || user.CustomerCreditCards.length === 0) && <Grid className={classes.fieldContainer}>
                        <Grid className={classes.singleLineTextFieldsContainer}>
                            <TextField
                                label="Name on Card"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={card.NameOnCard}
                                onChange={onCardFieldChange}
                                name="NameOnCard"
                            />
                        </Grid>
                        <Grid className={classes.singleLineTextFieldsContainer}>
                            <TextField
                                label="Credit Card Number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={card.Number}
                                onChange={onCardFieldChange}
                                name="Number"
                            />
                        </Grid>
                        <Grid className={classes.singleLineTextFieldsContainer}>
                            <TextField
                                label="City"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={card.Address?.City}
                                onChange={onCardAddressFieldChange}
                                name="City"
                            />
                            <TextField
                                select
                                label="State"
                                // value={currency}
                                // onChange={handleChange}
                                className={classes.textField}
                                SelectProps={{
                                    native: true,
                                }}
                                value={card.Address?.State}
                                onChange={onCardAddressFieldChange}
                                name="State"
                            >
                                {usStates.map((state) => (
                                    <option style={{padding: '20px'}} key={state['alpha-2']} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid className={classes.singleLineTextFieldsContainer}>
                            <TextField
                                label="CVV"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={card.SecurityCode}
                                onChange={onCardAddressFieldChange}
                                name="SecurityCode"
                            />
                           <TextField
                                select
                                label="Month"
                                // value={currency}
                                className={classes.textField}
                                SelectProps={{
                                    native: true,
                                }}
                                value={birth.month}
                                name="month"
                                onChange={handleBirthChange}

                            >
                                <option>Select Month</option>
                                {
                                    (new Array(12).fill()).map(
                                        (_i, idx) => <option style={{padding: 20}} value={idx} key={idx}>
                                            {idx + 1}
                                        </option>
                                    )
                                }
                            </TextField>
                            <TextField
                                label="Year"
                                className={classes.textField}
                                select
                                SelectProps={{
                                    native: true,
                                }}
                                name="year"
                                onChange={handleBirthChange}
                                value={birth.year}
                            >
                                <option>Select Year</option>
                                {
                                    (new Array(120).fill()).map(
                                        (_i, idx) => <option style={{padding: 20}} value={1919 + idx} key={idx}>
                                            {1920 + idx}
                                        </option>
                                    )
                                }
                            </TextField>
                        </Grid>
                    </Grid>
                }
                
                <Typography className={classes.fieldContainerTitle}>DATE OF BIRTH</Typography>
                <Typography style={{color: '#767676', fontSize: '13px'}}>Make sure you get your free birth.day
                    blowout!</Typography>
                <Grid className={classes.fieldContainer}>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                    <TextField
                            label="Month"
                            className={classes.textField}
                            SelectProps={{
                                native: true,
                            }}
                            select
                            value={birth.month}
                            name="month"
                            onChange={handleBirthChange}
                        >
                            <option>Select Month</option>
                            {
                                (new Array(12).fill()).map(
                                    (_i, idx) => <option style={{padding: 20}} value={idx} key={idx}>
                                        {idx + 1}
                                    </option>
                                )
                            }
                        </TextField>
                        <TextField
                            label="Day"
                            className={classes.textField}
                            SelectProps={{
                                native: true,
                            }}
                            select
                            value={birth.day}
                            name="day"
                            onChange={handleBirthChange}
                        >
                            <option>Select Day</option>
                            {
                                (new Array(maxDays).fill()).map(
                                    (_i, idx) => <option style={{padding: 20}} value={idx} key={idx}>
                                        {idx + 1}
                                    </option>
                                )
                            }
                        </TextField>
                        <TextField
                            label="Year"
                            className={classes.textField}
                            select
                            SelectProps={{
                                native: true,
                            }}
                            name="year"
                            onChange={handleBirthChange}
                            value={birth.year}
                        >
                            <option>Select Year</option>
                            {
                                (new Array(120).fill()).map(
                                    (_i, idx) => <option style={{padding: 20}} value={1919 + idx} key={idx}>
                                        {1920 + idx}
                                    </option>
                                )
                            }
                        </TextField>
                    </Grid>
                </Grid>
                <Grid style={{
                    width: '100%', display: 'flex', alignItems: 'center', padding: '30px',
                }}
                >
                    <Button variant="contained" color="primary" className={classes.submitButton}
                            onClick={() => goToConfirmBarfly()}>
                        Review And Complete
                    </Button>
                </Grid>
            </Grid>
        );
    }
    return null;
};

BarflyEnrollmentPage.propTypes = {
    classes: object.isRequired,
    oktaAuth: object.isRequired,
    history: object.isRequired,
};

const mapStateToProps = (state) => ({
    updatedCustomer: getUpdatedCustomer(state),
    newCard: getNewCard(state),
    preferredShop: getChosenStore(state),
});

const mapDispatchToProps = (dispatch) => ({
    setCustomer: bindActionCreators(setUpdatedCustomer, dispatch),
    setNewCard: bindActionCreators(setCard, dispatch)
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withOktaAuth(BarflyEnrollmentPage))));

