/* eslint-disable import/prefer-default-export */

import eventsActionTypes from './Events-ActionTypes';

export const loadEventsContentful = (state) => ({
    type: eventsActionTypes.EVENTS_CONTENT_LOAD,
    payload: state,
});

export const setEventsContent = (payload) => ({
    type: eventsActionTypes.EVENTS_SET_CONTENT,
    payload: payload,
});
