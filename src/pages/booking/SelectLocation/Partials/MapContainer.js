/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
    Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import {
    Button, ButtonBase, Grid, withStyles,
} from '@material-ui/core';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DirectionsOutlinedIcon from '@material-ui/icons/DirectionsOutlined';
import inactiveMarker from '../../../../assets/images/inactiveMarker.svg';
import phoneMapVector from '../../../../assets/images/phoneMapVector.svg';
import activeMarker from '../../../../assets/images/activePin.svg';
import favoriteMarker from '../../../../assets/images/favoriteMarker.svg';
// import retailMarker from '../../../../assets/images/retailMarker.svg';
import { getStoresData, getFocusStore } from '../../../../state/ducks/Service/Service-Selectors';
import { setFocusStore } from '../../../../state/ducks/Service/Service-Actions';
// import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import useEvent from '../../../../utils/event/useEvent';
import useEventDispatch from '../../../../utils/event/useEventDispatch';

// let infoWindowRef = React.createRef();
// let containerElement = document.createElement(`div`);

const styles = () => ({
    infoWindowContainer: {
        width: '304px',
        padding: '0 15px',
    },
    infoWindowText: {
        display: 'block',
        fontFamily: 'AvenirNext',
        marginBottom: '12px',
    },
    infoWindowHeading: {
        display: 'flex',
        margin: '16px 0',
        flexDirection: 'row',
        fontFamily: 'AvenirNext',
        fontSize: '18px',
        fontWeight: '600',
    },
    inforWindowAddress: {
        fontSize: '15px',
        marginBottom: '8px',
    },
    infoWindowDistance: {
        fontSize: '14px',
        color: '#989898',
    },
    selectMapLatitude: {
        background: '#54575A',
        borderRadius: '0px',
        fontSize: '13px',
        width: '79px',
        height: '45px',
        textTransform: 'none',
        color: '#54575A',
        backgroundColor: '#FFDD30',
        '&:hover': {
            backgroundColor: '#b29a21',
        },
    },
    displayInline: {
        display: 'flex',
        whiteSpace: 'nowrap',
        fontSize: '14px',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: '5px',
    },
    marginRight: {
        marginRight: '5px',
    },
    directionIcon: {
        color: '#42413D',
        '&:hover': {
            color: '#42413D'
        }
    }
});

const mapStyle = [
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36,
            },
            {
                color: '#333333',
            },
            {
                lightness: 40,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 17,
            },
            {
                weight: 1.2,
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'landscape.natural.landcover',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'landscape.natural.terrain',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#dedede',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#b1f1bb',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 29,
            },
            {
                weight: 0.2,
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 18,
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f2f2f2',
            },
            {
                lightness: 19,
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e9e9e9',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#ade8ff',
            },
        ],
    },
];

const mapStyles = {
    width: '100%',
    height: '100%',
};

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
};

function delay(t, v) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
 }

const MapContainer = ({
    google, classes, onLocationSelect, currentLocation, stores, locationType, setFocusStore, focusStore
}) => {
    let centerPos = {
        lat: 34.052235,
        lng: -118.243683,
    }
    const [marker, setMarker] = useState(null);
    const [initialCenter, setInitialCenter] = useState(centerPos);
    const points = stores.map((data) => ({ lat: Number(data?.contact?.coordinates?.[0]), lng: Number(data?.contact?.coordinates?.[1]) }));
    const markersAddress = marker?.contact || {};
    const _mapLoaded = (mapProps, map) => {
        map.setOptions({
            styles: mapStyle,
        });
    };

    // map ref
    let mapRef = React.createRef();

    // refs for each marker
    const refs = stores.reduce((acc, value) => {
        acc[value.slug] = React.createRef();
        return acc;
    }, {});
    
    // calculate map bound
    const bounds = new google.maps.LatLngBounds();
    points.forEach((point) => bounds.extend(point));

    // map center pos
    // defalut is Los Angelous
    let pos = centerPos;
    if( points?.length > 0 ){
        pos = {
            lat: points?.[0]?.lat,
            lng: points?.[0]?.lng,
        }
    } else if( currentLocation != null ){
        pos = currentLocation
    }
    console.log('-- pos : ', pos)
    
    useEffect(()=>{
        delay(1000, pos).then((p)=>{
            console.log('-- p : ', p)
            setInitialCenter(p)
            console.log('-- initialCenter : ', initialCenter)
        })
    }, [pos.lat, pos.lng])
    


    // info view pos
    let infoviewPos = {lat: 0, lng: 0}
    if( marker?.settings?.enabled ){
        infoviewPos = { lat: parseFloat(marker?.contact?.coordinates[0]) + 0.003, lng: parseFloat(marker?.contact?.coordinates[1]) }
    }

    // event handler for centering map to store
    // when user click location on list, this event is emitted.
    const handleFocusStoreEvent = useCallback((store) => {
        console.log('-- marker : ', marker)
        if( marker == null || marker.slug != store.slug){
            setMarker(store);
            refs[store.slug].current.marker.map.setZoom(15);
            refs[store.slug].current.marker.map.setCenter(refs[store.slug].current.marker.position);
        } else{
            setMarker(null);
        }
        
        setInitialCenter({
            lat: store?.contact?.coordinates?.[0],
            lng: store?.contact?.coordinates?.[1]
        })
    }, [refs]);
    useEvent('focus-store-from-list', handleFocusStoreEvent);

    // marker click event handler
    // when click marker, emit event for scrolling event list
    const dispatchEvent = useEventDispatch()
    const handleClick = useCallback((e, data) => {
        setMarker(data);
        e.map.setZoom(15);
        e.map.setCenter(e.position);
        // setFocusStore(data);

        dispatchEvent('focus-store', data);
    }, [dispatchEvent]);

    // close button handler of infoview
    const handleClose = () => {
        setMarker(null);
    };

    // book button handler of infoview
    const onBook = () => {
        if( marker?.settings?.enabled )
            onLocationSelect(marker)
    }    

    return (
        <Map
            google={google}
            containerStyle={containerStyle}
            zoom={14}
            style={mapStyles}
            initialCenter={
                initialCenter
            }
            center={initialCenter} 
            // bounds={bounds}
            ref={mapRef}
            onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
        >
            {stores.map((data) => {
                let markerIcon;
                if(
                    (Number(marker?.contact?.coordinates?.[0]) === Number(data?.contact?.coordinates?.[0])) && 
                    (Number(marker?.contact?.coordinates?.[1]) === Number(data?.contact?.coordinates?.[1]))
                ) {
                    markerIcon = activeMarker;
                } else if( locationType == 'favorite' ){
                    markerIcon = favoriteMarker;
                } else if( data.type == 'Retail Store' ){
                    markerIcon = favoriteMarker;
                } else {
                    markerIcon = inactiveMarker;
                }
                return <Marker
                    key={`${Number(data?.contact?.coordinates?.[0])}`}
                    title={data.contact.street1}
                    name={data.title}
                    position={{ lat: Number(data?.contact?.coordinates?.[0]), lng: Number(data?.contact?.coordinates?.[1]) }}
                    icon={markerIcon}
                    onClick={(e) => handleClick(e, data)}
                    ref={refs[data.slug]}
                    style={{ margin: '-51px 0px -12px 155px' }}

                />
            })}
            {
                <InfoWindowEx
                    off
                    visible={marker?.settings?.enabled}
                    position={infoviewPos}
                    onClose={() => handleClose()}
                >
                    <div className={classes.infoWindowContainer}>
                        <h3 className={classes.infoWindowHeading}>
                            {marker?.title}
                            <a href={`https://www.google.com/maps/search/?api=1&query=${marker?.contact?.coordinates[0]},${marker?.contact?.coordinates[1]}`} target="_blank" className={classes.directionIcon}>
                                <DirectionsOutlinedIcon style={{ marginLeft: '84px' }} />
                            </a>
                            
                        </h3>
                        <span className={`${classes.infoWindowText} ${classes.inforWindowAddress}`}>
                            {markersAddress.street1}<br />
                            {markersAddress.city}
                            ,{' '}
                            {markersAddress.state}
                            {' '}
                            {markersAddress.postalCode}
                        </span>
                        <Grid className={classes.displayInline}>
                            <Grid>
                                <span className={`${classes.infoWindowText} ${classes.infoWindowDistance}`}>
                                    {marker?.distance}
                                </span>
                                <div className={classes.displayInline}>
                                    <img src={phoneMapVector} alt="phone-vector" className={classes.marginRight} />
                                    <span>{marker?.contact?.phoneNumber}</span>
                                </div>
                            </Grid>
                            {marker?.type == 'Drybar Shop' && <Grid>
                                <ButtonBase className={classes.selectMapLatitude} variant="outlined" onClick={onBook}>
                                    Book
                                </ButtonBase>
                            </Grid>}
                        </Grid>
                    </div>
                </InfoWindowEx>
            }
        </Map>
    );
};

class InfoWindowEx extends  React.Component {
    constructor(props) {
      super(props);
      this.infoWindowRef = React.createRef();
      this.contentElement = document.createElement(`div`);
    }
  
    componentDidUpdate(prevProps) {
      if (this.props.children !== prevProps.children) {
        ReactDOM.render(
          React.Children.only(this.props.children),
          this.contentElement
        );
        this.infoWindowRef.current.infowindow.setContent(this.contentElement);
      }
    }
  
    render() {
      return <InfoWindow ref={this.infoWindowRef} {...this.props} />;
    }
}


MapContainer.propTypes = {
    classes: object.isRequired,
    google: object,
    onLocationSelect: func.isRequired,
    stores: object.isRequired,
    focusStore: object.isRequired,
};

MapContainer.defaultProps = {
    google: {},
};


const mapStateToProps = (state) => ({
    stores: getStoresData(state),
    focusStore: getFocusStore(state),
});

const mapDispatchToProps = (dispatch) => ({
    setFocusStore: bindActionCreators(setFocusStore, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GoogleApiWrapper({
    apiKey: 'AIzaSyDKfzUhxvQz6v6Meo34CYtav4M2X-Wmx6I',
})(withStyles(styles)(MapContainer))))
