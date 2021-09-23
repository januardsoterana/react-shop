/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, FormControl, Input,
} from '@material-ui/core';
import DryBarFooter from './dryBarFooter';

const useStyles = makeStyles(() => ({
    headerCopy: {
        color: '#42413D',
        padding: '100px 2px 20px 0px',
        textAlign: 'center',
        fontSize: '38px',
        lineHeight: '40px',
        fontFamily: 'DINCondensed',
    },
    containerOffOrder: {
        height: '392px',
        background: '#f5f4f0;',

    },
    subscribeCopy: {
        textAlign: 'center',
        fontFamily: 'AvenirNext',
        fontSize: '17px',
    },
    enterYourEmail: {
        width: '100%',
        margin: '0 20px',
        height: '40px',
    },
    subscribeEmail: {
        background: '#54575A',
        borderRadius: '0px',
        color: '#FFFFFF',
        fontSize: '13px',
        width: '124px',
        height: '40px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
        },
    },
    subscribeEmailForm: {
        display: 'flex',
        flexDirection: 'row',
        width: '30%',
        margin: '30px auto',
        minWidth: '500px',
    },
    input: {
        '&::placeholder': {
            fontStyle: 'oblique',
        },
    },

}));

export default function GetOffer() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.containerOffOrder}>
                <div className={classes.headerCopy}>
                    GET 15% OFF YOUR FIRST ORDER
                </div>
                <div className={classes.subscribeCopy}>
                    Subscribe to get all the latest Drybar news and exclusive offers. Get 15% off your first purchase when you sign up.
                </div>
                <FormControl fullWidth className={classes.subscribeEmailForm}>
                    <Input
                        classes={{
                            input: classes.input,
                        }}
                        id="standard-adornment-amount"
                        value=""
                        // onChange={handleChange('amount')} // this will use in future when data come from API
                        startAdornment=""
                        placeholder="Enter your emaill address"
                        className={classes.enterYourEmail}
                    />
                    <Button className={classes.subscribeEmail} variant="outlined">
                        Join
                    </Button>
                </FormControl>
            </div>
            <DryBarFooter />
        </>
    );
}
