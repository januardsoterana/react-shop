/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

export const getDryStylingSectionTitle = (state) =>  state.dryStyling?.data?.title || '';
export const getDryStylingSectionSubTitle = (state) =>  state.dryStyling?.data?.subtitle || '';
export const getDryStylingSectionDescription = (state) =>  state.dryStyling?.data?.description || '';
export const getDryStylingSectionAction = (state) =>  state.dryStyling?.data?.action || {};
export const getDryStylingSectionFeaturedImage = (state) =>  state.dryStyling?.data?.featuredImage || '';
export const getDryStylingSectionFeaturedVideo = (state) =>  state.dryStyling?.data?.featuredVideo || '';
export const getDryStylingSectionHeroImage = (state) =>  state.dryStyling?.data?.heroImage || '';
export const getDryStylingSectionPromo = (state) =>  state.dryStyling?.data?.promo || {};
export const getDryStylingSectionImages = (state) =>  state.dryStyling?.data?.images || [];

export default {};
