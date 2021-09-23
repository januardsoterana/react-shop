import { Grid, Typography, withStyles } from '@material-ui/core';
import { object, shape, string } from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TABLET_BREAKPPOINT } from '../../../../Helpers/breakpoints';

const styles = (theme) => ({
    container: {
        padding: '34px 22px',
        backgroundColor: '#FFF',
        maxWidth: '422px',
        width: '100%',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            margin: '0 auto',
        },
    },
    menuButton: {
        backgroundColor: '#F9F9F9',
        borderBottom: '1px solid #D1D1D1',
        padding: '14px',
        fontSize: '18px',
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
});

const buttons = [{
    label: 'My Appointments',
    path: '/account/my-appointments',
    path_appoint_sub: '/account/appointment-details',
    path_appoint_pro: '/account/appointment-rebook',
}, {
    label: 'Account Information',
    path: '/account/information',
    path_appoint_sub: '',
    path_appoint_pro: '',
}, {
    label: 'Barfly Membership',
    path: '/account/barfly-membership',
    path_appoint_sub: '',
    path_appoint_pro: '',
}, {
    label: 'Favorites',
    path: '/account/favorites',
    path_appoint_sub: '',
    path_appoint_pro: '',
}, {
    label: 'Order History',
    path: '/account/order-history',
    path_appoint_sub: '',
    path_appoint_pro: '',
}, {
    label: 'Auto Replenishment',
    path: '/account/auto-replenishment',
    path_appoint_sub: '',
    path_appoint_pro: '',
}];

const AccountNav = ({ classes, location }) => (
    <Grid className={classes.container}>
        {buttons.map((button) => (
            <Link
                className={`${classes.link} ${(location.pathname === button.path)
            || (location.pathname === button.path_appoint_sub)
            || (location.pathname === button.path_appoint_pro) ? classes.selected : ''}`}
                to={button.path}
            >
                <Grid className={classes.menuButton}>
                    {button.label}
                </Grid>
            </Link>
        ))}
        <Typography className={classes.needHelp}>
            Need Help?
            {' '}
            <span>View FAQ</span>
        </Typography>
    </Grid>
);

AccountNav.propTypes = {
    classes: object.isRequired,
    location: shape({
        pathname: string,
    }).isRequired,
};

export default withRouter(withStyles(styles)(AccountNav));
