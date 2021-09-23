/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import AddOnCard from './Partials/AddOnCard';
import ServiceSkeleton from '../../../app/Components/Skeleton/ServiceSkeleton';
import AddOnOneMany from './Partials/AddOnOneMany';
import { getAddonsByUser } from '../../../state/ducks/Booking/Booking-Selectors';

// TODO refactor
const AddOns = ({ guests, addonData, getAddonsByUserFromState }) => {
    const [selectedUser, setSelectedUser] = useState('Me');
    if (addonData) {
        return (
            <>
                {guests > 0 ? <AddOnOneMany setSelectedUser={setSelectedUser} guests={guests} /> : null}
                {addonData?.length > 0 ? addonData.map((addon) => (
                    <AddOnCard
                        isSelectedForUser={getAddonsByUserFromState(selectedUser).some((data) => data.Name === addon.Name)}
                        selectedUser={selectedUser}
                        addonData={addon}
                        guests={guests}
                    />
                )) : <ServiceSkeleton />}
            </>
        );
    }
    return null;
};

AddOns.propTypes = {
    guests: string.isRequired,
};

const mapStateToProps = (state) => ({
    getAddonsByUserFromState: (user) => getAddonsByUser(state, user),
});

export default connect(mapStateToProps)(AddOns);
