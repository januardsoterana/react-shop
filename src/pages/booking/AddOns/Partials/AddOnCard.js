/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import {
    Backdrop,
    Button,
    Checkbox, CircularProgress, Grid, Tooltip, Typography, withStyles,
} from '@material-ui/core';
import {
    object,
} from 'prop-types';
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setAddOnsServiceUser } from '../../../../state/ducks/Booking/Booking-Actions';
import { isGuestWithDifferentServices, getAddOnsServiceData, getAvailableServiceIds } from '../../../../state/ducks/Booking/Booking-Selectors';
import TreatmentDetailsModal from '../../../../app/Components/TreatmentDetailsModal';
import ProductAddOnCollection from "../../../../gql/queries/productCollection";
import {doQuery} from "../../../../state/utils/contentful";


const styles = (theme) => ({
    root: {
        padding: '31px 0',
        backgroundColor: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '550px',
        marginBottom: '12px',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.06)',
        alignItems: 'center',
        '&:last-child': {
            marginBottom: 0,
        },
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '12px 0',
            minWidth: 0,
            height: 'auto',
            minHeight: '116px',
        },
    },
    content: {
        textAlign: 'left',
        margin: '0px 0px 0px 27px',
        [theme.breakpoints.down('sm')]: {
            margin: '0px 0px 0px 10px'
        },
    },
    buttonContainer: {
        maxWidth: '100%',
        width: '100%',
        padding: '0',
        margin: '0 0 10px 0',
        [theme.breakpoints.down('sm')]: {
            margin: '3px 0'
        },
    },
    icon: {
        margin: '55px 29px 0px 0px',
        alignSelf: 'flex-start',
        fontSize: '20px',
        color: theme.palette.common.grey,
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            margin: '39px 18px 0px 15px',

        },
    },
    addOnName: {
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            marginLeft: '0px',
            whiteSpace: 'normal'
        },
    },
    description: {
        fontStyle: 'oblique',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px',
            fontSize: '15px',
            whiteSpace: 'initial',
        },
    },
    price: {
        fontSize: '22px',
        fontWeight: '600',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            marginLeft: '0px',
        },
    },
    checkbox: {
        fontSize: '33px',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.common.white,
        },
    },
    checkboxRoot: {
        height: 'fit-content',
        width: 'fit-content',
        marginRight: '25px',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.common.white,
        },
        '&.MuiCheckbox-colorSecondary.Mui-checked:hover': {
            backgroundColor: theme.palette.common.white,
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '5px',
        },
    },
    displayFlex: {
        display: 'flex',
    },
});
// const [checked, setChecked] = useState(false);
// const [selected, setSelected] = useState(selectedAddonsServices || []);

// const addonsDescription = addon?.Description || 'Brightens, adds shine & removes dullness.';
// const addonsPrice = addon?.Price?.Amount > 0 ? addon.Price.Amount : 10;

// const setAllToSameService = (service) => {
//     const newServices = [];
//     for (let i = 0; i < guests + 1; i += 1) {
//         if (i === 0) {
//             newServices.push({ user: 'Me', service });
//         } else {
//             newServices.push({ user: `Guest ${i}`, service });
//         }
//     }
//     return newServices;
// };

// useEffect(() => {
//     if (!guests && selectedAddonsServices.length) {
//         setAddonsService([selectedAddonsServices.find((s) => s.user === 'Me')] || []);
//     }
// });

// const handleAddonsData = (service) => {
//     setChecked(!checked);
//     let newServices = [];
//     if (guests && isDifferentServiceEnabled) {
//         newServices = setAllToSameService(service);
//     } else if (guests) {
//         const oldServ = [...selected].filter((s) => s.user !== service.user);
//         oldServ?.push(service);
//         newServices = [...oldServ];
//     } else {
//         newServices = [service];
//     }
//     setSelected(newServices);
//     setAddonsService(newServices);
// };

const modalImages = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe5OP0h7GtgXN_kZsXTmSMR_pXcRmq4wETw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUrQjyM-ZTw0Oike9aRg9ACLbGTHM7uIjcZA&usqp=CAU',
];

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Pro in gravida dolor sit amet lacus accumsan et viverra justo. Donec nunc dui, varius eget nisi et, convallis bibendum est. Nulla vel odio quis nisi finibus rutrum. Sed nec ex sit amet turpis finibus tristique. Cras porta dictum varius.';

// we need user type the service is added for
// we need the addOn data selected
// if same for all, set for all
const AddOnCard = ({
    classes,
    addonData,
    selectedUser,
    isSelectedForUser,
    setSelectedAddonForUser, // setAddonsService, guests, selectedAddonsServices, isDifferentServiceEnabled, selectedUser,
    availableServiceIds
}) => {
    const [detailsModal, setDetailsModal] = useState(false);
    const addonsDescription = addonData?.Description || 'Brightens, adds shine & removes dullness.';
    const addonsPrice = addonData?.Price?.Amount;

    const [selected, setSelected] = useState(isSelectedForUser || false);
    const [loading, setLoading] = useState(false);
    const [productForPopup, setProductForPopup] = useState(null);

    const getDetail = () => {
        setLoading(true);
        const PRODUCT_ADD_ON_QUERY = ProductAddOnCollection(addonData.ID);
        doQuery(PRODUCT_ADD_ON_QUERY)
            .then(data => {
                setLoading(false);
                setProductForPopup(data?.productCollection?.items?.[0] || null);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }


    const onOpenDetail = () => {
        setDetailsModal(true);
    }

    useEffect(() => {
        getDetail()
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

    const handleClick = (addOn) => {
        const addOnObj = {
            user: selectedUser,
            data: addOn,
        };
        setSelected(!selected);
        setSelectedAddonForUser(addOnObj);
    };

    return (
        <>
            {detailsModal ? (
                <TreatmentDetailsModal
                    onClose={() => setDetailsModal(false)}
                    productsForPopup={productForPopup}
                />
            ) : null}
            <Grid className={classes.displayFlex}>
                {
                    productForPopup && <Tooltip
                    disableHoverListener={true}
                    title={addonData.DurationType.Name}
                    placement="left-start"
                    onClick={() => onOpenDetail(addonData.ID)}
                >
                    <InfoIcon className={classes.icon} />
                </Tooltip>
                }

                <Button
                    variant="contained"
                    className={classes.buttonContainer}
                    onClick={() => {
                        if (availableServiceIds.indexOf(addonData.ID) >= 0) {
                            handleClick(addonData)
                        }
                    }}
                    disableRipple
                >
                    <Grid className={classes.root}>
                        <Grid className={classes.content}>
                            <Typography className={classes.addOnName}>
                                {addonData.Name}
                            </Typography>
                            <Typography className={classes.description}>
                                {addonsDescription}
                            </Typography>
                            <Typography className={classes.price}>
                                $
                                {addonsPrice}
                            </Typography>
                        </Grid>
                        <Checkbox
                            checked={selected}
                            className={classes.checkboxRoot}
                            checkedIcon={<CheckCircleIcon className={classes.checkbox} />}
                            icon={<RadioButtonUncheckedIcon className={classes.checkbox} />}
                            disabled={availableServiceIds.indexOf(addonData.ID) < 0}
                        />
                    </Grid>
                </Button>
            </Grid>
        </>
    );
};

AddOnCard.propTypes = {
    classes: object.isRequired,
};

const mapStateToProps = (state) => ({
    isDifferentServiceEnabled: isGuestWithDifferentServices(state),
    selectedAddonsServices: getAddOnsServiceData(state),
    availableServiceIds: getAvailableServiceIds(state)
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedAddonForUser: bindActionCreators(setAddOnsServiceUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddOnCard));
