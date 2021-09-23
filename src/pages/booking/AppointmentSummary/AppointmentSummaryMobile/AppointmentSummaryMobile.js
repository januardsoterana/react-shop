import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: '#FFFFFF',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
        height: '79px',
        // transform: 'rotate(-180deg)',
    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    summaryDetailsCopy: {
        textAlign: 'center',
    },
}));

export default function AppointmentSummaryMobile() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.summaryDetailsCopy}>
                <Grid item xs={12}>
                    <ExpandLessIcon />
                    <Typography className={classes.paper}>
                        Drybar Huntington Beach in Pacific City
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}
