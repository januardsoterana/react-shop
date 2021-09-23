/* eslint-disable import/prefer-default-export */

import serviceActionTypes from './Service-ActionTypes';

export const setStoresData = (storesData) => {
    return {
    type: serviceActionTypes.SERVICE_STORES,
    payload: storesData,
}};

export const setFavouritesData = (favouritesData) => {
    return {
    type: serviceActionTypes.SERVICE_FAVOURITES,
    payload: favouritesData,
}};

export const setFocusStore = (focusStore) => {
    return {
    type: serviceActionTypes.SERVICE_FOCUSSTORE,
    payload: focusStore,
}};