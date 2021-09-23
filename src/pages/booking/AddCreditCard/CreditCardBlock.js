import React, { useState } from 'react';
import {
    Button, Grid,
    Input, Typography,
} from '@material-ui/core';
import MasterCard from '../../../assets/images/paymentCard.svg';
import Checkbox from '@material-ui/core/Checkbox';
import { addCreditCardCustomer } from '../../../api/booking-api'
import restClient from '../../../api/restClient';


const CreditCardBlock = ({ classes, payemtCardDetails, setCardBlock, setCreditCard, authUserInfo, onUpdate }) => {
    console.log("block user info",authUserInfo)
    const [cardNumber, setCardNumber] = React.useState('');
    const [dateMonth, setDateMonth] = React.useState('')
    const [cvv, setCVV] = React.useState('')
    const [cardMessage, setCardMessage] = React.useState([])
    const [limiMessage, setLimitMessage] = React.useState('')
    const [messageAvail, setMessageAvail] = React.useState(false);
    const [limitMessageAvail, setLimitMessageAvail] = React.useState(false);


    const handleSetCardBlock = () => {
        setCardBlock(true)
    }

    const handleCardNumber = (e) => {
        setCardNumber(e.target.value);
    }

    const handleExiprationDate = (e) => {
        setDateMonth(e.target.value)
    }

    const handleCardCVV = (e) => {
        setCVV(e.target.value)
    }

    const addCreditCardToCustomer = async () => {
        // todo - api injected for add credit card - just need to pass - cardNumber - date/month - cvv
        console.log(cardNumber, cvv)
        const customerId = authUserInfo?.bookerID
        const nameOnCard = authUserInfo?.firstname
        const res = await restClient.post(addCreditCardCustomer(cardNumber, cvv, customerId, nameOnCard));

        if (res?.data?.ErrorMessage === null) {
            setCardMessage(res?.data?.ArgumentErrors?.[0]?.ErrorMessage)
            setMessageAvail(true);
            setLimitMessageAvail(false);
            setCreditCard(false)
        }
        if (res?.data?.ErrorCode === 200) {
            setCardMessage(res?.data?.ArgumentErrors?.[0]?.ErrorMessage)
            setMessageAvail(true);
            setLimitMessageAvail(false);
        }
        if (res.data.ErrorCode === 790) {
            setLimitMessage(res?.data?.ErrorMessage)
            setMessageAvail(false);
            setLimitMessageAvail(true);
            // setCreditCard(false)
        }
        if (res.data.ErrorCode === 0) {
            onUpdate();
        }
    }

    return (
        <>
            <Grid container spacing={3} className={classes.cardSelectionContainer} style={{ height: "700px" }}>
                {console.log(cardMessage)}
                <Grid item xs={4} style={{ margin: '0 auto' }}>
                    <img
                        src={MasterCard}
                        alt=""
                        className={classes.addMasterCardView}
                    />
                    <div className={classes.AddCreditDetails}>
                        <div className={classes.addCreditCardCopy}>Credit Card</div>
                        <div className={classes.cardDigit} style={{ margin: "28px 0px 0px 0px", fontWeight: "600" }}>{payemtCardDetails?.CreditCard?.Number}</div>
                        <Grid>
                            <Typography style={{ fontSize: "10px" }}>VALID THRU</Typography>
                            <Typography style={{ fontWeight: "600" }}>8/24</Typography>
                            <Typography style={{ fontWeight: "600" }}>{authUserInfo?.firstname}</Typography>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <div className={classes.proceedAddCard}>
                <form >
                    <Typography className={classes.cardNumberCopy}>Card Number</Typography>
                    <Input
                        classes={{
                            root: classes.cardNumber,
                        }}
                        id="standard-adornment-amount"
                        // error={errors.email}
                        value={cardNumber}
                        required
                        onChange={(e) => handleCardNumber(e)}
                        startAdornment=""
                        placeholder="0000-0000-0000-0000"
                        className={classes.enterYourEmail}
                    />
                    <Grid container style={{ margin: '42px 0px 0px 0px', width: '232%' }}>
                        <Grid item xs={4} style={{ margin: '0px 20% 0px 0px' }}>
                            <Typography className={classes.cardNumberCopy}>Expiration Date</Typography>
                            <Input
                                classes={{
                                    root: classes.inputExpirationMonth,
                                }}
                                id="standard-adornment-amount"
                                // error={errors.email}
                                value={dateMonth}
                                required
                                onChange={(e) => handleExiprationDate(e)}
                                startAdornment=""
                                placeholder="MM/DD"
                                className={classes.enterYourEmail}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.cardNumberCopy}>CVV</Typography>
                            <Input
                                classes={{
                                    input: classes.input,
                                }}
                                id="standard-adornment-amount"
                                // error={errors.email}
                                value={cvv}
                                required
                                onChange={(e) => handleCardCVV(e)}
                                startAdornment=""
                                placeholder="CVV"
                                className={classes.enterYourEmail}
                                
                            />
                        </Grid>
                    </Grid>
                    <Grid style={{display: "flex", margin: "35px 0px 35px 183px"}}>
                        <Checkbox
                            defaultChecked
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                        <Typography style={{ whiteSpace: "nowrap", margin: '10% 0 10% 0%' }}>Make Default?</Typography>
                    </Grid>

                    <Button className={classes.proceedSelectClick} style={{ marginLeft: '88px' }} variant="outlined" onClick={() => addCreditCardToCustomer()}>
                        Add Card
                    </Button>
                    {messageAvail &&
                        <Typography style={{ whiteSpace: 'nowrap', margin: "14px 0px 0px 104px", textAlign: "center", color: "red" }}>Credit Card Number {cardMessage}</Typography>
                    }
                    {limitMessageAvail &&
                        <Typography style={{ whiteSpace: 'nowrap', margin: "14px 0px 0px 0px", textAlign: "center", color: "red" }}>{limiMessage}</Typography>
                    }
                </form>
            </div>
        </>
    )
}

export default CreditCardBlock