/* eslint-disable import/prefer-default-export */

import dryStylingActionTypes from './Dry-Styling-ActionTypes';

export const loadDryStylingContentful = (state) => ({
    type: dryStylingActionTypes.DRY_STYLING_CONTENT_LOAD,
    payload: state,
});

export const setDryStylingContent = (payload) => ({
    type: dryStylingActionTypes.DRY_STYLING_SET_CONTENT,
    payload: payload,
});
