/* eslint-disable no-console */
import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import { array, object, func } from 'prop-types';
import Media from 'react-media';
import {
    Button, ButtonBase, Grid, Typography, withStyles,
} from '@material-ui/core';
import {
    Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import { withRouter } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import defaultBannerImg from "../../../../assets/images/banner-img.jpg";
import {bindActionCreators} from "redux";
import {setLocationData} from "../../../../state/ducks/Booking/Booking-Actions";
import markerIcon from '../../../../assets/images/inactiveMarker.svg';

const styles = () => ({
})

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
    borderTop: '1px solid #d1d1d1'
};

const ServiceLocatorDetail = ({storeLocatorData, setLocation, google}) => {

    const [currentLocation, setCurrentLocation] = useState(null);
    const [distance, setDistance] = useState(0);

    // get current user location
    useEffect(()=>{
        if( navigator.geolocation ){
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                setCurrentLocation(pos)
            }, function(err){
                console.log('-- err : ', err)
            })
        } else {
            setCurrentLocation(null)
        }
    }, [])

    // get distance using radar.io api
    useEffect(()=>{
        if( currentLocation ){
            window
            .fetch(`https://api.radar.io/v1/route/distance?origin=${currentLocation.lat},${currentLocation.lng}&destination=${storeLocatorData?.contact?.coordinates?.[0]},${storeLocatorData?.contact?.coordinates?.[1]}&modes=car&units=imperial`, {
                method: "GET",
                headers: {
                    Authorization: `prj_live_pk_2af0d9b3751a607d2bb63b27c263180580aaa107`
                }
            })
            .then((response) => response.json())
            .then(data => {
                if( data.meta.code == 400 ){
                    setDistance(parseFloat(data.meta.message.replace('Distance between points ', '')));
                } else {
                    setDistance(parseFloat(data?.routes?.geodesic?.distance?.text))
                }
                
            })
            .catch(error => console.log('error in radar api ', error));
        }
    }, [currentLocation, storeLocatorData?.contact?.coordinates?.[0], storeLocatorData?.contact?.coordinates?.[1]])

    // click event handler of book button
    const onBook = () => {
        setLocation(storeLocatorData);
        location.href = '/booking/how-many';
    }

    const _mapLoaded = (mapProps, map) => {
        map.setOptions({
            styles: mapStyle,
        });
    };

    // map center pos
    let initialCenter = {
        lat: storeLocatorData?.contact?.coordinates?.[0],
        lng: storeLocatorData?.contact?.coordinates?.[1],
    }

    return (
        <>
            <div class="banner">
                <Media query={{ maxWidth: 599 }}>
                    {(matches) => (matches ? (
                        <img src={
                            storeLocatorData?.storefrontImage?.mobileMedia ? storeLocatorData?.storefrontImage?.mobileMedia.url : 
                            storeLocatorData?.storefrontImage?.desktopMedia ? storeLocatorData?.storefrontImage?.desktopMedia.url : defaultBannerImg
                        } alt=""/>
                    ) : (
                        <img src={storeLocatorData?.storefrontImage?.desktopMedia ? storeLocatorData?.storefrontImage?.desktopMedia.url : defaultBannerImg} alt=""/>
                    )
                    )}
                </Media>
            </div>
            <main class="main">
                <div class="container">
                    <h1 class="main-title">{storeLocatorData.title}</h1>
                    <div class="location-col-wrap">
                        <div class="location-col-left">
                            <div class="location-col-inner">
                                <h2 class="address-title">Address</h2>
                                <div class="address-wrapper">
                                    <div class="address-col-left">
                                        <div class="address-inner-wrapper">
                                            <address>{storeLocatorData.contact.street1}<br/>{storeLocatorData.contact.city}, {storeLocatorData.contact.state} {storeLocatorData.contact.postalCode}</address>
                                            <div class="directional-info">
                                                <span class="away-distance">{distance} miles</span>
                                                <div class="get-direction">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14.2541 7.15803L14.2541 7.158L14.2487 7.15263L8.84737 1.75128C8.379 1.28291 7.621 1.28291 7.15263 1.75128L1.75128 7.15263C1.28291 7.621 1.28291 8.379 1.75128 8.84737L7.15263 14.2487C7.621 14.7171 8.379 14.7171 8.84737 14.2487L14.2464 8.84969C14.7249 8.38003 14.7083 7.62391 14.2541 7.15803ZM9.7973 8.05485V8.003V7.403H9.1973H6.7967H6.1967V8.003V9.20345H6.1964V7.40285L6.19655 7.4027H9.1973H9.7973V6.8027V6.75085L10.4493 7.40285L9.7973 8.05485Z" stroke="#42413D" stroke-width="1.2"/>
                                                    </svg>
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${storeLocatorData.contact.coordinates[0]},${storeLocatorData.contact.coordinates[1]}`}
                                                        class="link-get-direction"
                                                        target="_blank"
                                                    >
                                                        Get Directions
                                                    </a>
                                                </div>
                                            </div>
                                            <aside class="address-additional-info">
                                                {storeLocatorData.settings.operatingMessage != "" && 
                                                <div class="store-info-section">
                                                    <h3 class="store-info-title">Operating Message</h3>
                                                    <p>{storeLocatorData.settings.operatingMessage}</p>
                                                </div>
                                                }
                                                {storeLocatorData.arrivalInformation && 
                                                <div class="store-info-section">
                                                    <h3 class="store-info-title">Parking Information</h3>
                                                    <p>{storeLocatorData.arrivalInformation}</p>
                                                </div>
                                                }
                                                {/* <div class="store-info-section">
                                                    <h3 class="store-info-title">Store Information</h3>
                                                    <p>{storeLocatorData.information}</p>
                                                </div> */}
                                            </aside>
                                        </div>
                                    </div>
                                    <div class="address-col-right">
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
                                            onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
                                        >
                                            <Marker
                                                title={storeLocatorData.contact.street1}
                                                name={storeLocatorData.title}
                                                position={initialCenter}
                                                icon={markerIcon}
                                                style={{ margin: '-51px 0px -12px 155px' }}

                                            />
                                        </Map>
                                    </div>
                                </div>
                                <div class="contact-info-wrapper">
                                    <div class="contact-info-col">
                                        <h3 class="contact-info-title">Phone</h3>
                                        <a href={'tel:' + storeLocatorData.contact.phoneNumber} class="link-contact-info">
                                            <span class="contact-info-text">{storeLocatorData.contact.phoneNumber}</span>
                                            <span class="contact-info-icon">
                                                <svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.3077 0.470703H2.69231C1.20615 0.470703 0 1.5907 0 2.9707V19.9707C0 21.3507 1.20615 22.4707 2.69231 22.4707H11.3077C12.7938 22.4707 14 21.3507 14 19.9707V2.9707C14 1.5907 12.7938 0.470703 11.3077 0.470703ZM7 21.4707C6.10615 21.4707 5.38462 20.8007 5.38462 19.9707C5.38462 19.1407 6.10615 18.4707 7 18.4707C7.89385 18.4707 8.61539 19.1407 8.61539 19.9707C8.61539 20.8007 7.89385 21.4707 7 21.4707ZM11.8462 17.4707H2.15385V3.4707H11.8462V17.4707Z" fill="#42413D"/>
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                    <div class="contact-info-col">
                                        <h3 class="contact-info-title">Web</h3>
                                        <a href={'https://www.instagram.com/' + storeLocatorData.contact.social.instagram} class="link-contact-info">
                                            <span class="contact-info-text">{storeLocatorData.contact.social.instagram}</span>
                                            <span class="contact-info-icon">
                                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="1" y="1.4707" width="18" height="18" rx="4" stroke="#42413D" stroke-width="2"/>
                                                    <circle cx="9.99981" cy="10.4705" r="3.61538" stroke="#454545" stroke-width="2"/>
                                                    <circle cx="14.838" cy="4.78272" r="1.15385" fill="#454545"/>
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="location-col-rigt">
                            <div class="opening-hour-holder">
                                <h2 class="opening-hour-title">HOURS</h2>
                                <ul class="opening-hour-list">
                                    {storeLocatorData?.settings?.operatingHours.length
                                        ? storeLocatorData?.settings?.operatingHours?.map((operatingHour)=>{
                                            return (<li>
                                                <span>{operatingHour[0]}</span>
                                                <span>{operatingHour[1]}</span>
                                            </li>)
                                        })
                                        : null
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="btn-holder">
                        <button class="btn-yellow btn-common btn-lg" onClick={onBook}>Book an Appointment</button>
                    </div>
                </div>
            </main>
        </>
    );
};

ServiceLocatorDetail.propTypes = {
    storeCollectionData: array.isRequired,
    google: object,
};

ServiceLocatorDetail.defaultProps = {
    google: {},
};

const mapStateToProps = (state) => ({
    // title: getEventsSectionTitle(state),
    // subtitle: getEventsSectionSubTitle(state),
    // heroImage: getEventsSectionHeroImage(state),
    // serviceLocator: getServiceLocator(state)
});

const mapDispatchToProps = (dispatch) => ({
    setLocation: bindActionCreators(setLocationData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GoogleApiWrapper({
    apiKey: 'AIzaSyDKfzUhxvQz6v6Meo34CYtav4M2X-Wmx6I',
})(withStyles(styles)(ServiceLocatorDetail))))