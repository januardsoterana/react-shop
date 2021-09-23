/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
    Grid, Typography, withStyles, TextField, InputAdornment, Button
} from '@material-ui/core';
import { array, func, object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { withOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import Media from 'react-media';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchIcon from '@material-ui/icons/Search';
import MapContainer from './Partials/MapContainer';
import {
    setLocationData,
    clearBookingDetails,
} from '../../../state/ducks/Booking/Booking-Actions';
import { INITIAL_STATE } from '../../../state/ducks/Booking/Booking-Reducer';
import SectionTitle from '../../../app/Components/SectionTitle';
import LocationNearbyFavourite from './Partials/LocationNearbyFavourite';
import { MOBILE_BREAKPOINT, TABLET_BREAKPPOINT } from '../../../Helpers/breakpoints';
import {
    getAddOnsServiceData, getLocationData, getSelectedDate, getSelectedSlot, getServicesData, getNotesMessage,
} from '../../../state/ducks/Booking/Booking-Selectors';
import { getCustomerDetailsById } from '../../../api/booking-api';
import restClient from '../../../api/restClient'

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
    selectDrybarCopy: {
        background: '#FFFFFF',
        padding: '13px 2px 2px 2px',
        textAlign: 'center',
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
        paddingTop: '45%',
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

const SelectLocation = ({
    classes, goToNextPage, setLocation, locationStore, clearBookingDetails, oktaAuth, contentfulStores
}) => {
    const [locationType, setLocationType] = useState('nearby');
    const [storeType, setStoreType] = useState("Drybar Shop");
    const [searchLocation, setSearchLocation] = useState('');
    const [user, setUser] = useState({});
    const [customerFields, setCustomerFields] = useState([])


    let currentLocation = null;
    if (locationStore?.contact?.coordinates) {
        currentLocation = {
            lat: locationStore.contact.coordinates[0],
            lng: locationStore.contact.coordinates[1],
        }
    }

    useEffect(() => {
        oktaAuth.getUser().then((res) => {
            setUser(res);
        });
    }, []);

    // click event handler of book button that is in store location list and map infoview
    const onLocationSelect = (location) => {
        clearBookingDetails();
        setLocation(location);
        goToNextPage();
    };

    const handleFavoriteSelection = async () => {
        setLocationType('favorite')
        console.log("auth user", user)
        const customerId = user?.bookerID
        await restClient.post(getCustomerDetailsById(customerId)).then((response) => {
            if (response) {
                setCustomerFields(response?.data?.Customer?.Customer?.CustomerFieldValues?.FieldValues)
            }
        }).catch((err) => {
            console.log("errr ===>", err)
        })
    }
    const fvtLocationSelection = customerFields?.filter(fvtLoc => fvtLoc?.Key === 52369)

    const getAuthFvtLocationId = fvtLocationSelection?.[0]?.Value?.TextValue?.Value || ''
    
    // key event handler of search box
    const handleLocationSearch = (e) => {
        if (timer != null) {
            clearTimeout(timer);
            timer = null
        }
        timer = setTimeout(() => {
            setSearchLocation(e.target.value);
            timer = null;
        }, 500)
    };

    return (
        <>
            <SectionTitle title="SELECT A DRYBAR LOCATION" />
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
                    <Grid>
                        <Button variant="outlined" className={`${classes.locationTypeButton} ${locationType === 'nearby' ? classes.selected : ''}`} onClick={() => setLocationType('nearby')}>
                            Nearby
                        </Button>
                        <Button variant="outlined" className={`${classes.locationTypeButton} ${locationType === 'favorite' ? classes.selected : ''}`} onClick={() => handleFavoriteSelection()}>
                            Favorite
                        </Button>
                    </Grid>

                    <LocationNearbyFavourite
                        classes={classes}
                        locationType={locationType}
                        storeType={storeType}
                        searchLocation={searchLocation}
                        currentLocation={currentLocation}
                        isBooking={true}
                        onLocationSelect={onLocationSelect}
                        authUserDetail={user}
                        getFvtLocationSelection={fvtLocationSelection}
                        contentfulStores={contentfulStores}
                    />

                </Grid>
                <Grid className={classes.mapContainer}>
                    <MapContainer onLocationSelect={onLocationSelect} locationType={locationType} currentLocation={currentLocation} />
                </Grid>
            </Grid>
        </>
    );
};

SelectLocation.propTypes = {
    classes: object.isRequired,
    goToNextPage: func.isRequired,
    setLocation: func.isRequired,
    locationStore: object.isRequired,
};

const mapStateToProps = (state) => ({
    locationStore: getLocationData(state),
});

const mapDispatchToProps = (dispatch) => ({
    setLocation: bindActionCreators(setLocationData, dispatch),
    clearBookingDetails: bindActionCreators(clearBookingDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withOktaAuth(SelectLocation)));
