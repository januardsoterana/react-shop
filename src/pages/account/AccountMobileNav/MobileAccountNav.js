import { Grid, Typography, withStyles } from '@material-ui/core';
import { object, shape, string } from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TABLET_BREAKPPOINT } from '../../../Helpers/breakpoints';
import MyApptNav from '../../../assets/images/MobileMyApptNav.svg'
import AccountMembership from '../../../assets/images/MobileAccountMembership.svg'
import AccountCalendar from '../../../assets/images/AccountCalendar.svg'
import AccountInformation from '../../../assets/images/AccountInformation.svg'
import BarflyAccountMembership from '../../../assets/images/BarflyAccountMembership.svg'

const styles = (theme) => ({
    container: {
        padding: '34px 22px',
        backgroundColor: '#F9F9F9',
        maxWidth: '422px',
        width: '100%',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            margin: '0 auto',
        },
    },
    menuButton: {
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #D1D1D1',
        padding: '11px',
        fontSize: '16px',
        marginBottom: '11px',
    },
    link: {
        color: '#42413D',
        textDecoration: 'none',
        '&:focus, &:hover, &:visited, &:link, &:active': {
            textDecoration: 'none',
        },
    },
    selected: {
        fontWeight: '800',
    },
    needHelp: {
        fontSize: '13px',
        margin: '22px 0px 0px 2px',
        '& >span': {
            textDecoration: 'underline',
        },
    },
    mobileAccountTop: {
        margin: "0px 0px 17px -62px"
    },
    accountTitleTop: {
        textAlign: "center",
        margin: "-11px 0px 28px -14px !important"
    },
    drybarTitle: {
        fontFamily: "AvenirNext",
        color: "#42413D",
        fontWeight: "700",
        margin: "0px 0px 9px 5px !important"
    }
});

const buttons = [
    {
        title: "Drybar Shops",
    }, {
        label: 'Find a Locations',
        path: '/booking/location',
    }, {
        label: 'Services',
        path: '/booking/services',
    }, {
        label: 'The Styles',
        path: '/the-styles',
    }, {
        label: 'Add-ons',
        path: '/service/add-ons',
    }, {
        label: 'Contact Us',
        path: '/',
    }, {
        title: "Settings"
    },
    {
        label: 'Favourites',
        path: '/account/favorites',
    }, {
        title: "More"
    }, {
        label: 'Follow Us',
        path: '/',
    }, {
        label: 'Accessibility Policy',
        path: '/',
    }, {
        label: 'California Residents: Do not sell my information',
        path: '/',
    }, {
        label: 'Terms of Service',
        path: '/',
    }, {
        label: 'Privacy Policy',
        path: '/',
    }
];

const topNav = [
    {
        src: MyApptNav,
        src1: AccountCalendar,
        title: "My Appots",
        path: "/account/my-appointments"
    }, {
        src: MyApptNav,
        src1: AccountInformation,
        title: "Account Information",
        path: "/account/information"
    }, {
        src: AccountMembership,
        src1: BarflyAccountMembership,
        title: "Barfly Membership",
        path: "/account/barfly-membership"
    }
]

const MobileAccountNavigation = ({ classes, location,history }) => {

    const handleTopNav = (navCollection) => {
        console.log("hello",navCollection.path)
        history.push(navCollection.path)
    }

    return (
        <Grid className={classes.container}>
            <Grid container>
                {topNav.map((navCollection) => (
                    <Grid item xs={4} onClick={() => handleTopNav(navCollection)}>
                        <img src={navCollection.src} alt="my-appt-nav" />
                        <img src={navCollection.src1} alt="calendar-nav" className={classes.mobileAccountTop} />
                        <Typography className={classes.accountTitleTop}>{navCollection.title}</Typography>
                    </Grid>
                ))}
            </Grid>

            {buttons.map((button) => (
                <>
                    <Typography className={classes.drybarTitle}>{button.title}</Typography>
                    <Link
                        className={`${classes.link} ${(location.pathname === button.path)
                            || (location.pathname === button.path_appoint_sub)
                            || (location.pathname === button.path_appoint_pro) ? classes.selected : ''}`}
                        to={button.path}
                    >
                        <Grid className={button?.title?.length > 0 ? "" : classes.menuButton}>
                            {button.label}
                        </Grid>
                    </Link>
                </>
            ))}
            <Typography className={classes.needHelp}>
                Need Help?
            {' '}
                <span>View FAQ</span>
            </Typography>
        </Grid>
    )
}


MobileAccountNavigation.propTypes = {
    classes: object.isRequired,
    location: shape({
        pathname: string,
    }).isRequired,
};

export default withRouter(withStyles(styles)(MobileAccountNavigation));
