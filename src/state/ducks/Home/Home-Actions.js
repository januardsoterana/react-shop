/* eslint-disable import/prefer-default-export */

import homeActionTypes from './Home-ActionTypes';

export const loadHomeContentful = (state) => ({
    type: homeActionTypes.HOME_CONTENT_LOAD,
    payload: state,
});

export const setHomeContent = (payload) => ({
    type: homeActionTypes.HOME_SET_CONTENT,
    payload: payload,
});
