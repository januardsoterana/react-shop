import React, { useEffect, useRef, useState } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { object, array } from 'prop-types';
import {
    Button, Grid, InputAdornment, TextField, Typography, withStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { chooseStore, loadStoresContentful } from "../../state/ducks/Barfly/Barfly-Actions";
import barflyHeader from '../../assets/images/barflyHeader.jpg';
import BarflyMembershipPriceCard from './Partials/BarflyMembershipPriceCard';
import barflyMembershipHeartDark from '../../assets/images/barflyMembershipHeartDark.svg';
import { MOBILE_BREAKPOINT, TABLET_BREAKPPOINT } from '../../Helpers/breakpoints';
import { getChosenStore, getStores, isStoreLoaded } from "../../state/ducks/Barfly/Barfly-Selectors";
import MembershipSignupModal from "../../app/Components/MembershipSignupModal";

import StoreChooseDialog from "./Partials/BarflyChooseStore";
import './BarflyMembership.scss';
import { useFetchAsync } from "../../Helpers/useFetch";
import { createOrder, findMemberships } from "../../api/booking-api";

const styles = (theme) => ({
    barflyPageContainer: {
        maxWidth: '1400px',
        width: '100%',
        margin: 'auto',
        backgroundColor: '#fff',
        padding: '36px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            padding: '5px',
        },
    },
    barflyAccountPageContainer: {
        padding: '0px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            backgroundColor: '#f9f9f9',
        },
    },
    headerImage: {
        margin: '5px 0',
        width: '100%',
    },
    mainContent: {
        margin: '50px 0',
    },
    storeSearchHeader: {
        fontWeight: '800',
        fontSize: '25px',
        lineHeight: '29px'
    },
    searchFieldHeight: {
        height: '100%',
        fontSize: '18px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
        },
    },
    memberShipDetailsContainer: {
        backgroundImage: 'linear-gradient(135deg, #ffffff 35.71%, #e2e2e2 35.71%, #e2e2e2 50%, #ffffff 50%, #ffffff 85.71%, #e2e2e2 85.71%, #e2e2e2 100%)',
        backgroundSize: '9.90px 9.90px',
        padding: '36px 20px',
        display: 'flex',
        border: '2px solid #E2E2E2',
        boxSizing: 'border-box',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            flexWrap: 'wrap',
            padding: '10px 4px',
        },
    },
    memberShipAccountDetails: {
        padding: '17px 0px'
    },
    darkCard: {
        backgroundColor: '#42413D',
        color: '#fff',
    },
    callUsContainer: {
        background: '#F7F8F9',
        borderTop: '1px solid #D1D1D1',
        padding: '42px 20px 60px 20px',
        textAlign: 'center',
    },
    callUsText: {
        fontSize: '25px',
        color: '#42413D',
        marginBottom: '42px',
    },
    callUsButton: {
        border: '1px solid #42413D',
        maxWidth: '378px',
        width: '100%',
        padding: '15px',
        textTransform: 'none',
        fontSize: '18px',
        borderRadius: '0',
        marginTop: '42px'
    },
    clickHereBtn: {
        color: '#42413D',
        textDecoration: 'underline',
        fontSize: '18px',
        lineHeight: '18px',
        margin: '-3px 0 0',
        padding: '0 5px'
    },
    clickHereText: {
        margin: '26px auto !important',
        textAlign: 'center',
        fontSize: '18px',
        color: '#767676'
    },
    selectButton: {
        maxWidth: '378px',
        width: '287px',
        height: '48px',
        margin: '-21px 0px 0px 160px',
        fontSize: '18px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            flexWrap: 'wrap',
            margin: '14px 5px',
            maxWidth: 'none',
        },
    },
    barflyAccountUpgrade: {
        display: "flex",
        marginLeft: '97px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            display: "block",
            marginLeft: '0px',
        },
    }
});

const BarflyMembershipEnrollment = ({
    classes, barflyMembershipCollection, selectedStore,
    storeLoaded, stores, loadStoresFromContentful, isAccountBarfly
}) => {
    const [searchKey, setSearchKey] = useState('');
    const [isDialogOpened, OpenDialog] = useState(false);
    const [matchedStores, setMatchedStores] = useState([]);
    const [memberships, setMemberships] = useState([]);
    const [membershipSignupModal, setMembershipSignupModal] = useState(false);
    const signatureMembership = barflyMembershipCollection?.length > 0 ? barflyMembershipCollection[0] : {
        id: '',
        price: 0
    };
    const premiumMembership = barflyMembershipCollection?.length > 1 ? barflyMembershipCollection?.[1] : {
        id: '',
        price: 0
    };

    useEffect(() => {
        loadStoresFromContentful({});
        chooseStore({});
    }, [])

    // search store
    const onSearchStore = () => {
        console.log("search key ", searchKey)
        console.log("stores", stores)
        const matchedStores = stores.filter(store =>
            store.title?.includes(searchKey) || store.contact?.city?.includes(searchKey)
            || store.contact?.state?.includes(searchKey) || store.contact?.postalCode?.includes(searchKey));
        console.log("match stores", matchedStores)
        setMatchedStores(matchedStores);
        if (matchedStores.length > 0) {
            setSearchKey('');
            OpenDialog(true);
        } else {
            toast('No matching stores found.');
        }
    }

    const onRefreshMemberships = async () => {
        const storeLocationId = selectedStore?.bookerLocationId || '30354';
        const { data, error } = await useFetchAsync(findMemberships(storeLocationId));
        if (error) {
            console.log(error);
        }

        if (data?.IsSuccess) {
            let memberships = data.Results || [];
            memberships = memberships.sort((m1, m2) =>
                m1.MembershipBillableItem?.Price?.Amount - m2?.MembershipBillableItem?.Price?.Amount);

            setMemberships(memberships);
        }
    };

    const handleCloseModal = () => {
        onRefreshMemberships();
        OpenDialog(false);
    }

    return (
        <Grid className={isAccountBarfly ? `${classes.barflyAccountPageContainer} ${classes.barflyPageContainer}` : classes.barflyPageContainer} id="barfly-membership">
            {!isAccountBarfly && (
                <img className={classes.headerImage} src={barflyHeader} alt="Barfly Membership" />
            )}
            <Grid className={classes.mainContent}>
                {!isAccountBarfly && (
                    <>
                        <Typography className={classes.storeSearchHeader}>
                            What is your preferred store?
                        </Typography>
                        <Grid className="preferred-store-container d-flex flex-column">
                            <Grid className="d-flex align-items-center selected-store">
                                <Typography className="label">
                                    Store Selected:
                                </Typography>
                                <Typography className="value">
                                    {selectedStore.title}
                                </Typography>
                            </Grid>
                            <Grid className="search-row d-flex flex-row align-items-end">
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon style={{ fontSize: '30px' }} />
                                            </InputAdornment>
                                        ),
                                        classes: {
                                            root: classes.searchFieldHeight,
                                        },
                                    }}
                                    value={searchKey}
                                    placeholder="City, State or Zip"
                                    onChange={(e) => setSearchKey(e.target.value)}
                                />
                                <Button disabled={!storeLoaded} className={classes.searchButton} variant="outlined"
                                    onClick={onSearchStore}>Search</Button>
                            </Grid>
                        </Grid>
                    </>
                )}

                <Grid className={isAccountBarfly ? `${classes.memberShipAccountDetails} ${classes.memberShipDetailsContainer}` : classes.memberShipDetailsContainer}>
                    {/*{memberships.map(membership => <BarflyMembershipPriceCard*/}
                    {/*    id={membership?.ID}*/}
                    {/*    headerTitle={membership?.MembershipLevel?.LevelName}*/}
                    {/*    price={membership?.MembershipBillableItem?.Price?.Amount}*/}
                    {/*    blowouts="4 BLOWOUTS A MONTH"*/}
                    {/*    additionalOffers={membership?.Benefits || []}*/}
                    {/*/>)}*/}

                    <BarflyMembershipPriceCard
                        id={memberships.length > 0 ? memberships[0].ID : ''}
                        headerTitle={signatureMembership.title}
                        price={memberships.length > 0 ? memberships[0].MembershipBillableItem?.Price?.Amount : signatureMembership.price}
                        // price={signatureMembership.price}
                        blowouts={signatureMembership.subtitle}
                        additionalOffers={signatureMembership.benefitsCollection.items}
                        isAccountBarfly={isAccountBarfly}
                    />
                    {console.log("price testing ==>", memberships, premiumMembership)}
                    <BarflyMembershipPriceCard
                        id={memberships.length > 0 ? memberships[memberships.length - 1].ID : ''}
                        headerTitle={premiumMembership.title}
                        classes={{
                            headerTitle: classes.darkCard,
                        }}
                        priceCardHeaderIcon={barflyMembershipHeartDark}
                        //here we were putting the one index behind value but on that location initial load we get only 1 index value So that's why signature price was injected into premium 
                        price={(memberships.length > 0 && memberships.length > 1) ? memberships[memberships.length - 1].MembershipBillableItem?.Price?.Amount : premiumMembership.price}
                        // price={premiumMembership.price}
                        blowouts={premiumMembership.subtitle}
                        additionalOffers={premiumMembership.benefitsCollection.items}
                        isAccountBarfly={isAccountBarfly}
                    />
                </Grid>
                {!isAccountBarfly && (
                    <>
                        <Typography style={{ margin: '26px auto', textAlign: 'center', fontSize: '18px', color: '#767676' }}>
                            *Membership prices vary by market. See below for details.
                </Typography>
                        <Grid className={classes.callUsContainer}>
                            <Typography className={classes.callUsText}>
                                Interested in upgrading your membership? Call
                        {' '}
                                <span style={{ fontWeight: '800' }}>(877) 379-2279</span>
                                {' '}
                        so we can help.
                    </Typography>
                            <Button className={classes.callUsButton} variant="outlined">
                                Call Us
                    </Button>
                        </Grid>
                        <Typography className={classes.clickHereText}>
                            If you’d like to suspend or cancel your membership today, please
                    {' '}
                            <Button variant="text" className={classes.clickHereBtn}
                                onClick={() => setMembershipSignupModal(true)}>click here</Button>
                    .
                </Typography>
                    </>
                )}

                {membershipSignupModal ? (
                    <MembershipSignupModal
                        onClose={() => setMembershipSignupModal(false)}
                    />
                ) : null}
            </Grid>
            {isAccountBarfly && (
                <Grid className={classes.barflyAccountUpgrade}>
                    <Typography style={{ fontSize: '19px' }}>Your Current Plan</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.selectButton}
                    >
                        Upgrade to Premium
                    </Button>
                </Grid>
            )}
            <StoreChooseDialog open={isDialogOpened} handleClose={handleCloseModal} stores={matchedStores} />
            <ToastContainer hideProgressBar={true} />
        </Grid>
    );
};

BarflyMembershipEnrollment.propTypes = {
    classes: object.isRequired,
    barflyMembershipCollection: array.isRequired,
};

const mapStateToProps = (state) => ({
    storeLoaded: isStoreLoaded(state),
    stores: getStores(state),
    selectedStore: getChosenStore(state)
});

const mapDispatchToProps = (dispatch) => ({
    loadStoresFromContentful: bindActionCreators(loadStoresContentful, dispatch),
    chooseStore: bindActionCreators(chooseStore, dispatch),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BarflyMembershipEnrollment));
