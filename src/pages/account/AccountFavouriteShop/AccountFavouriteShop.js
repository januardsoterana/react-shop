/* eslint-disable max-len */
import {
    Grid, Typography, withStyles, FormControl, Input, Button,
} from '@material-ui/core';
import { object } from 'prop-types';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
// import EditableTextField from '../../app/Components/EditableTextField/EditableTextField';
import FavouriteSelectedShop from '../../booking/SelectLocation/Partials/LocationCard';
import FavouriteSelectedMock from '../../../__mocks__/favouriteShop.json'

const styles = () => ({
    containerShop: {
        background: '#fff',
        marginLeft: '15px',
        padding: '34px 22px',
        textAlign: 'center',
        height: '517px',
    },
    heading: {
        float: 'left',
        paddingBottom: '18px',
        fontFamily: 'MrsEavesSmallCap',
        color: '#42423D',
        fontSize: '20px',
    },
    formContainer: {
        margin: '46px 2px 2px 2px',
        width: '710px',
        height: '181px',
        backgroundColor: '#F9F9F9F9',
        borderTop: '1px solid #D1D1D1',
    },
    textWrapper: {
        display: 'flex',
        fontSize: '15px',
        width: '366px',
        textAlign: 'initial',
    },
    borderPixelLocation: {
        border: 'none',
    },
    distance: {
        color: '#989898',
        float: 'left',
        margin: '1% 0% 0% 11%',
    },
    optionsButtonsContainer: {
        width: '66%',
        margin: '0px 0px 0px 52px',
        textAlign: 'initial',
        padding: '0px',
    },
    locationCardTopContainer: {
        height: '224px',
    },
    favoriteShop: {
        margin: '69px 0px 0px 0px',
    },
    enterYourEmail: {
        width: '100%',
        height: '40px',
    },
    subscribeEmail: {
        background: '#54575A',
        borderRadius: '0px',
        color: '#FFFFFF',
        fontSize: '13px',
        width: '124px',
        height: '40px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
        },
    },
    subscribeEmailForm: {
        display: 'flex',
        flexDirection: 'row',
        width: '30%',
        minWidth: '673px',
        borderTop: '1px solid #D1D1D1',
        padding: '21px 2px 2px 2px',
    },
    nonFavouriteShop: {
        textAlign: "center",
        fontSize: "28px",
        marginTop: "66px !important"
    }
});

/**
 * Static data - make dynamic when connected with API
 */
const AccountFavouriteShop = ({ classes, contentfulStores, customerFields }) => {

    // here checking the location Id with content ful store 
    const customerFieldsValue = customerFields?.CustomerFieldValues?.FieldValues || []
    const getCustomerFieldsKey = customerFieldsValue.filter(hasKey => hasKey?.Key === 56378)
    const getCustomerFvtLocationId = getCustomerFieldsKey?.[0]?.Value?.TextValue?.Value || ''
    const getFavouriteLocation = contentfulStores.filter(hasLoc => hasLoc?.bookerLocationId === Number(getCustomerFvtLocationId))

    if (getCustomerFvtLocationId.length < 1) {
        return <Typography className={classes.nonFavouriteShop}>You don't have any favourites shop.</Typography>
    }

    return (
        <Grid className={classes.containerShop}>
            <Typography className={classes.heading}>
                Your Favourite Shop
        </Typography>
            <Grid className={classes.formContainer}>
                {getFavouriteLocation?.map((data) => (
                    <FavouriteSelectedShop
                        // onLocationSelect={onLocationSelect}
                        key={`${data.lat}`}
                        locationData={data}
                        classes={classes}
                    />
                ))}

            </Grid>
            <Grid className={classes.favoriteShop}>
                <Typography className={classes.heading}>
                    Change Favorite Shop
            </Typography>
                <FormControl fullWidth className={classes.subscribeEmailForm}>
                    <Input
                        classes={{
                            input: classes.input,
                        }}
                        id="standard-adornment-amount"
                        value=""
                        // onChange={handleChange('amount')} // this will use in future when data come from API
                        placeholder="Adress, City or Postal Code"
                        className={classes.enterYourEmail}
                        startAdornment={(
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )}
                    />
                    <Button className={classes.subscribeEmail} variant="outlined">
                        Search
                </Button>
                </FormControl>
            </Grid>
        </Grid>
    )
}


AccountFavouriteShop.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(AccountFavouriteShop);
