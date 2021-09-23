import React, { useState } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import MasterCard from '../../../assets/images/paymentCard.svg';


const AddCreditCard = ({ classes, payemtCardDetails, setCardBlock }) => {

    const handleSetCardBlock = () => {
        setCardBlock(true)
    }

    return (
        <>
            <Grid container spacing={3} className={classes.cardSelectionContainer} style={{ height: "700px" }}>
                <Grid item xs={4} style={{ margin: '0 auto' }}>
                    <img
                        src={MasterCard}
                        alt=""
                        className={classes.addMasterCardView}
                    />
                    <div className={classes.AddCreditDetails}>
                        <div className={classes.addCreditCardCopy}>Credit Card</div>
                        <div className={classes.cardDigit} style={{ margin: "28px 0px 0px 0px", fontWeight: "600" }}>{payemtCardDetails.user_card_number}</div>
                        <Grid>
                            <Typography style={{ fontSize: "10px" }}>VALID THRU</Typography>
                            <Typography style={{ fontWeight: "600" }}>8/24</Typography>
                            <Typography style={{ fontWeight: "600" }}>Emily</Typography>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <div className={classes.proceedAddCard}>
                <Typography style={{ whiteSpace: "nowrap", marginBottom: '50px' }}>We need a credit card to hold your appointment.</Typography>
                <Button className={classes.proceedSelectClick} variant="outlined" onClick={() => handleSetCardBlock()}>
                    Add a Credit Card
                </Button>
            </div>
        </>
    )
}



export default AddCreditCard