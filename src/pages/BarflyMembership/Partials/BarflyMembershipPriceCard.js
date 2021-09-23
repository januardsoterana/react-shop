/* eslint-disable react/prop-types */
import {
    Box,
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import { object } from 'prop-types';
import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import barflyMembershipHeartIcon from '../../../assets/images/barflyMembershipHeartIcon.svg';
import { MOBILE_BREAKPOINT, TABLET_BREAKPPOINT } from '../../../Helpers/breakpoints';
import { setBarflyMembership } from "../../../state/ducks/Barfly/Barfly-Actions";
import { getChosenStore } from "../../../state/ducks/Barfly/Barfly-Selectors";

const styles = (theme) => ({
    root: {
        padding: '13px',
        backgroundColor: '#fff',
        width: '100%',
        margin: '0 18px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            flexWrap: 'wrap',
            margin: '14px',
        },
    },
    headerTitleText: {
        border: '3px dotted #fff',
        fontFamily: 'DINCondensed',
        fontWeight: '700',
        fontSize: '42px',
        padding: '10px',
    },
    headerTitle: {
        backgroundColor: '#E2E2E2',
        padding: '8px',
        textAlign: 'center',
        position: 'relative',
        color: '#42413D',
        width: '100%',
    },
    selectButton: {
        maxWidth: '378px',
        width: '100%',
        height: '63px',
        fontSize: '18px',
        margin: '27px 0',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            flexWrap: 'wrap',
            margin: '14px 5px',
            maxWidth: 'none',
        },
    },
    slashVector: {
        margin: '0 20px',
        '&::after': {
            content: '""',
            height: '60px',
            transform: 'rotate(20deg)',
            borderRight: '2px solid #42413D',
            position: 'absolute',
        },
    },
    exclusiveBanner: {
        backgroundColor: '#FFDD30',
        fontFamily: 'MrsEavesSmallCaps',
        fontSize: '22px',
        color: '#42413D',
        position: 'relative',
        height: '36px',
        margin: '33px 0',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        lineHeight: '1',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            fontSize: '15px',
        },
        '&::before': {
            content: '""',
            border: '18px solid #FFDD30',
            borderRightWidth: '1.5em',
            left: '-2em',
            borderLeftColor: 'transparent',
            position: 'absolute',
            top: '0',
        },
        '&::after': {
            content: '""',
            border: '18px solid #FFDD30',
            borderLeftWidth: '1.5em',
            right: '-2em',
            borderRightColor: 'transparent',
            position: 'absolute',
            top: '0',
        },
    },
    extraContentDivider: {
        color: '#767676',
        position: 'relative',
        fontWeight: '600',
        margin: '10px',
        '&::after': {
            content: '""',
            backgroundColor: 'rgba(118, 118, 118, 0.7)',
            display: 'inline-block',
            height: '1.5px',
            position: 'relative',
            verticalAlign: 'middle',
            width: '28%',
            left: '0.5em',
            bottom: '2px',
            marginRight: '-50%',
        },
        '&::before': {
            content: '""',
            backgroundColor: 'rgba(118, 118, 118, 0.7)',
            display: 'inline-block',
            height: '1.5px',
            position: 'relative',
            verticalAlign: 'middle',
            width: '28%',
            right: '0.5em',
            bottom: '2px',
            marginLeft: '-50%',
        },
    },
    additionalOffersContainer: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px 0',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '100%',
        },
    },
    additionalOfferAccount: {
        width: '81%'
    },
    exclusiveBannerFont: {
        fontSize: '14px'
    },
    priceAccountPadding: {
        padding: '27px'
    }
});

const BarflyMembershipPriceCard = ({
    classes,
    membershipId,
    priceCardHeaderIcon,
    headerTitle,
    price,
    blowouts,
    additionalOffers = [],
    history,
    chosenStore,
    setBarflyMembership,
    isAccountBarfly
}) => (
        <Grid className={classes.root}>
            {console.log("barfly card", price)}
            <Grid style={{
                border: '1px solid #E2E2E2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-between',
            }}
            >
                <Grid style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Grid className={classes.headerTitle}>
                        <img
                            src={priceCardHeaderIcon || barflyMembershipHeartIcon}
                            alt=""
                            style={{
                                width: '56px', margin: '0 auto', top: '-35px', left: 0, right: 0, position: 'absolute',
                            }}
                        />
                        <Typography className={classes.headerTitleText}>
                            {headerTitle}
                        </Typography>
                    </Grid>
                    <Grid className={isAccountBarfly ? `${classes.exclusiveBannerFont} ${classes.exclusiveBanner}` : classes.exclusiveBanner} >
                        {blowouts}
                    </Grid>
                    {
                        additionalOffers.length > 0 &&
                        <><Typography className={classes.extraContentDivider}>
                            PLUS
                    </Typography>
                            <Grid className={isAccountBarfly ? `${classes.additionalOfferAccount} ${classes.additionalOffersContainer}` : classes.additionalOffersContainer}>
                                {additionalOffers.map((additional) => (
                                    <Grid container style={{ margin: '10px 0' }}>
                                        <Grid xs={3} md={3} lg={3} style={{ marginRight: '23px' }}>
                                            <Typography style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                color: '#42413D',
                                                fontWeight: '800',
                                            }}
                                            >
                                                {additional.name}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography style={{ color: '#42413D' }}>
                                                {additional.value}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    }
                </Grid>
                <Grid style={{
                    width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
                >
                    <Grid className={isAccountBarfly ? classes.priceAccountPadding : ''} style={{ marginTop: '20px' }}>
                        <Typography style={{ 
                            display: 'flex',
                             position: 'relative',
                              height: isAccountBarfly ? '60px' : '70px' 
                              }}>
                            <Box  style={{
                                fontSize: isAccountBarfly ? '20px' : '32px',
                                fontWeight: '800',
                                color: '#42413D',
                                fontFamily: 'AvenirNext',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                $
                            {price}
                            </Box>
                            <Box className={classes.slashVector} 
                            style={{
                                margin: isAccountBarfly ? '0 10px' : ''
                            }}
                            />
                            <Box style={{
                                fontSize: '28px',
                                fontWeight: '800',
                                color: '#42413D',
                                fontFamily: 'AvenirNext',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                month
                        </Box>
                        </Typography>
                        <Typography style={{ fontSize: '18px' }}>
                            + tax (where applicable)
                    </Typography>
                    </Grid>
                    {!isAccountBarfly && (
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.selectButton}
                            onClick={() => {
                                console.log(chosenStore);
                                if (chosenStore.bookerLocationId) {
                                    setBarflyMembership({
                                        price: price,
                                        id: membershipId
                                    });
                                    history.push('/barfly-membership-enrollment');
                                } else {
                                    toast('Store location ID is invalid.');
                                }
                            }}
                        >
                            Select
                        </Button>
                    )}
                    <ToastContainer hideProgressBar={true} />
                </Grid>
            </Grid>
        </Grid>
    );

BarflyMembershipPriceCard.propTypes = {
    classes: object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setBarflyMembership: bindActionCreators(setBarflyMembership, dispatch),
});

const mapStateToProps = (state) => ({
    chosenStore: getChosenStore(state)
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(BarflyMembershipPriceCard)));
