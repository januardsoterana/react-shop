/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
    Backdrop, CircularProgress, Grid, withStyles,
} from '@material-ui/core';
import { withOktaAuth } from '@okta/okta-react';
import Media from 'react-media';
import { node, object, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import SectionTitle from '../../../app/Components/SectionTitle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import accountRoutes from '../../../routes/accountRoutes';
import AccountNav from './AccountNavigation/AccountNav';
import ConnectedDesktopFooter from '../../../app/Components/Footer/Partials/dryBarFooter';
import ConnectedDesktopHeader from '../../../app/Components/Header/Header';
import ConnectedMobileBookingFooter from '../../../app/Components/Footer/Partials/Mobile/MobileDryFooter';
import TopGreetingRow from './TopGreetingRow';
import { setAuthUserDetails } from '../../../state/ducks/Booking/Booking-Actions'
import { getOktaUserInfo } from '../../../state/ducks/Booking/Booking-Selectors'

const styles = (theme) => ({
    root: {
        backgroundColor: '#F9F9F9',
        maxWidth: '1200px',
        margin: 'auto',
        padding: '0 0 86px 0',
    },
    rightSection: {
        width: '100%',
    },
    containerTitle: {
        marginTop: '-24px',
    },
    fullWidth: {
        maxWidth: '100%',
    },
    rowFlexContainer: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap',
        },
    },
    backdrop: {
        zIndex: 11,
        color: '#fff',
    },
});

const AccountWrapper = ({
    classes, title, children, oktaAuth, location, setAuthUserInfo, getOktaUserInfos
}) => {
    // todo replace with useFetch and caching
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        await oktaAuth.getUser().then((res) => {
            setUser(res);
            setLoading(false);
            setAuthUserInfo(res)
        });
    }, []);

    if (loading) {
        return (
            // todo - replace with skeleton
            <Backdrop className={classes.backdrop} open>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (user) {
        return (
            <>
                <Media query={{ maxWidth: 599 }}>
                    {(matches) => (matches ? (
                        <>
                            <Grid className={classes.root}>
                                <Grid className={classes.rowFlexContainer}>
                                    <Grid style={{ minWidth: '422px' }} />
                                    <SectionTitle title={title || accountRoutes.find((route) => location.pathname.includes(route.path)).label} />
                                </Grid>
                                <Grid className={classes.rowFlexContainer}>
                                    {/* Summary Panel on right */}
                                    {/* <AccountNav /> */}
                                    {/* Left Section */}
                                    <Grid className={classes.rightSection}>
                                        {typeof children === 'function' ? children({ user}) : children}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <ConnectedMobileBookingFooter/>
                        </>

                    ) : (
                            <>
                            <ConnectedDesktopHeader/>
                                <TopGreetingRow user={user} />
                                <Grid className={classes.root}>
                                    <Grid className={classes.rowFlexContainer}>
                                        <Grid style={{ minWidth: '422px' }} />
                                        <SectionTitle title={title || accountRoutes.find((route) => location.pathname.includes(route.path)).label} />
                                    </Grid>
                                    <Grid className={classes.rowFlexContainer}>
                                        {/* Summary Panel on right */}
                                        <AccountNav />
                                        {/* Left Section */}
                                        <Grid className={classes.rightSection}>
                                            {typeof children === 'function' ? children({ user }) : children}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <ConnectedDesktopFooter />
                            </>
                        ))}

                </Media>
            </>
        );
    }
    return null;
};

AccountWrapper.propTypes = {
    classes: object.isRequired,
    title: string,
    children: node.isRequired,
};

AccountWrapper.defaultProps = {
    title: '',
};

const mapStateToProps = (state) => ({
    getOktaUserInfos: getOktaUserInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    setAuthUserInfo: bindActionCreators(setAuthUserDetails, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(withOktaAuth(AccountWrapper))));
