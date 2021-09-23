/* eslint-disable no-console */
import React, {useEffect} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {loadEventsContentful} from "../../state/ducks/Events/Events-Actions";
import EventsWrapper from "./EventsWrapper";

import '../../assets/css/style.scss';
import '../../assets/css/style-responsive.scss';
import './events.scss';
import './events-responsive.scss';

const Events = ({
                    loadDataFromContentful
                }) => {
    useEffect(() => {
        loadDataFromContentful({});
    }, []);

    return (
        <div className="tab-pane fade show active events-page" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <EventsWrapper/>
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    loadDataFromContentful: bindActionCreators(loadEventsContentful, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
