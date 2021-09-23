/* eslint-disable import/prefer-default-export */

import faqActionTypes from './Faq-ActionTypes';

export const loadFaqContentful = (state) => ({
    type: faqActionTypes.FAQ_CONTENT_LOAD,
    payload: state,
});

export const setFaqContent = (payload) => ({
    type: faqActionTypes.FAQ_SET_CONTENT,
    payload: payload,
});
