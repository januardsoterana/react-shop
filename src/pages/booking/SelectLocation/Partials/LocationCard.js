/* eslint-disable max-len */
import {
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import {
    func, object, shape, string,
} from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import useEvent from '../../../../utils/event/useEvent';
import useEventDispatch from '../../../../utils/event/useEventDispatch';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
// import MapSideBarVector from '../../../../assets/images/mapVector.svg';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const styles = () => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: '16px',
        justifyContent: 'space-between',
    },
    locationName: {
        fontSize: '15px',
        color: '#42413D',
        fontWeight: '800',
        margin: '16px 0',
        marginRight: '8px',
    },
    distance: {
        margin: '6px 14px 6px 38px',
        color: '#989898',
    },
    textWrapper: {
        display: 'flex',
        alignItems: 'top',
        lineHeight: '1.5',
    },
    icon: {
        marginRight: '15px',
        alignSelf: 'flex-start',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    optionsButton: {
        color: '#989898',
    },
    optionsButtonsContainer: {
        padding: '13px 7px 13px 15px',
        backgroundColor: '#F9F9F9',
        color: '#989898',
    },
    locationCardTopContainer: {
        backgroundColor: '#F9F9F9',
        borderTop: '1px solid #D1D1D1',
        cursor: 'pointer'
    },
    borderPixelLocation: {
        border: '1px solid #D1D1D1',
        margin: '0px 15px 0px 15px',
    },
    mapSelectionVector: {
        margin: '24px 26px 0px 0px',
    },
    bookMapLocation: {
        background: '#54575A',
        borderRadius: '0px',
        fontSize: '13px',
        width: '79px',
        height: '35px',
        textTransform: 'none',
        whiteSpace: 'nowrap',
        color: '#54575A',
        backgroundColor: '#FFDD30',
        '&:hover': {
            backgroundColor: '#b29a21',
        },
    },
    detailLink: {
        color: '#42413D'
    }
});

const LocationCard = ({
    classes,
    onLocationSelect,
    locationData,
    location,
    addFavouriteSelection,
    currentFavourite,
    handleFavoriteSelection
}) => {
    if (!locationData) {
        return <Typography style={{textAlign: "center"}}>You don't have any service shops</Typography>
    }
    const isAccountShop = location.pathname.includes('/account/favorites');
    const shopAddressDetails = locationData?.contact || {};

    let currentFavouriteSlugs = currentFavourite?.map((favourite) => { return favourite?.slug });
    const curFvtSlug = currentFavouriteSlugs?.includes(locationData?.slug)

    // card click event handler
    // when click, emit event for centering map to marker pos
    const dispatchEvent = useEventDispatch()
    const handleClick = useCallback((e, data) => {
        dispatchEvent('focus-store-from-list', data);
    }, [dispatchEvent]);



    return (
        <Grid className={classes.locationCardTopContainer} onClick={(e) => { handleClick(e, locationData) }}>
            <Grid className={classes.container}>
                <Grid>
                    <div className={`${classes.textWrapper} ${classes.locationName}`}>
                        <Link to={`/service/locator/detail/${locationData?.slug}`} className={classes.detailLink}>
                            <InfoIcon className={classes.icon} onClick={() => { }} />
                        </Link>
                        <span>{locationData?.title}</span>
                    </div>

                    <Typography className={classes.textWrapper}>
                        <LocationOnOutlinedIcon className={classes.icon} />
                        {shopAddressDetails.street1}<br />
                        {shopAddressDetails.city}
                        ,{' '}
                        {shopAddressDetails.state}
                        {' '}
                        {shopAddressDetails.postalCode}
                    </Typography>
                    <Typography className={classes.distance}>
                        {/* {distance} */}
                    </Typography>
                </Grid>
                <Grid className={classes.buttonContainer}>
                    {locationData?.type == 'Drybar Shop' && locationData?.settings?.bookable &&
                        <Button onClick={() => onLocationSelect(locationData)} className={classes.bookMapLocation} variant="outlined">
                            {isAccountShop ? 'View Shop' : 'Book'}
                        </Button>}
                    {location.pathname.includes('/booking/location') && locationData?.type == 'Drybar Shop' &&
                        <div onClick={() => addFavouriteSelection(locationData)} style={{ cursor: "pointer" }}>
                            {currentFavouriteSlugs?.includes(locationData?.slug) ?
                                <FavoriteTwoToneIcon className={classes.mapSelectionVector} color='primary' /> :
                                <FavoriteBorderIcon className={classes.mapSelectionVector} onClick={() => handleFavoriteSelection(locationData)} />
                            }
                        </div>}
                    <Button
                        href={`https://www.google.com/maps/search/?api=1&query=${locationData?.contact?.coordinates?.[0]},${locationData?.contact?.coordinates?.[1]}`}
                        target="_blank"
                    >
                        Get Directions
                    </Button>
                </Grid>
            </Grid>
            <Grid className={classes.borderPixelLocation} />
            {locationData?.settings?.operatingMessage != "" &&
                <Grid className={classes.optionsButtonsContainer}>
                    <Typography>{locationData?.settings?.operatingMessage}</Typography>
                </Grid>
            }
            {locationData?.arrivalInformation != "" &&
                <Grid className={classes.optionsButtonsContainer}>
                    <Typography>{locationData?.arrivalInformation}</Typography>
                </Grid>
            }
        </Grid>
    );
};

LocationCard.propTypes = {
    classes: object.isRequired,
    locationData: shape({
        title: string.isRequired,
        information: string.isRequired,
    }).isRequired,
    location: object.isRequired,
    onLocationSelect: func.isRequired,
};

export default withRouter(withStyles(styles)(LocationCard));