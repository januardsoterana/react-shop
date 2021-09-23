/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
    object,
} from 'prop-types';
import {
    Typography, Grid, Dialog, Button
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-magic-slider-dots/dist/magic-dots.css';
import MagicSliderDots from 'react-magic-slider-dots';
import addonBanner from '../../../../../../assets/images/addon-banner.png';
import addOnAd from '../../../../../../assets/images/add-on-ad.png';

import arrowLeftIcon from '../../../../../../assets/images/arrow-left-1.svg';
import arrowRightIcon from '../../../../../../assets/images/arrow-right-1.svg';

const ScreenServicesAndAddOnsCollection = ({
    classes, screenServicesAddOnsData,
}) => {
    const addOnsCollection = screenServicesAddOnsData || [];
    const addOnsDescription = addOnsCollection?.description?.json?.content?.[0]?.content || [];
    const bookAddOnsCollection = addOnsCollection?.productsCollection?.items || [];
    const isBlowServices = location?.pathname?.includes('blow-services');

    const [selectedItem, setSelectedItem] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleOpenModal = (item) => {
        console.log('item', item)
        setModalOpen(true);
        setSelectedItem(item)
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <>
                <div className="slick-arrow right" onClick={onClick}>
                    <img src={arrowLeftIcon}></img>
                </div>
            </>
        );
    };
    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <>
                 <div className="slick-arrow left" onClick={onClick}>
                    <img src={arrowRightIcon}></img>
                </div>
            </>
        );
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
        responsive: [
            {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
            }
        ]
    };

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
            <Grid container className={classes.collectionCotainer}>
                {bookAddOnsCollection.map((items) => (
                    <>
                        <Grid item xs={3} className={classes.bookYourAddOns} onClick={() => handleOpenModal(items)}>
                            <img src={items?.imagesCollection?.items?.[0]?.desktopMedia?.url} alt="add-ons" className={classes.imageAddOns} />
                            <Grid className={classes.addOnsDetails}>
                                <Grid className={classes.displayflex}>
                                    <Typography className={classes.addOnsCopy}>{items?.title}</Typography>
                                    <Typography className={`${classes.addOnsTextBold} ${classes.marginLeft}`}>
                                        $
                                        {items.price}
                                    </Typography>
                                </Grid>
                                <Typography className={classes.addOnsDescJson}>{items?.description?.json?.content?.[0]?.content?.[0]?.value}</Typography>
                            </Grid>
                        </Grid>
                    </>
                ))}
            </Grid>
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
            <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                PaperProps={{
                    style: {
                        margin: 15
                    }
                }}
            >
                <div className={classes.modalContent}>
                    <ArrowBackIosIcon className={classes.backIcon} onClick={handleCloseModal}/>
                    <Typography className={`${classes.addOnsCopy} ${classes.textCenter}`} >{selectedItem?.title}</Typography>
                    <div className={classes.slideSection}>
                        <Slider {... settings}>
                            {selectedItem?.imagesCollection?.items?.map((imageCollection) => (
                                <img src={imageCollection?.desktopMedia?.url} alt="add-ons" className={classes.imageAddOns} onLoad={() => window.dispatchEvent(new Event('resize'))}/>
                            ))}
                        </Slider>
                    </div>
                    <Grid className={classes.addOnsDetails}>
                        {isBlowServices ? (
                            <>
                                <Grid>
                                    <Grid className={classes.descriptionItem}>
                                        <Typography className={classes.TitleIndex}>How It Works</Typography>
                                        <Typography className={classes.serviceDescription}>{selectedItem?.description?.json?.content?.[0]?.content?.[0]?.value}</Typography>
                                    </Grid>
                                    <Grid className={classes.descriptionItem}>
                                        <Typography className={classes.TitleIndex}>Results</Typography>
                                        <Typography className={classes.serviceDescription}>Pro in gravida dolor sit amet lacus accumsan et viverra justo commodo. </Typography>
                                    </Grid>
                                    <Grid className={`${classes.modalFlexItem} ${classes.borderTop}`}>
                                        <Typography className={classes.flexTitle}>Price</Typography>
                                        <Typography className={classes.flexDescription}>${selectedItem?.price}</Typography>
                                    </Grid>
                                    <Grid className={classes.modalFlexItem}>
                                        <Typography className={classes.flexTitle}>Approximate Service Time</Typography>
                                        <Typography className={classes.flexDescription}>20 mins</Typography>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid>
                                    <Grid className={classes.descriptionItem}>
                                        <Typography className={classes.TitleIndex}>How It Works</Typography>
                                        <Typography className={classes.serviceDescription}>{selectedItem?.description?.json?.content?.[0]?.content?.[0]?.value}</Typography>
                                    </Grid>                                    
                                    <Grid className={classes.descriptionItem}>
                                        <Typography className={classes.TitleIndex}>Results</Typography>
                                        <Typography className={classes.serviceDescription}>Pro in gravida dolor sit amet lacus accumsan et viverra justo commodo. </Typography>
                                    </Grid>
                                    <Grid className={`${classes.modalFlexItem} ${classes.borderTop}`}>
                                        <Typography className={classes.flexTitle}>Price</Typography>
                                        <Typography className={classes.flexDescription}>${selectedItem?.price}</Typography>
                                    </Grid>
                                    <Grid className={classes.modalFlexItem}>
                                        <Typography className={classes.flexTitle}>Approximate Service Time</Typography>
                                        <Typography className={classes.flexDescription}>20 mins</Typography>
                                    </Grid>
                                    {/* {
                                        selectedItem?.bestFor ?
                                            <>
                                                <Typography className={classes.bestForCopy}>Best For</Typography>
                                                <Typography className={classes.subtitle}>{selectedItem?.bestFor}</Typography>
                                            </> : null
                                    }                                     */}
                                </Grid>
                            </>
                        ) }                        
                    </Grid>
                    <Button
                        variant="outlined"
                        className={classes.selected}
                    >
                        Book Now
                    </Button>
                </div>                
            </Dialog>
        </Grid>
    );
};

ScreenServicesAndAddOnsCollection.propTypes = {
    screenServicesAddOnsData: object.isRequired,
    classes: object.isRequired,
};

export default withRouter(ScreenServicesAndAddOnsCollection);
