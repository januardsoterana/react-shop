/* eslint-disable no-console */
import React from 'react';
import { useQuery } from '@apollo/client';
import {
    CircularProgress, Backdrop,
} from '@material-ui/core';
import screenMeetOurStylist from '../../../gql/queries/meetOurStylist';
import ConnectedMeetOurStylist from '../common/partials/featuredMeetStylistButterCup/MeetStylistButterCupCommon';

const HomepageContainer = () => {
    const MEET_OUR_STYLIST = screenMeetOurStylist();
    const { data, error, loading } = useQuery(MEET_OUR_STYLIST);
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
        const meetOurData = data.screenStylist || [];
        return (
            <div>
                <ConnectedMeetOurStylist meetStylistData={meetOurData} />
            </div>
        );
    }
    return null;
};

export default HomepageContainer;
