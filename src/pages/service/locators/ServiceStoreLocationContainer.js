/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { func } from 'prop-types';
import {
    CircularProgress, Backdrop,
} from '@material-ui/core';
import ConnectedServiceLocator from './serviceLocator';
import screenStoreLocatorCollection from '../../../gql/queries/screenStoreLocatorCollection';

const SelectStoreLocation = ({ goToNextPage }) => {
    const STORE_LOCATOR_QUERY = screenStoreLocatorCollection();
    const { data, error, loading } = useQuery(STORE_LOCATOR_QUERY);

    if (loading) {
        return (
            // todo - replace with skeleton
            <Backdrop
                open
                style={{
                    zIndex: 11,
                    color: '#fff',
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (error) {
        console.log('errror ===>', error);
    }

    

    if (data) {
        const marketingComponentCollection = data.screenStoreLocator;

        return (
            <div>
                <ConnectedServiceLocator 
                    marketingComponentCollection={marketingComponentCollection} 
                />
            </div>
        );
    }
    return null;
};

SelectStoreLocation.propTypes = {
    goToNextPage: func.isRequired,
};

export default (SelectStoreLocation);
