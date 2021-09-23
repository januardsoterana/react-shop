import { withStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { object } from 'prop-types';
import Media from 'react-media';
import React from 'react';

const styles = (theme) => ({
    buttonContainer: {
        maxWidth: '100%',
        padding: '0',
        margin: '0 0 3px 0',
        backgroundColor: 'rgba(0, 0, 0, 0.11)',
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '550px',
        marginBottom: '12px',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.06)',
        alignItems: 'center',
        '&:last-child': {
            marginBottom: 0,
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 0 18px 10px',
            minWidth: '373px',
            height: '75px !important',
        },
    },
});

const AddOnsSkeleton = ({ classes }) => (
    <>
        <Media query={{ maxWidth: 599 }}>
            {(matches) => (matches ? (
                <>
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                </>
            ) : (
                <>
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                    <Skeleton width="100%" height="152px" className={classes.buttonContainer} variant="rect" />
                </>
            )
            )}
        </Media>

    </>
);

AddOnsSkeleton.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(AddOnsSkeleton);
