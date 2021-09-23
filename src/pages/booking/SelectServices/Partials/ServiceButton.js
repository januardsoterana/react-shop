/* eslint-disable max-len */
import {
    Backdrop,
    Button, CircularProgress, Grid, Tooltip, Typography, withStyles,
} from '@material-ui/core';
import {
    bool, func, number, object, string,
} from 'prop-types';
import React, {useState, useEffect} from 'react';
import InfoIcon from '@material-ui/icons/Info';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setBookingService} from '../../../../state/ducks/Booking/Booking-Actions';
import TreatmentDetailsModal from '../../../../app/Components/TreatmentDetailsModal';
import mockImage from '../../../../assets/mockImage.png';
import ProductAddOnCollection from "../../../../gql/queries/productCollection";
import {useQuery} from "@apollo/client";
import {doQuery} from "../../../../state/utils/contentful";

const styles = (theme) => ({
    buttonsWrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: '60px',
    },
    button: {
        width: '438px',
        height: '73px',
        margin: '12px 28px',
        backgroundColor: theme.palette.common.white,
        textTransform: 'none',
        fontSize: '18px',
        padding: '14px',
    },
    selected: {
        fontWeight: '800',
    },
    serviceName: {
        fontSize: '18px',
        // fontWeight: '800',
    },
    selectedServiceName: {
        fontSize: '18px',
        fontWeight: '800',
    },
    icon: {
        fontSize: '20px',
        color: '#42413D',
        cursor: 'pointer',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            maxWidth: '100%',
            width: '402px',
            height: '83px',
        },
    },
    tooltipService: {
        fontSize: '20px',
    },
});

// temporary images
const modalImages = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-yG4Paxa_8TWLuar5M24PHhrrAkHbw4QrDA&usqp=CAU',
    mockImage,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQesAnIdmZj752_bobUphPcj2KcQ2ZmmKvBlw&usqp=CAU',
];

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Pro in gravida dolor sit amet lacus accumsan et viverra justo. Donec nunc dui, varius eget nisi et, convallis bibendum est. Nulla vel odio quis nisi finibus rutrum. Sed nec ex sit amet turpis finibus tristique. Cras porta dictum varius.';

const ServiceButton = ({
                           isSelected,
                           classes,
                           service,
                           differentServicesSelected,
                           guests,
                           setSelectedService,
                           selectedGuest,
                           setAllToSameService,
                           goToNextPage,
                       }) => {
    const [detailsModal, setDetailsModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productForPopup, setProductForPopup] = useState(null)

    const getDetails = (serviceBookerProductID) => {
        setLoading(true);
        const PRODUCT_ADD_ON_QUERY = ProductAddOnCollection(serviceBookerProductID);
        doQuery(PRODUCT_ADD_ON_QUERY)
            .then(data => {
                setLoading(false)
                setProductForPopup(data?.productCollection?.items?.[0] || null)
                
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }

    const onOpenDetail = () => {
        setDetailsModal(true)
    }

    useEffect(() => {
        getDetails(service.ID)
    }, [])

    if (loading) {
        return (
            // todo - replace with skeleton
            <Backdrop
                open
                style={{
                    zIndex: 11,
                    color: '#fff',
                }}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    }

    return (
        <>
            {detailsModal ? (
                <TreatmentDetailsModal
                    onClose={() => setDetailsModal(false)}
                    productsForPopup={productForPopup}
                />
            ) : null}
            <Grid className={classes.buttonContainer}>
                {
                    productForPopup && 
                    <Tooltip
                        disableHoverListener={true}
                        placement="left-start"
                        className={classes.tooltipService}
                        onClick={() => onOpenDetail()}
                    >
                        <InfoIcon className={classes.icon}/>
                    </Tooltip>
                }
                <Button
                    // Create a function to handle this
                    onClick={() => {
                        if (guests) {
                            if (!differentServicesSelected) {
                                setAllToSameService(service);
                                goToNextPage();
                            } else {
                                setSelectedService({
                                    user: selectedGuest || 'Me',
                                    data: service,
                                });
                            }
                        } else {
                            setSelectedService({
                                user: selectedGuest || 'Me',
                                data: service,
                            });
                            goToNextPage();
                        }
                    }}
                    className={`${classes.button} ${isSelected ? classes.selected : ''}`}
                    variant="outlined"
                >
                    <Grid>
                        <Typography className={isSelected ? classes.selectedServiceName : classes.serviceName}>
                            {service.Name}
                        </Typography>
                        <Typography>
                            {
                                !differentServicesSelected && guests
                                    ? `$${service.Price.Amount}`
                                    : `$${service.Price.Amount}`
                            }
                        </Typography>
                    </Grid>
                </Button>
            </Grid>
        </>
    );
};

ServiceButton.propTypes = {
    classes: object.isRequired,
    isSelected: bool,
    service: object.isRequired,
    differentServicesSelected: bool,
    guests: number,
    setSelectedService: func.isRequired,
    selectedGuest: string,
    setAllToSameService: func,
    goToNextPage: func,
};

ServiceButton.defaultProps = {
    differentServicesSelected: true,
    guests: 0,
    selectedGuest: 'Me',
    isSelected: false,
    setAllToSameService: () => {
    },
    goToNextPage: () => {
    },
};

const mapDispatchToProps = (dispatch) => ({
    setSelectedService: bindActionCreators(setBookingService, dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(ServiceButton));
