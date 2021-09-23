/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

export const getBarflyMembershipPrice = (state) =>  state.barfly?.membership?.price || 0;
export const getBarflyMembershipID = (state) =>  state.barfly?.membership?.id || 0;
export const getChosenStore = (state) => state.barfly?.selectedStore || {};
export const isStoreLoaded = (state) =>state.barfly?.storeLoaded || false;
export const getStores = (state) => state.barfly?.stores || [];
export const getUpdatedCustomer = (state) => state?.barfly?.updatedCustomer
export const getNewCard = (state) => state?.barfly?.card


export default {};
