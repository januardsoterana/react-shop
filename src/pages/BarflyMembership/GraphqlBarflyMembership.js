/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import { useQuery } from '@apollo/client';
import {
    CircularProgress, Backdrop,
} from '@material-ui/core';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import BarflyMembership from '../../gql/queries/barflyMembership';
import ConnectedBarflyMembership from './BarflyMembershipEnrollment';
import ConnectedBarflyConfirm from './Partials/BarflyConfirmCard';
import './BarflyMembership.scss';

const BarflyContainer = ({ location }) => {
    const BARFLY_MEMBERSHIP = BarflyMembership();
    const { data, error, loading } = useQuery(BARFLY_MEMBERSHIP);
    if (loading) {
        return (
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
        console.log(error);
    }

    if (data) {
        const barflyMembershipCollection = data.barfly?.membershipsCollection?.items || [];
        const isConfirmBarfly = location.pathname.includes('/barfly-confirm');
        const isAccountBarfly = location.pathname.includes('/account/barfly-membership')
        return (
            <div className="light-bg">
                { isConfirmBarfly
                    ? <ConnectedBarflyConfirm barflyConfirmData={data.barfly} />
                    : <ConnectedBarflyMembership barflyMembershipCollection={barflyMembershipCollection} isAccountBarfly={isAccountBarfly}/>}
            </div>
        );
    }
    return null;
};

BarflyContainer.propTypes = {
    location: object.isRequired,
};

export default withRouter(BarflyContainer);
