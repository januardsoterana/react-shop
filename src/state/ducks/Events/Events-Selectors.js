/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

export const getEventsSectionHeroImage = (state) =>  state.events?.heroImage || '';
export const getEventsSectionTitle = (state) =>  state.events?.title || '';
export const getEventsSectionSubTitle = (state) =>  state.events?.subtitle || '';
export const getEvents = (state) =>  state.events?.events || [];

export default {};
