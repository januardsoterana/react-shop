/* eslint-disable max-len */
import React, { useState } from 'react';
import {
    Grid, withStyles, Checkbox, Typography, TextField, InputAdornment, Button
} from '@material-ui/core';
import { func, object, array } from 'prop-types';
import {withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import MapContainer from '../../booking/SelectLocation/Partials/MapContainer';
import { setLocationData } from '../../../state/ducks/Booking/Booking-Actions';
import SectionTitle from '../../../app/Components/SectionTitle';
import LocationNearbyFavourite from '../../booking/SelectLocation/Partials/LocationNearbyFavourite';
import ConnectedLocatorMixoGlass from './LocatorMixoGlass';
import {MOBILE_BREAKPOINT, TABLET_BREAKPPOINT} from '../../../Helpers/breakpoints';

let timer = null;

const styles = (theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '1903px',
        // height: '800px',
        position: 'relative',
        margin: 'auto',
        marginBottom: '20px',        
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            flexDirection: 'column-reverse',
        },
    },
    mapContainer: {
        width: '100%',
        height: '800px',
        '& > div:first-child': {
            height: '100%',
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            height: '100vw',
        },
    },
    leftContent: {
        width: '573px',
        // overflowY: 'scroll',
        minWidth: '350px',
        height: '800px',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            width: '100%',
            height: '80vh',            
        },
    },
    searchField: {
        display: 'flex',
        flexDirection: 'row',
        height: '40px',
        paddingTop: '10px',
        marginBottom: '20px',
    },
    searchFieldHeight: {
        height: '100%',
    },
    searchButton: {
        marginTop: '-5px',
        background: '#54575A',
        borderRadius: '0px',
        color: '#FFFFFF',
        fontSize: '13px',
        width: '79px',
        height: '35px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
        },
    },
    locationTypeButton: {
        width: '50%',
        borderRadius: '0',
        boxSizing: 'border-box',
        height: '38px',
        borderLeft: '1px solid #E5E5E5',
        borderRight: '1px solid #E5E5E5',
        borderBottom: '1px solid #E5E5E5',
        borderTop: '5px solid transparent',
        textTransform: 'none',
        backgroundColor: '#E5E5E5',
    },
    selected: {
        borderTop: '5px solid #FFDD30',
        backgroundColor: '#ffffff',
        fontWeight: '800',
    },
    locationMap: {
        padding: '12px 0px 12px 0px',
    },
    notFoundLocator: {
        backgroundColor: '#F9F9F9',
        borderTop: '1px solid #D1D1D1',
        width: '393px',
        height: '195px',
    },
    notResultFoundCopy: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#767676',
        fontFamily: 'AvenirNext',
        marginTop: '54px',
    },
    searchAnotherLocation: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#767676',
        fontFamily: 'AvenirNext',
    },
    displayFlex: {
        display: 'flex',
    },
    displayFlexCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '-20px',
        marginBottom: '30px'
    },
    moreBtn: {
        color: '#42413D',
        padding: '17px 10px 15px',
        width: '100%',
        maxWidth: '380px',
        border: '0.5px solid #42413D',
        textDecoration: 'none',
        fontSize: '18px',
        lineHeight: '117%',
        borderRadius: 0,
        margin: '10px 0 20px', 
        '&:hover': {
            textDecoration: 'none',
        }
    },
    loadingWrap: {
        position: 'absolute', 
        left: 0, 
        top: 0, 
        width: '100%', 
        height: '100%', 
        textAlign: 'center', 
        paddingTop: '300px',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    locationList: {
        height: '680px',
        overflowY: 'auto',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            height: 'calc(80vh - 120px)',
        },
    }
});

const ServiceLocator = ({
    classes, goToNextPage, setLocation, marketingComponentCollection, history
}) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [storeType, setStoreType] = useState("Drybar Shop");
    const [locationType, setLocationType] = useState('nearby');
    const [searchLocation, setSearchLocation] = useState('');

    // click event handler of book button that is in store location list and map infoview
    const onLocationSelect = (location) => {
        setLocation(location);
        history.push("/booking/how-many")
    };

    // change event handler of use current location checkbox
    const onChangeCurrentLocation = (e, checked) => {
        if( checked && navigator.geolocation ){
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }; 
                setCurrentLocation(pos)
            }, function(err) {
                console.log('-- err : ', err)
            })
        } else {
            setCurrentLocation(null)
        }
    }

    // key event handler of search box
    const handleLocationSearch = (e) => {
        if( timer != null ){
            clearTimeout(timer);
            timer = null
        }
        timer = setTimeout(()=>{
            setSearchLocation(e.target.value);
            timer = null;
        }, 500)
    };

    // change event handler of retail checkbox
    const onChangeRetail = (e, checked) => {
        let storeType = "Drybar Shop"
        if( checked ) storeType = "Retail Store"
        setStoreType(storeType)
    }

    const LocatorShopTitle = marketingComponentCollection.title || '';
    return (
        <>
            <SectionTitle title={LocatorShopTitle} />
            <Grid className={classes.displayFlexCenter}>
                <Checkbox
                    // defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    onChange={onChangeCurrentLocation}
                    checked={currentLocation != null}
                    style={{ marginTop: '-17px' }}
                />
                <Typography style={{ marginTop: '-6px' }}>
                    Use Current Location
                </Typography>
            </Grid>
            <Grid className={classes.container}>
                <Grid className={classes.leftContent}>
                    <Grid className={classes.searchField}>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                classes: {
                                    root: classes.searchFieldHeight,
                                },
                            }}
                            placeholder="City, State or Zip"
                            onChange={(e) => handleLocationSearch(e)}
                        />
                        <Button className={classes.searchButton} variant="outlined">Search</Button>
                    </Grid>
                    {/* Location Type */}
                    <Grid className={classes.displayFlex}>
                        <Checkbox
                            // defaultChecked
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            onChange={onChangeRetail}
                            checked={storeType == "Retail Store"}
                            style={{ marginTop: '-17px' }}
                        />
                        <Typography style={{ marginTop: '-6px' }}>
                            Drybar Product Retail locations
                        </Typography>
                    </Grid>
                    
                    {/* <Grid>
                        <Button variant="outlined" className={`${classes.locationTypeButton} ${locationType === 'nearby' ? classes.selected : ''}`} onClick={() => setLocationType('nearby')}>
                            Nearby
                        </Button>
                        <Button variant="outlined" className={`${classes.locationTypeButton} ${locationType === 'favorite' ? classes.selected : ''}`} onClick={() => setLocationType('favorite')}>
                            Favorite
                        </Button>
                    </Grid> */}

                    <LocationNearbyFavourite classes={classes} locationType={locationType} storeType={storeType} searchLocation={searchLocation} currentLocation={currentLocation} onLocationSelect={onLocationSelect}/>

                </Grid>
                <Grid className={classes.mapContainer}>
                    <MapContainer onLocationSelect={onLocationSelect} currentLocation={currentLocation}/>
                </Grid>
            </Grid>
            <ConnectedLocatorMixoGlass marketingData={marketingComponentCollection} />
        </>
    );
};

ServiceLocator.propTypes = {
    classes: object.isRequired,
    goToNextPage: func.isRequired,
    setLocation: func.isRequired,
    marketingComponentCollection: object.isRequired,
    storeCollectionData: array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setLocation: bindActionCreators(setLocationData, dispatch),
});

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(ServiceLocator)));
