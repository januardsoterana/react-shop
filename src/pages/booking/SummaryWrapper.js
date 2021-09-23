/* eslint-disable max-len */
import { Grid, withStyles } from '@material-ui/core';
import {
    bool,
    func,
    node, object, string,
} from 'prop-types';
import Media from 'react-media';
import React from 'react';
import useFetch from '../../Helpers/useFetch';
import AppointmentSummaryContainer from './AppointmentSummary/AppointmentSummaryContainer';
import SectionTitle from '../../app/Components/SectionTitle';

const styles = (theme) => ({
    root: {
        // position: 'relative',
        // backgroundColor: '#F9F9F9',
        maxWidth: '1200px',
        margin: 'auto',
        padding: '0 0 86px 0',
        [theme.breakpoints.down('sm')]: { minHeight: '500px' },
    },
    leftSection: {
        width: '100%',
        [theme.breakpoints.down('sm')]: { 
            padding: '0 15px',
        },
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
});

const SummaryWrapper = ({
    children,
    title,
    classes,
    containerTitle,
    nextButtonEnabled,
    onButtonClick,
    useFetch: query,
    containerTitleCenter,
    addCardBlock
    // nextPage,
}) => {
    const queryData = query || { options: { skip: true } };
    const { data, error, loading } = useFetch(queryData) || {};
    return (
        <Grid className={classes.root}>
            {/* Header */}
            <Grid className={classes.rowFlexContainer}>
                <SectionTitle classes={classes} containerTitle={containerTitle} addCardBlock={addCardBlock} title={title} containerTitleCenter={containerTitleCenter} />
                <Grid style={{ minWidth: '422px' }} />
            </Grid>
            {/* Page Data */}
            <Media query={{ maxWidth: 599 }}>
                {(matches) => (matches ? (
                    <>
                        <Grid className={classes.rowFlexContainer}>

                            {/* Left Section */}
                            <Grid className={classes.leftSection}>
                                {!queryData?.options?.skip ? children({ data, error, loading }) : children}
                            </Grid>
                            {/* Summary Panel on right */}
                            {/* <AppointmentSummaryContainer
                                nextButtonEnabled={nextButtonEnabled}
                                onButtonClick={onButtonClick}
                            /> */}
                        </Grid>
                    </>
                ) : (
                        <>
                            <Grid className={classes.rowFlexContainer}>

                                {/* Left Section */}
                                <Grid className={classes.leftSection}>
                                    {!queryData?.options?.skip ? children({ data, error, loading }) : children}
                                </Grid>
                                {/* Summary Panel on right */}
                                {!addCardBlock && (
                                    <AppointmentSummaryContainer
                                        nextButtonEnabled={nextButtonEnabled}
                                        onButtonClick={onButtonClick}
                                    />
                                )
                                }
                            </Grid>
                        </>
                    )
                )}
            </Media>

        </Grid>
    );
};

SummaryWrapper.propTypes = {
    classes: object.isRequired,
    children: node.isRequired,
    title: string.isRequired,
    containerTitle: string,
    nextButtonEnabled: bool,
    onButtonClick: func,
    useFetch: object,
    containerTitleCenter: bool,
    // nextPage: string,
};

SummaryWrapper.defaultProps = {
    containerTitle: '',
    nextButtonEnabled: false,
    onButtonClick: () => { },
    useFetch: { options: { skip: true } },
    containerTitleCenter: false,
    // nextPage: '',
};

export default withStyles(styles)(SummaryWrapper);
