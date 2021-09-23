/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
// get full date-time selectors
export const getStoresData = (state) => {
    return state.service?.stores || [];
}

export const getFavouritesData = (state) => {
    return state.service?.favourites || [];
}

export const getFocusStore = (state) => {
    return state.service?.focusStore || {};
}

export default {};
