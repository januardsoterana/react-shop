import { Button, Grid, withStyles } from '@material-ui/core';
import { object } from 'prop-types';
import Media from 'react-media';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchMegaMenu from '../../SearchMegaMenu/SearchMegaMenu';
import { TABLET_BREAKPPOINT, MOBILE_BREAKPOINT } from '../../../../Helpers/breakpoints';


const styles = (theme) => ({
    buttonContainer: {
        textDecoration: 'none',
        backgroundColor: 'transparent',
        height: '39px',
        borderRight: '4px solid #fff',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            height: '49px',
        },
    },
    topButton: {
        color: '#42413D',
        width: '110px',
        fontSize: '15px',
        fontWeight: '800',
        fontFamily: 'DINCondensed',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            width: '70px',
        },
        '&:focus, &:hover, &:visited, &:link, &:active': {
            textDecoration: 'none',
        },
    },
    aboveHeaderContainer: {
        backgroundColor: '#F9F9F9',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#fff',
        borderTop: '6px solid #FFDD30',
        borderRight: 'none',
        borderLeft: 'none',
        paddingBottom: '10px',
    },
    icon: {
        fontWeight: '100',
        margin: '0 9px',
        cursor: 'pointer',
    },
    searchMenuDesktop: {
        display: 'block',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            display: 'none',
        }
    },
    searchMenuMobile: {
        display: 'none',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            display: 'block',
        }
    },
});

const AboveHeader = ({ classes }) => (
    <>
        <Grid className={classes.aboveHeaderContainer}>
            <Grid style={{ display: 'flex' }}>
                <Button className={`${classes.buttonContainer} ${classes.selected}`} classes={{ label: classes.topButton }}>
                    <Link className={classes.topButton} to="/auth/login">SERVICES</Link>
                </Button>
                <Button className={classes.buttonContainer} classes={{ label: classes.topButton }}>
                    <Link className={classes.topButton} to="/booking/location">BOOK</Link>
                </Button>
                <Button className={classes.buttonContainer} classes={{ label: classes.topButton }}>
                    <Link className={classes.topButton} to="/">SHOP</Link>
                </Button>
            </Grid>
            <Grid style={{ display: 'flex' }}>
                <SearchMegaMenu className={classes.searchMenuDesktop} />
                <Media query={{ maxWidth: 599 }}>
                {(matches) => (matches ? (
                    <Link to="/account/my-account" style={{ color: '#42413D', paddingTop: '4px', }}>
                        <PersonOutlineOutlinedIcon className={classes.icon} style={{ height: '26px' }} />
                    </Link>
                ) : (
                        <Link to="/account/my-appointments" style={{ color: '#42413D',paddingTop: '4px', }}>
                            <PersonOutlineOutlinedIcon className={classes.icon} style={{ height: '26px' }} />
                        </Link>
                    ))}
            </Media>
                <Link to="/service/locator" style={{ color: '#42413D', paddingTop: '4px', }}>
                    <LocationOnOutlinedIcon className={classes.icon} />
                </Link>
            </Grid>
        </Grid>
        {/* <Grid style={{ display: 'flex' }}>
            <SearchIcon className={classes.icon} />
            <Media query={{ maxWidth: 599 }}>
                {(matches) => (matches ? (
                    <Link to="/account/my-account" style={{ color: '#42413D', paddingTop: '4px', }}>
                        <PersonOutlineOutlinedIcon className={classes.icon} style={{ height: '26px' }} />
                    </Link>
                ) : (
                        <Link to="/account/my-appointments" style={{ color: '#42413D',paddingTop: '4px', }}>
                            <PersonOutlineOutlinedIcon className={classes.icon} style={{ height: '26px' }} />
                        </Link>
                    ))}
            </Media>
            <Link to="/service/locator" style={{ color: '#42413D' }}>
                <LocationOnOutlinedIcon className={classes.icon} />
            </Link>
            <Grid className={classes.searchMenuMobile}>
                <SearchMegaMenu />
            </Grid>
        </Grid> */}
    </>
);

AboveHeader.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(AboveHeader);
