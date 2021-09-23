/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import { func } from 'prop-types';
import {
    CircularProgress, Backdrop,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import ConnectedAppointments from './MyAppointments'
import screenStoreLocatorCollection from '../../../gql/queries/storeCollection';

const SelectStoreLocation = ({ upcoming, past }) => {
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

    const contentfulStores = data?.storeCollection?.items || [];
    return (
        <div>
            <ConnectedAppointments
                contentfulStores={contentfulStores}
                upcoming={upcoming}
                past={past} />
        </div>
    );
};

SelectStoreLocation.propTypes = {
    goToNextPage: func.isRequired
};

export default SelectStoreLocation;
