/* eslint-disable import/prefer-default-export */

import barflyActionTypes from './Barfly-ActionTypes';

export const setBarflyMembership = (payload) => ({
    type: barflyActionTypes.BARFLY_SET_MEMBERSHIP,
    payload: payload,
});

export const chooseStore = (payload) => ({
    type: barflyActionTypes.BARFLY_CHOOSE_STORE,
    payload: payload,
});

export const setStores = (payload) => ({
    type: barflyActionTypes.BARFLY_SET_STORES,
    payload: payload
})

export const loadStoresContentful = (payload) => ({
    type: barflyActionTypes.BARFLY_LOADS_STORES,
    payload: payload,
});


export const setUpdatedCustomer = (data) => ({
    type: barflyActionTypes.BARFLY_SET_UPDATED_CUSTOMER,
    payload: data
})

export const setCard = (data) => ({
    type: barflyActionTypes.BARFLY_SET_CARD,
    payload: data
})