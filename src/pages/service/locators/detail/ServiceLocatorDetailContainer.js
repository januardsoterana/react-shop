/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import { useQuery } from '@apollo/client';
import { func } from 'prop-types';
import {
    CircularProgress, Backdrop,
} from '@material-ui/core';
import ConnectedServiceLocatorDetail from './ServiceLocatorDetail';
import storeLocator from '../../../../gql/queries/storeLocator';

import './service-locator-detail.scss';

const ServiceLocatorDetailContainer = () => {
    const pathArray = window.location.pathname.split('/');
    let slug = null;
    if (pathArray.length > 0) {
        slug = pathArray[pathArray.length - 1];
    }

    const LOCATION_QUERY = storeLocator(slug);
    const { data, error, loading } = useQuery(LOCATION_QUERY);
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
        const storeLocatorData = data.storeCollection?.items[0] || null;
        return (
            <div>
                <ConnectedServiceLocatorDetail storeLocatorData={storeLocatorData}/>
            </div>
        );
    }
    return null;
};

export default (ServiceLocatorDetailContainer);
