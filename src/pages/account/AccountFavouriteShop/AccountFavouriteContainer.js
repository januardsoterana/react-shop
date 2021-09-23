/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import { func, object } from 'prop-types';
import {
    CircularProgress, Backdrop,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import screenStoreLocatorCollection from '../../../gql/queries/storeCollection';
import AccountFavouriteDetail from './AccountFavouriteDetails'

const SelectStoreLocation = (user) => {
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
            <AccountFavouriteDetail contentfulStores={contentfulStores} authUser={user}/>
        </div>
    );
};

SelectStoreLocation.propTypes = {
    goToNextPage: func.isRequired,
    user: object.isRequired
};

export default (SelectStoreLocation);
