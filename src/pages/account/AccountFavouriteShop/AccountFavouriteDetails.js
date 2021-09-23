/* eslint-disable max-len */
import React from 'react';
import { getCustomerDetailsById } from '../../../api/booking-api';
import { object} from 'prop-types';
import BackdropCircularProgress from '../../../app/Components/common/BackdropCircularProgress';
import ConnectedFavouriteShop from './AccountFavouriteShop'
import useFetch from '../../../Helpers/useFetch';

const MyAppointmentsContainer = ({ contentfulStores, authUser }) => {
    const customerKey = authUser?.user?.bookerID
    const { data, loading, error } = useFetch(getCustomerDetailsById(customerKey));
    if (loading) {
        return <BackdropCircularProgress />;
    }
    if (error) {
        return null;
    }

    if (data) {
        const customerFields = data?.Customer?.Customer
        return (
            <>
                <ConnectedFavouriteShop contentfulStores={contentfulStores} customerFields={customerFields} />
            </>
        );
    }
    return null;
};

MyAppointmentsContainer.propTypes = {
   user: object.isRequired
};

export default MyAppointmentsContainer;
