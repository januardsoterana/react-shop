/* eslint-disable react/prop-types */
import React from 'react';
import {
    Box,
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import {parsedJSON2Html, parseJSONFormat} from "../../state/utils/contentful";

const styles = (theme) => ({
    container: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10',
        flexWrap: 'wrap',
        overflow: 'scroll'
    },
    calendarContainer: {
        boxShadow: '0px 0px 64px rgba(0, 0, 0, 0.12)',
        background: '#fff',
        padding: '28px',
        maxWidth: '749px',
        width: '749px',
        boxSizing: 'content-box',
        marginTop: '20px',
        marginBottom: '20px',
        [theme.breakpoints.down(749)]: {
            maxWidth: '100%',
            marginTop: '0'
        },
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '15px',
    },
    headerText: {
        fontFamily: 'DINCondensed',
        fontSize: '35px',
        fontWeight: '700',
        color: '#42413D',
        width: '100%',
        textAlign: 'center',
        marginLeft: '32px',
    },
    closeIcon: {
        fontSize: '45px',
        color: '#42413D',
        margin: '5px 0',
    },
    image: {
        maxWidth: '221px',
        height: '221px',
        objectFit: 'cover',
        margin: '16px',
        border: '1.5px solid #CACACA',
    },
    heading: {
        fontFamily: 'MrsEavesSmallCap',
        borderBottom: '1px solid #D1D1D1',
        lineHeight: '2.5',
        fontSize: '18px',
    },
    description: {
        margin: '30px !important',
        fontSize: '15px !important',
    },
    priceText: {
        borderTop: '1px solid #D1D1D1',
        backgroundColor: '#F9F9F9',
        padding: '22px 29px !important',
        display: 'flex',
        justifyContent: 'space-between',
    },

});

const TreatmentDetailsModal = ({
                                   onClose,
                                   classes,
                                   productsForPopup
                               }) => {
    const handleOutsideClick = (event) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const slickSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        rows: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    const images = productsForPopup?.imagesCollection?.items?.map(item => item?.desktopMedia?.url || '');
    const description = parsedJSON2Html(parseJSONFormat(productsForPopup?.description));

    return (
        <Grid onClick={handleOutsideClick} className={classes.container}>
            <Grid className={classes.calendarContainer}>
                <Grid className={classes.header}>
                    <Typography className={classes.headerText}>
                        {productsForPopup?.title}
                    </Typography>
                    <Button onClick={onClose} style={{padding: 0}}>
                        <CloseIcon className={classes.closeIcon}/>
                    </Button>
                </Grid>
                <Grid style={{margin: 'auto', marginLeft: '30px', marginRight: '40px'}}>
                    <Grid className="">
                        <Slider {...slickSettings}>
                            {images.map((image, index) => <div><img key={index} className={classes.image} src={image}
                                                               alt="img"/></div>)}
                        </Slider>
                    </Grid>
                    <Grid>
                        <Typography className={classes.heading}>
                            HOW IT WORKS
                        </Typography>
                        <Typography className={classes.description} dangerouslySetInnerHTML={{ __html: description }}>
                        </Typography>
                        <Typography className={classes.priceText}>
                            <Box>
                                Price
                            </Box>
                            <Box style={{fontWeight: '800'}}>
                                {`$${productsForPopup?.price}`}
                            </Box>
                        </Typography>
                        <Typography className={classes.priceText}>
                            <Box>
                                Approximate Service Time
                            </Box>
                            <Box style={{fontWeight: '800'}}>
                                {productsForPopup?.serviceTime || 0} mins
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(TreatmentDetailsModal);
