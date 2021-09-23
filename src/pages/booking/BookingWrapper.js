import { Button, Grid, withStyles, Backdrop, CircularProgress, } from '@material-ui/core';
import { func, node, object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Media from 'react-media';
import { withRouter } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import bookingRoutes from '../../routes/bookingRoutes';
import BookingHeader from '../../app/Components/Header/BookingHeader';
// import BookingFooter from '../../app/Components/Footer/Partials/GetOfferContainer';
import ConnectedDesktopBookingFooter from '../../app/Components/Footer/Partials/dryBarFooter';
import ConnectedMobileBookingFooter from '../../app/Components/Footer/Partials/Mobile/MobileDryFooter';
import ConnectedMobileSummary from './AppointmentSummary/AppointmentSummaryMobile/AppointmentSummaryMobile';
import { isDataSelected } from '../../state/ducks/Booking/Booking-Selectors';

const styles = (theme) => ({
    headerCopy: {
        color: '#42413D',
        background: '#F9F9F9',
        padding: '20px 2px 20px 0px',
        textAlign: 'center',
        fontSize: '20px',
        fontFamily: 'AvenirNext',
        [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    bar: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        overflow: 'scroll',
        height: '54px',
    },
    button: {
        backgroundColor: '#fff',
        maxWidth: '150px',
        width: '100%',
        margin: '0',
        fontSize: '15px',
        textTransform: 'uppercase',
        overflow: 'hidden',
        boxSizing: 'border-box',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#FFFFFF',
        },
        [theme.breakpoints.down('sm')]: { fontSize: '10px' },
    },
    selected: {
        fontWeight: 800,
        color: '#42413D',
        '&:before': {
            content: '""',
            position: 'absolute',
            // right: '50%-13px',
            bottom: '0',
            backgroundColor: '#FFDD30',
            width: '13px',
            height: '13px',
            transformOrigin: '0 0',
            transform: 'rotate(45deg) skew(10deg, 10deg)',
        },
        '&:after': {
            content: '""',
            width: '50%',
            height: '3px',
            left: '0',
            bottom: '0',
            position: 'absolute',
            background: '#FFDD30',
        },
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#FFFFFF',
        },
    },
    previous: {
        borderBottom: '3px solid #FFDD30',
    },
    mobileFooter: {
        background: '#FFFFFF',
        // marginTop: '46%',
    },
    disabledButton: {
        color: '#54575A !important',
        backgroundColor: '#fff !important',
    },
});

const BookingWrapper = ({
    children: Component, classes, history, isTabEnabled, location, oktaAuth
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [user, setUser] = useState({});

    const handleClick = (index, page) => {
        history.push(page.path);
        setSelectedIndex(index);
    };
    const hasMapLocatorSelection = location?.pathname?.includes('/booking/location');

    useEffect(() => {
        oktaAuth.getUser().then((res) => {
            setUser(res);
       });
        setSelectedIndex(bookingRoutes.findIndex(
            (route) => route.path === history.location.pathname,
        ) || 0);
    }, [history.location.pathname]);


    const goToNextPage = () => {
        history.push(bookingRoutes[selectedIndex + 1].path);
    };
    if (user) {
        return (
            <>
                <Media query={{ maxWidth: 599 }}>
                    {(matches) => (matches ? (
                        <>
                            <Grid className={classes.bar}>
                                <Grid className="d-flex justify-content-center w-md-100">
                                    {
                                        bookingRoutes.map((page, index) => (
                                            <Button
                                                className={`${classes.button} ${history.location.pathname === page.path ? classes.selected : ''} ${selectedIndex > index ? classes.previous : ''}`}
                                                variant="contained"
                                                onClick={() => handleClick(index, page)}
                                                id={index}
                                            >
                                                {page.label}
                                            </Button>
                                        ))
                                    }
                                </Grid>
                            </Grid>

                            <Component goToNextPage={goToNextPage} />
                            {/* <Grid className={classes.mobileFooter}>
                                {!hasMapLocatorSelection ? <ConnectedMobileSummary /> : null}
                                <ConnectedMobileBookingFooter />
                            </Grid> */}
                        </>
                    ) : (
                            <>
                                <BookingHeader />
                                <div className={classes.headerCopy}>
                                    Book an Appointment
                                 </div>
                                <Grid className={classes.bar}>
                                    <Grid className="d-flex justify-content-center w-100">
                                        {
                                            bookingRoutes.map((page, index) => (
                                                <Button
                                                    className={`${classes.button} ${history.location.pathname === page.path ? classes.selected : ''} ${selectedIndex > index ? classes.previous : ''}`}
                                                    variant="contained"
                                                    onClick={() => handleClick(index, page)}
                                                    id={index}
                                                    disabled={!isTabEnabled(page.label)}
                                                    classes={{ disabled: classes.disabledButton }}
                                                >
                                                    {page.label}
                                                </Button>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                                <Component goToNextPage={goToNextPage} />
                                <ConnectedDesktopBookingFooter />
                            </>
                        ))}

                </Media>

            </>
        );
    }
};

BookingWrapper.propTypes = {
    classes: object.isRequired,
    children: node.isRequired,
    history: object.isRequired,
    isTabEnabled: func.isRequired,
    location: object.isRequired,
};

const mapStateToProps = (state) => ({
    isTabEnabled: (type) => isDataSelected(state, type),
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(withOktaAuth(BookingWrapper))));
