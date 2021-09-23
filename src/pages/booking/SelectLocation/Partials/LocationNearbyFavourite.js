import React, { useEffect, useState, useCallback } from 'react';
import {
    Button, Grid, InputAdornment, TextField, Typography, Checkbox, CircularProgress, Backdrop
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import InfiniteScroll from "react-infinite-scroll-component";
import { array, object, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LocationCard from './LocationCard';
import { setStoresData, setFavouritesData, setFocusStore } from '../../../../state/ducks/Service/Service-Actions';
import { getStoresData, getFavouritesData, getFocusStore } from '../../../../state/ducks/Service/Service-Selectors';
import { doQuery } from "../../../../state/utils/contentful";
import useEvent from '../../../../utils/event/useEvent';
import { setFavouriteLocation } from '../../../../api/booking-api';
import restClient from '../../../../api/restClient'

const SEARCH_RADIUS = 50
const COUNTS_PER_PAGE = 10;

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

const LocationSelection = ({
    classes,
    onLocationSelect,
    locationType,
    storeType,
    searchLocation,
    currentLocation,
    setStores,
    stores,
    isBooking,
    favourites,
    setFavourites,
    authUserDetail,
    getFvtLocationSelection,
    contentfulStores
}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isAllLoaded, setIsAllLoaded] = useState(false);

    // here getting the location id from get customer 
    const getAuthFvtLocationId = getFvtLocationSelection?.[0]?.Value?.TextValue?.Value || ''
    // filtering the key value with booker location id 
    const favouriteLocations = contentfulStores?.filter(equal => equal?.bookerLocationId === Number(getAuthFvtLocationId))

    // refs for each location card in list
    const refs = stores.reduce((acc, value) => {
        acc[value.slug] = React.createRef();
        return acc;
    }, {});

    // event handler for scrolling list to store
    // when user click marker on map, this event is emitted.
    const handleFocusStoreEvent = useCallback((store) => {
        refs[store.slug].current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
    }, [refs]);
    useEvent('focus-store', handleFocusStoreEvent);

    // favourite button click event handler
    const addFavouriteSelection = (selectedFavourite) => {
        let newFavourites = [];
        favourites.forEach(val => newFavourites.push(Object.assign({}, val)));
        let isExists = false;
        for (let i = 0; i < newFavourites.length; i++) {
            if (newFavourites[i].slug == selectedFavourite.slug) {
                newFavourites.splice(i, 1);
                isExists = true;
                break;
            }
        }

        if (!isExists) {
            newFavourites.push(selectedFavourite)
        }
        setFavourites(newFavourites)
    }

    // infinite scroll load more event
    const loadMore = () => {
        setCurrentPage(currentPage + 1)
    }

    // query stores from limit & storeType
    const queryQL = `
        query storeCollection {
        storeCollection(skip: 0, limit: 1000, where:{AND: [{type: "${storeType}"}]}) {
            items {
            title
            number
            bookerLocationId
            type
            information
            contact
            slug
            settings
            arrivalInformation
            }
        }
        }`

    // excute query
    useEffect(() => {
        setLoading(true);
        doQuery(queryQL)
            .then(data => {

                if (data?.storeCollection?.items?.length > 0) {

                    // filtering
                    let rangeFilteredlocationData = [];
                    if (locationType !== 'nearby') {
                        rangeFilteredlocationData = favourites;
                        setIsAllLoaded(true)
                    } else {
                        let locationData = data?.storeCollection?.items || [];

                        if (locationData.length > 0) {
                            let filteredlocationData = locationData?.filter((val, index) => {
                                if (val.settings.visible == false) return false;

                                // filter from current location
                                if (currentLocation && !isBooking) {
                                    const storeLat = parseFloat(val.contact.coordinates[0]);
                                    const storeLng = parseFloat(val.contact.coordinates[1]);
                                    const curLat = parseFloat(currentLocation.lat);
                                    const curLng = parseFloat(currentLocation.lng);

                                    let dist = distance(curLat, curLng, storeLat, storeLng, 'M');
                                    console.log('-- dist : ', storeLat, storeLng, curLat, curLng, dist)
                                    if (dist > SEARCH_RADIUS) {
                                        return false;
                                    }
                                }

                                // filter from search string
                                if (searchLocation == "") {
                                    return true
                                } else if (
                                    val.title.toLowerCase().includes(searchLocation.toLowerCase()) ||
                                    val.contact.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
                                    val.contact.state.toLowerCase().includes(searchLocation.toLowerCase()) ||
                                    val.contact.postalCode.toLowerCase().includes(searchLocation.toLowerCase())
                                ) {
                                    return true
                                } else {
                                    return false
                                }
                            })


                            console.log('-- filteredlocationData : ', filteredlocationData)
                            // search stores in SEARCH_RADIUS miles from each stores
                            let newDataSlugs = [];
                            for (let i = 0; i < filteredlocationData.length; i++) {
                                let locData = filteredlocationData[i]
                                newDataSlugs.push(locData.slug)
                                rangeFilteredlocationData.push(locData);
                                let filteredData = locationData?.map(val => {
                                    const storeLat = parseFloat(val.contact.coordinates[0]);
                                    const storeLng = parseFloat(val.contact.coordinates[1]);
                                    const curLat = parseFloat(locData.contact.coordinates[0]);
                                    const curLng = parseFloat(locData.contact.coordinates[1]);

                                    let dist = distance(curLat, curLng, storeLat, storeLng, 'M');
                                    return {
                                        ...val,
                                        distance: dist
                                    }
                                }).filter((val, index) => {
                                    if (val.settings.visible == false) return false;
                                    // if( newDataSlugs.includes(val.slug) ) return false;

                                    return val.distance <= SEARCH_RADIUS
                                })

                                filteredData.forEach(data => {
                                    const idx = newDataSlugs.indexOf(data.slug)
                                    if (idx >= 0) {
                                        if (rangeFilteredlocationData[idx].distance > data.distance) {
                                            rangeFilteredlocationData[idx].distance = data.distance;
                                        }
                                    } else {
                                        newDataSlugs.push(data.slug)
                                        rangeFilteredlocationData.push(data)
                                    }
                                })

                                if (rangeFilteredlocationData.length > (currentPage + 1) * COUNTS_PER_PAGE) break;
                            };

                            // pagination
                            if (rangeFilteredlocationData.length > (currentPage + 1) * COUNTS_PER_PAGE) {
                                rangeFilteredlocationData.splice((currentPage + 1) * COUNTS_PER_PAGE, rangeFilteredlocationData.length - (currentPage + 1) * COUNTS_PER_PAGE);
                                setIsAllLoaded(false)
                            } else {
                                setIsAllLoaded(true)
                            }
                        }
                    }

                    if (rangeFilteredlocationData.length >= 0) {
                        rangeFilteredlocationData.sort((a, b) => {
                            if (a.distance && b.distance) {
                                return a.distance - b.distance
                            }
                            return 0
                        })
                        setStores(rangeFilteredlocationData);
                    }
                }
                setLoading(false);
            })
    }, [locationType, storeType, searchLocation, currentLocation?.lat, currentLocation?.lng, currentPage])

    const handleFavoriteSelection = async (selectedFavourite) => {
        console.log("select api", authUserDetail)
        const customerId = authUserDetail?.bookerID
        await restClient.post(setFavouriteLocation(selectedFavourite?.bookerLocationId, customerId))
    }

    if (stores) {
        return (
            <Grid style={{ position: 'relative' }}>
                <Grid className={classes.locationList} id="scrollWrapper">
                    <InfiniteScroll
                        dataLength={stores.length}
                        next={loadMore}
                        hasMore={true}
                        scrollableTarget="scrollWrapper"
                        loader={
                            <p style={{ fontSize: '20px', textAlign: 'center', marginBottom: '30px' }}>
                                {isAllLoaded ? '' : 'Loading...'}
                            </p>
                        }
                    >
                        {
                            stores.length > 0 ? stores.map((data, key) => {
                                return <Grid className={classes.locationMap} key={key} ref={refs[data.slug]}>
                                    <LocationCard
                                        onLocationSelect={onLocationSelect}
                                        key={`${data.slug}`}
                                        locationData={data}
                                        addFavouriteSelection={addFavouriteSelection}
                                        currentFavourite={favourites}
                                        handleFavoriteSelection={handleFavoriteSelection}
                                    />
                                </Grid>
                            }) :
                                <>
                                    <Grid className={classes.locationMap}>
                                        <LocationCard
                                            onLocationSelect={onLocationSelect}
                                            key={`${favouriteLocations?.[0]?.slug}`}
                                            locationData={favouriteLocations?.[0]}
                                            addFavouriteSelection={addFavouriteSelection}
                                            currentFavourite={favourites}
                                            handleFavoriteSelection={handleFavoriteSelection}
                                        />
                                    </Grid>
                                </>
                        }
                    </InfiniteScroll>
                </Grid>
                {loading && <div className={classes.loadingWrap}>
                    <CircularProgress color="inherit" />
                </div>}
            </Grid>
        );
    }

    return null;


};

LocationSelection.propTypes = {
    classes: object.isRequired,
    locationData: array.isRequired,
    onLocationSelect: func.isRequired,
    location: object.isRequired,
    setStores: func.isRequired,
    stores: object.isRequired,
    favourites: object.isRequired,
    focusStore: object.isRequired,
};

const mapStateToProps = (state) => ({
    stores: getStoresData(state),
    favourites: getFavouritesData(state),
    focusStore: getFocusStore(state),
});

const mapDispatchToProps = (dispatch) => ({
    setStores: bindActionCreators(setStoresData, dispatch),
    setFavourites: bindActionCreators(setFavouritesData, dispatch),
    setFocusStore: bindActionCreators(setFocusStore, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LocationSelection));
