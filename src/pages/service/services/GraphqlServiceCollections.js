/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import { useQuery } from '@apollo/client';
import {
    CircularProgress, Backdrop,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ScreenAddOnsCollection from '../../../gql/queries/screenAddOnsCollection';
import ConnectedScreenServices from '../common/partials/ScreenAddOnsServices/ScreenServicesAddOns';

const ServiceLocatorContainer = () => {
    const SCREEN_ADD_ONS_QUERY = ScreenAddOnsCollection();
    const { data, error, loading } = useQuery(SCREEN_ADD_ONS_QUERY);
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
        console.log('add-ons parent', data?.screenProductCollection?.items);

        return (
            <div>
                <ConnectedScreenServices screenServicesAddOnsData={data?.screenProductCollection?.items?.[0]} />
            </div>
        );
    }
    return null;
};

export default withRouter(ServiceLocatorContainer);
