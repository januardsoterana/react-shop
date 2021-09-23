import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mobileFooterContainer: {
        flexWrap: 'inherit',
        borderTop: '1px solid #D1D1D1',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    footerIcons: {
        margin: '0px 3px 0px 0px',
        background: '#F9F9F9',
        cursor: 'pointer',
    },
    footerIconCopy: {
        textAlign: 'center',
    },
    icons: {
        margin: '0px 0px 0px 25px',
    },
    footerLink: {
        color: '#42413D',
        textDecoration: 'none',
    },
}));

export default function MobileDryFooter() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.mobileFooterContainer}>
                <Grid item xs={3} className={classes.footerIcons}>
                    <Link to="/" className={classes.footerLink}>
                        <HomeIcon className={classes.icons} />
                        <Typography className={classes.footerIconCopy}>Home</Typography>
                    </Link>
                </Grid>
                <Grid item xs={3} className={classes.footerIcons}>
                    <Link to="/account/my-appointments" className={classes.footerLink}>
                        <EventAvailableIcon className={classes.icons} />
                        <Typography className={classes.footerIconCopy}>My Appts</Typography>
                    </Link>
                </Grid>
                <Grid item xs={3} className={classes.footerIcons}>
                    <EventIcon className={classes.icons} />
                    <Typography className={classes.footerIconCopy}>Book</Typography>
                </Grid>
                <Grid item xs={3} className={classes.footerIcons}>
                    <Link to="/account/my-appointments" className={classes.footerLink}>
                        <PersonIcon className={classes.icons} />
                        <Typography className={classes.footerIconCopy}>Account</Typography>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}
