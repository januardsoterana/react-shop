/* eslint-disable import/prefer-default-export */

import franchisingActionTypes from './Franchising-ActionTypes';

export const loadFranchisingContentful = (state) => ({
    type: franchisingActionTypes.FRANCHISING_CONTENT_LOAD,
    payload: state,
});

export const setFranchisingContent = (payload) => ({
    type: franchisingActionTypes.FRANCHISING_SET_CONTENT,
    payload: payload,
});
