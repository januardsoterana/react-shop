/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';
import {
    object,
} from 'prop-types';
import {
    Typography, Grid,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-magic-slider-dots/dist/magic-dots.css';
import BookAddOnsServicesCollection from './partials/BookAddOnsServicesCollection';
import addonBanner from '../../../../../../assets/images/addon-banner.png';
import addOnAd from '../../../../../../assets/images/add-on-ad.png';

const ScreenServicesAndAddOnsCollection = ({
    classes, screenServicesAddOnsData,
}) => {
    const addOnsCollection = screenServicesAddOnsData || [];
    const addOnsDescription = addOnsCollection?.description?.json?.content?.[0]?.content || [];
    const bookAddOnsCollection = addOnsCollection?.productsCollection?.items || [];

    return (
        <Grid className={classes.container}>
            <Grid className={classes.bannerContainer}>
                <img src={addonBanner} className={classes.banner} />
            </Grid>
            <Typography className={classes.addOnsTitle}>{addOnsCollection.title}</Typography>
            <Grid className={classes.addOnsContainer}>
                <Typography className={classes.headerSubTitle}>{addOnsDescription?.[0]?.value}</Typography>
                <Typography className={`${classes.addOnsTreatmentOffer} ${classes.fontWeight}`}>{addOnsDescription?.[1]?.value}</Typography>
            </Grid>
            <Grid className={classes.borderAddOns} />
            <BookAddOnsServicesCollection bookAddOnsData={bookAddOnsCollection} classes={classes} />
            <Grid className={classes.advertiseContainer}>
                <Grid container>
                    <Grid>
                        <Grid container className={classes.advertiseImgWrap}>
                            <img src={addOnAd} className={classes.advertiseImg}></img>
                        </Grid>
                        <Grid container className={classes.blowoutsBtnWrap}>
                            <a className={`btn-common btn-gray-trans btn-lg ${classes.blowoutsBtn}`}>
                                Shop Blowouts
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

ScreenServicesAndAddOnsCollection.propTypes = {
    screenServicesAddOnsData: object.isRequired,
    classes: object.isRequired,
};

export default withRouter(ScreenServicesAndAddOnsCollection);
