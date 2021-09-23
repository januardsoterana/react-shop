/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';
import {
    array,
    object,
} from 'prop-types';
import {
    Typography, Grid, Button,
} from '@material-ui/core';
import Slider from 'react-slick';
import { withRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-magic-slider-dots/dist/magic-dots.css';
import MagicSliderDots from 'react-magic-slider-dots';

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <>
            <div className="slick-arrow right">
            </div>
        </>
    );
};
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <>
            <div className="slick-arrow left">
            </div>
        </>
    );
};

const ServicesAddOnsCollection = ({
    classes, bookAddOnsData, history, location,
}) => {
    const bookAddOnsCollection = bookAddOnsData || [];
    const defaultAddOnsSubtitle = 'Miracle Smoothing Sealant';
    const isBlowServices = location?.pathname?.includes('blow-services');

    const handleMeClick = () => {
        history.push('/booking/location');
    };
    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots) => <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} dotContainerClassName={`magic-dots slick-dots ${classes.sliderDotsWrap}`}/>,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Grid container className={classes.collectionCotainer}>
            {bookAddOnsCollection.map((items) => (
                <>
                    <Grid item xs={3} className={classes.bookYourAddOns}>
                        <Slider {... settings}>
                            {items?.imagesCollection?.items?.map((imageCollection) => (
                                <img src={imageCollection?.desktopMedia?.url} alt="add-ons" className={classes.imageAddOns} />
                            ))}
                        </Slider>
                        <Grid className={classes.addOnsDetails}>
                            {!isBlowServices ? <Typography className={classes.addOnsCopy}>{items?.title}</Typography> : null}
                            <Grid className={classes.displayflex}>
                                {isBlowServices ? (
                                    <>
                                        <Typography className={classes.addOnsCopy}>{items?.title}</Typography>
                                        <Typography className={`${classes.addOnsTextBold} ${classes.margin}`}>
                                            $
                                            {items.price}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography className={classes.subtitle}>{items?.subtitle || defaultAddOnsSubtitle}</Typography>
                                        <Typography className={`${classes.addOnsTextBold} ${classes.marginLeft}`}>
                                            $
                                            {items.price}
                                        </Typography>
                                    </>
                                ) }

                            </Grid>

                            {isBlowServices ? (
                                <>
                                    <Grid className={classes.addOnsDescServices}>
                                        <Typography className={`${classes.addOnsTextBold} ${classes.howWorksMargin}`}>How It Works</Typography>
                                        <Typography className={classes.addOnsDescJson}>{items?.description?.json?.content?.[0]?.content?.[0]?.value}</Typography>
                                        <Grid className={classes.serviceTime}>
                                            <Typography className={classes.servicesTime}>Approximate Service Time</Typography>
                                            <Typography className={classes.addOnsTextBold}>20 mins</Typography>
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid className={classes.addOnsDesc}>
                                        <Typography className={classes.addOnsDescJson}>{items?.description?.json?.content?.[0]?.content?.[0]?.value}</Typography>
                                        <Typography className={classes.bestForCopy}>Best For</Typography>
                                        <Typography className={classes.subtitle}>{items.bestFor}</Typography>
                                    </Grid>
                                </>
                            ) }
                        </Grid>
                        <Button
                            onClick={handleMeClick}
                            className={classes.selected}
                            variant="outlined"
                        >
                            Book Now
                        </Button>
                    </Grid>
                </>
            ))}
        </Grid>
    );
};

ServicesAddOnsCollection.propTypes = {
    bookAddOnsData: array.isRequired,
    classes: object.isRequired,
    history: object.isRequired,
    location: object.isRequired,
};

export default withRouter(ServicesAddOnsCollection);
