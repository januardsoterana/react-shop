/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

export const getHeroData = (state) =>  state.home?.hero || {};
export const getRibbonData = (state) => state.home?.ribbon || {};
export const getTheStylesData = (state) => state.home?.theStyles || {};
export const getPromosData = (state) => state.home?.promos || {};
export const getOffersData = (state) => state.home?.offers || {};
export const getSocialData = (state) => state.home?.social || {};

export default {};
