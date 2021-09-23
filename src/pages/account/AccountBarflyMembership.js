/* eslint-disable max-len */
import {
    Button,
    Grid, Typography, withStyles,
} from '@material-ui/core';
import { object } from 'prop-types';
import React from 'react';
// import EditableTextField from '../../app/Components/EditableTextField/EditableTextField';
import InfoIcon from '@material-ui/icons/Info';
import creditBarflyEclipse from '../../assets/images/creditBarflyEclipse.svg';
import BarflyContainer from '../BarflyMembership/GraphqlBarflyMembership'
import { MOBILE_BREAKPOINT } from '../../Helpers/breakpoints';


const styles = (theme) => ({
    container: {
        background: '#fff',
        marginLeft: '15px',
        padding: '34px 22px',
        textAlign: 'center',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            background: '#f9f9f9',
        },
    },
    heading: {
        fontWeight: '800',
        float: 'left',
        paddingBottom: '18px',
    },
    formContainer: {
        margin: '46px 2px 2px 2px',
        width: '710px',
        height: '100px',
        backgroundColor: '#F9F9F9F9',
        borderTop: '1px solid #D1D1D1',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '377px',
            height: '85px',
            margin: '46px 2px 2px -15px',
            background: '#FFFFFF !important'
        },
    },
    breflyMembershipBenefits: {
        margin: '46px 2px 2px 2px',
        width: '710px',
        height: '44px',
        backgroundColor: '#F9F9F9F9',
        borderTop: '1px solid #D1D1D1',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            background: '#FFFFFF !important',
            margin: '46px 2px 2px -15px',
            width: '377px',
        },
    },
    button: {
        width: '378px',
        height: '63px',
        maxWidth: '100%',
        margin: '20px 0 48px',
    },
    emailPref: {
        textAlign: 'left',
        margin: '32px 0 0',
    },
    emailTypography: {
        margin: '10px 0 20px',
        color: '#979797',
    },
    signatureCopy: {
        float: 'left',
        margin: '4px 2px 2px 17px !important',
    },
    nextBillDate: {
        margin: '27px 0px 0px 0px',
        fontSize: '13px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            whiteSpace: 'nowrap',
        },
    },
    lastBillDate: {
        margin: '10px 0px 0px 0px !important',
        fontSize: '13px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            whiteSpace: 'nowrap',
            margin: '-4px 0px 0px 0px !important',
        },
    },
    billDateContainer: {
        borderRight: '1px solid #D1D1D1',
        margin: '15px 0px 0px -28px',
        height: '36px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '11px 32px 0px 17px',
            borderRight: '0px',
        },
    },
    barflyEclipse: {
        margin: '0px 0px 0px -56px',
    },
    creditNumberEclipse: {
        marginTop: '-91px',
    },
    serviceInclude: {
        width: '432px',
        height: '38px',
        backgroundColor: '#E5E5E5',
        margin: '8px 12px 0px 38px',
        borderRadius: '4px',
        paddingTop: '7px',
    },
    theSignature: {
        width: '108px',
        height: '38px',
        backgroundColor: '#E5E5E5',
        margin: '8px 12px 0px 0px',
        borderRadius: '4px',
        paddingTop: '7px',
    },
    serviceIncludeInfo: {
        backgroundColor: '#F9F9F9',
        width: '432px',
        height: '79px',
        margin: '8px 12px 0px 38px',
        paddingTop: '7px',
    },
    theSignatureNumber: {
        width: '108px',
        height: '79px',
        backgroundColor: '#FFFFFF',
        margin: '8px 12px 0px 0px',
        borderRadius: '4px',
        paddingTop: '7px',
        border: '2.5px solid #FFDD30',
        filter: 'drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.1))',
    },
    costTotal: {
        width: '432px',
        height: '50px',
        backgroundColor: '#E5E5E5',
        margin: '8px 12px 0px 38px',
        paddingTop: '7px',
    },
    theSignatureTotal: {
        width: '108px',
        height: '50px',
        backgroundColor: '#54575A',
        margin: '8px 12px 0px 0px',
        paddingTop: '12px',
        color: '#FFFFFF',
        fontSize: '18px',
    },
    thePrimiumTotal: {
        width: '108px',
        height: '50px',
        backgroundColor: '#E5E5E5',
        margin: '8px 12px 0px 0px',
        paddingTop: '12px',
        fontSize: '18px',
    },
    planInfo: {
        display: 'flex',
        margin: '2% 0px 0px 61%',
    },
    yourPlanCopy: {
        margin: '0px 88px 0px 0px',
    },
    cancelMembership: {
        color: '#979797',
        borderBottom: '0.5px solid #979797',
        width: '24%',
        margin: '0 auto',
    },
    borderLeftMobile: {
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            borderLeft: '1px solid #D1D1D1',
            height: '40px',
            padding: '14px'
        },
    }
});

/**
 * Static data - make dynamic when connected with API
 */
const AccountBarflyMembership = ({ classes }) => (
    <Grid className={classes.container}>
        <Typography className={classes.heading}>
            Your Membership
        </Typography>
        <Grid className={classes.formContainer}>
            <Typography className={classes.signatureCopy}>The Signature</Typography>
            <Grid container>
                {/* <Grid item xs={4} className={classes.barflyEclipse}>
                    <img src={creditBarflyEclipse} alt="barfly-eclipse" />
                    <Grid className={classes.creditNumberEclipse}>
                        <Typography>2</Typography>
                        <Typography>Credits</Typography>
                    </Grid>
                </Grid> */}
                <Grid item xs={4} className={classes.billDateContainer}>
                    <Typography className={classes.nextBillDate}>
                        Next bill date:
                        {' '}
                        <span>11/23/20</span>
                    </Typography>
                </Grid>
                <Grid item xs={4} className={classes.borderLeftMobile}>
                    <Typography className={classes.lastBillDate}>
                        Last bill date:
                        {' '}
                        <span>10/23/20</span>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid className={classes.breflyMembershipBenefits}>
            <Typography className={classes.signatureCopy}>Barfly Membership Benefits</Typography>
        </Grid>
        <BarflyContainer />
        {/* <Grid container>
            <Grid item xs={6} className={classes.serviceInclude}><Typography>Services Included</Typography></Grid>
            <Grid item xs={2} className={classes.theSignature}>The Signature</Grid>
            <Grid item xs={2} className={classes.theSignature}>The Premium</Grid>
        </Grid>

        {/* // currently this is static in future will add logic here */}
        {/* <Grid container>
            <Grid item xs={6} className={classes.serviceIncludeInfo}><Typography>Number of Blowouts lorem ipsum</Typography></Grid>
            <Grid item xs={2} className={classes.theSignatureNumber}><Typography>2</Typography></Grid>
            <Grid item xs={2} className={classes.theSignatureNumber}><Typography>4</Typography></Grid>
        </Grid>
        <Grid container>
            <Grid item xs={6} className={classes.costTotal}><Typography>Cost</Typography></Grid>
            <Grid item xs={2} className={classes.theSignatureTotal}><Typography>$75</Typography></Grid>
            <Grid item xs={2} className={classes.thePrimiumTotal}>$135</Grid>
        </Grid>
        <Grid className={classes.planInfo}>
            <Typography className={classes.yourPlanCopy}>Your Plan</Typography>
            <InfoIcon />
        </Grid>
        <Button className={classes.button} variant="contained" color="secondary">
            Upgrade to Premium
        </Button>
        <Typography className={classes.cancelMembership}>Cancel Membership</Typography> */}
    </Grid>
);

AccountBarflyMembership.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(AccountBarflyMembership);
