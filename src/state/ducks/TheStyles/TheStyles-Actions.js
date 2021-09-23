/* eslint-disable import/prefer-default-export */

import theStylesActionTypes from './TheStyles-ActionTypes';

export const loadTheStylesContentful = (state) => ({
    type: theStylesActionTypes.TheStyles_CONTENT_LOAD,
    payload: state,
});

export const setTheStylesContent = (payload) => ({
    type: theStylesActionTypes.TheStyles_SET_CONTENT,
    payload: payload,
});
