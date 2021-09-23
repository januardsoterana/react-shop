/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, CircularProgress, Backdrop, } from '@material-ui/core';
import MasterCard from '../../assets/images/paymentCard.svg';
import SummaryWrapper from './SummaryWrapper';
import { withOktaAuth } from '@okta/okta-react';
import { connect } from "react-redux";
import Skeleton from '@material-ui/lab/Skeleton';
import CreditCardBlock from './AddCreditCard/CreditCardBlock'
import { getCustomerCreditCards } from '../../api/booking-api'
import restClient from '../../api/restClient';
import Box from '@material-ui/core/Box';
import { getAuthUserInfo } from "../../state/ducks/Booking/Booking-Selectors"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    requestNoteCopy: {
        fontSize: '18px',
        textAlign: 'center',
        color: theme.palette.common.grey,
        fontWeight: 800,
        paddingBottom: '15px',
        borderBottom: `1px solid ${theme.palette.common.lightGrey}`,
        [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    borderBottom: {
        borderBottom: `1px solid ${theme.palette.common.lightGrey}`,
        width: '88%',
        margin: '22px 5px 2px 41px',
    },
    cardSelectionCopy: {
        textAlign: 'center',
        margin: '18px 0px 0px 0px',
        fontFamily: theme.typography.fontFamily,
        [theme.breakpoints.down('sm')]: {
            whiteSpace: 'nowrap',
            margin: '-50px 0px 30px 42px',
        },
        fontSize: "17px",
        color: "#42413D"
    },
    masterCard: {
        width: '223px',
        height: '163.07px',
        margin: '0% 2% 8% 2%',
        cursor: 'pointer'
    },
    selectedMasterCard: {
        width: '223px',
        height: '163.07px',
        margin: '0% 2% 8% 2%',
        cursor: 'pointer',
        border: '1px solid #767676',
        borderRadius: '22px'
    },
    addMasterCardView: {
        width: "280px",
        margin: "40% 2% 8% -10%"
    },
    MasterCardSecond: {
        width: '258px',
        height: '224.07px',
        margin: '11% 0% 0% 0%',
    },
    cardEnding: {
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.common.lightGrey[1],
        fontSize: '14px',
        cursor: 'pointer'
    },
    cardDetails: {
        margin: '-56% 0% 0% 29%',
    },
    AddCreditDetails: {
        margin: '-81% 0% 0% 6%',
    },
    cardDigit: {
        fontFamily: theme.typography.fontFamily,
        margin: '9px 0px 0px 0px',
        cursor: 'pointer'
    },
    proceedSelectedAction: {
        margin: '23% 0px 25px 24%',
        width: '50%',
    },
    proceedAddCard: {
        margin: '-44% 0px 25px 12%',
        width: '50%',
    },
    proceedSelectClick: {
        left: '0.05%',
        right: '55.09%',
        bottom: '66.36%',
        fontFamily: theme.typography.fontFamily,
        fontSize: '18px',
        lineHeight: '45px',
        width: '100%',
        textTransform: 'none',
        color: '#54575A',
        backgroundColor: '#FFDD30',
        '&:hover': {
            backgroundColor: '#b29a21',
        },
        [theme.breakpoints.down('sm')]: {
            width: '324px',
            height: '63px'
        },
    },
    leftDivider: {
        width: '42%',
        margin: '2px 2px 2px 15px',
    },
    rightDivider: {
        width: '42%',
    },
    addCardAction: {
        margin: '9% 0px 25px 24%',
        width: '50%',
    },
    borderBottomBetween: {
        borderBottom: `1px solid ${theme.palette.common.lightGrey[0]}`,
        width: '38%',
        margin: '0px 5px 7px 41px',
    },
    displayFlex: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    borderBottomCopy: {
        margin: '7px 0px 0px 25px',
    },
    leftSectionContainer: {
        backgroundColor: theme.palette.common.white,
        margin: 'auto',
        padding: '26px 22px',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#f3f3f3',
            padding: '0px',
        },
    },
    addCreditCard: {
        left: '0.05%',
        right: '55.09%',
        bottom: '66.36%',
        fontFamily: theme.typography.fontFamily,
        fontSize: '18px',
        lineHeight: '45px',
        width: '100%',
        textTransform: 'none',
        color: '#54575A',
        border: '1px solid #54575A',
        [theme.breakpoints.down('sm')]: {
            width: '324px',
            height: '63px',
            margin: '0px 0px 0px 0px',
        },
    },
    cardSelectionContainer: {
        position: 'relative',
        // [theme.breakpoints.down('sm')]: { width: '800px' },
    },
    addCreditCardCopy: {
        whiteSpace: 'nowrap',
        fontWeight: "600",
        fontSize: "21px"
    },
    textAlignEndTitle: {
        textAlign: 'end'
    },
    cardNumber: {
        width: '171%'
    },
    cardNumberCopy: {
        fontFamily: "AvenirNext",
        fontSize: "15px",
        lineHeight: "18px",
        color: "#989898"
    },
    inputExpirationMonth: {
        width: '147%'
    },
    savedCardText: {
        margin: '70px 0px 0px 21px !important',
        color: '#767676',
        [theme.breakpoints.down('sm')]: { whiteSpace: 'nowrap' },
    },
    defaultCopy: {
        margin: "65px 0px 0px 84px !important",
        fontWeight: '600'
    },
    borderOnePx: {
        border: '1px solid #D1D1D1',
        margin: '23px 0px 32px 0px',
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            margin: '23px 0px 32px 0px',
        },
    },
    borderOnePxMobile: {
        [theme.breakpoints.down('sm')]: {
            border: '1px solid #D1D1D1',
            margin: '23px 0px 32px 0px',
        },
    },
    closeBtn: {
        position: 'absolute',
        right: 'calc(50% - 377px)',
        top: '230px',
        fontSize: 30,
        cursor: 'pointer'
    }
}));

const payemtCardDetails = [
    {
        user_card_ending: 'User card ending',
        user_card_number: '**** **** **** 3782',
    },
    {
        user_card_ending: 'User card ending',
        user_card_number: '**** **** **** 3782',
    },
    {
        user_card_ending: 'User card ending',
        user_card_number: '**** **** **** 3782',
    },
];


const AppointmentHold = ({ goToNextPage, authUserInfo, oktaAuth }) => {
    const [addCreditCard, setCreditCard] = useState(false)
    const [addCardBlock, setCardBlock] = useState(false)
    const [savedCards, setSavedCards] = useState([])
    const [selectCard, setSelectCard] = useState(false)
    const [CardInfo, setCardInfo] = useState([])
    const [user, setUser] = useState({});


    const classes = useStyles();

    const handleAddCreditCard = () => {
        setCreditCard(true)
        setCardBlock(true)
    }

    const handleCardSelection = (cardKey) => {
        setSelectCard(!selectCard)
        setCardInfo(cardKey)
    }

    const onCloseBtn = () => {
        setCreditCard(false)
    }



    const getCards = async () => {
        const customerId = authUserInfo?.bookerID
        const { data, error } = await restClient.post(getCustomerCreditCards(customerId))
        console.log("saved card info", data)
        if (error) {
            console.log("credit card error ===>", error);
        }

        if (data) {
            setSavedCards(data.CreditCards)
        }
    }

    useEffect(async () => {

        await oktaAuth.getUser().then((res) => {
            setUser(res);
        });
        getCards();

    }, []);


    return (
        <>
            {!addCreditCard ? (
                <>
                    <SummaryWrapper title="APPOINTMENT HOLD" containerStyle={{ backgroundColor: '#ffffff' }}>
                        <Grid className={classes.leftSectionContainer}>
                            <Typography className={classes.requestNoteCopy}>
                                Card Selection
                            </Typography>
                            <div className={classes.borderOnePx} />
                            {savedCards?.length > 0 ?
                                <>
                                    <div className={classes.cardSelectionCopy}>
                                        Select credit card to hold your appointment.
                                    </div>
                                    <Typography className={classes.savedCardText}>Your saved Card</Typography>
                                    <Grid container spacing={3} className={classes.cardSelectionContainer}>
                                        {savedCards?.map((cardKey, idx) => (
                                            <Grid item sm={4} onClick={() => handleCardSelection(cardKey)}>
                                                <img
                                                    src={MasterCard}
                                                    alt=""
                                                    className={selectCard && CardInfo?.CreditCardID === cardKey?.CreditCardID ? classes.selectedMasterCard : classes.masterCard}
                                                />
                                                <div className={classes.cardDetails}>
                                                    <div className={classes.cardEnding}>User card ending</div>
                                                    <div className={classes.cardDigit}>{cardKey.CreditCard.Number}</div>
                                                    {/* <div className={classes.cardDigit}>{cardKey.user_card_number}</div> */}
                                                </div>
                                                {
                                                    idx === 0 &&
                                                    <Typography className={classes.defaultCopy}>Default</Typography>
                                                }
                                            </Grid>
                                        ))}
                                    </Grid>

                                </> : null}
                            {savedCards?.length === 0 ? <Typography>You don't have any payment method please add</Typography> : null}
                            <div className={classes.proceedSelectedAction}>
                                <Button onClick={goToNextPage} className={classes.proceedSelectClick} variant="outlined">
                                    Proceed with Selected
                                </Button>
                            </div>
                            <div />
                            <div className={classes.displayFlex}>
                                <div className={classes.borderBottomBetween} />
                                <span className={classes.borderBottomCopy}>OR</span>
                                <div className={classes.borderBottomBetween} />
                            </div>
                            <div className={classes.addCardAction}>
                                <Button className={classes.addCreditCard} variant="outlined" onClick={() => handleAddCreditCard()}>
                                    Add a Credit Card
                                </Button>
                            </div>
                        </Grid>
                    </SummaryWrapper>

                </>
            ) : (
                    <SummaryWrapper title="ADD A CREDIT CARD" containerStyle={{ backgroundColor: '#ffffff' }} addCardBlock={addCardBlock} classes={classes}>
                        <div className={classes.closeBtn} onClick={onCloseBtn}>
                            X
                        </div>
                        <Grid className={classes.leftSectionContainer} style={{ width: "754px" }}>
                            <CreditCardBlock classes={classes} payemtCardDetails={savedCards?.[0]} setCreditCard={setCreditCard} authUserInfo={authUserInfo} onUpdate={() => getCards()} />
                        </Grid>
                    </SummaryWrapper>
                )}
        </>

    );
};

const mapStateToProps = (state) => ({
    authUserInfo: getAuthUserInfo(state),
});

export default connect(mapStateToProps, null)(withOktaAuth(AppointmentHold));
