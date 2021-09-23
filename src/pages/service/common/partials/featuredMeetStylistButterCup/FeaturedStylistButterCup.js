/* eslint-disable max-len */
import React from 'react';
import { object } from 'prop-types';
import {
    Grid, Typography,
} from '@material-ui/core';
import InstagramHandler from '../../../../../assets/images/InstagramHandler.svg';

const FeaturedOurStylist = ({ classes, featuredStylistData }) => {
    if (!featuredStylistData) {
        return null;
    }
    const featuredStylistBio = featuredStylistData?.biography?.json?.content || [];
    return (
        <Grid container>
            <Grid>
                <Grid container className={classes.featuredStylistContainer}>
                    <Grid item lg={3} md={3} sm={4}>
                        <img src={featuredStylistData.image.desktopMedia.url} alt={featuredStylistData.name} className={classes.featuredImage} />
                    </Grid>
                    <Grid item lg={7} md={8} sm={7} className={classes.stylistBioContainer}>
                        <Typography className={classes.featuredStyleName}>{featuredStylistData.name}</Typography>
                        {featuredStylistBio.map((bioItems) => (
                            <Typography className={classes.featuredStyleBioDetails}>{bioItems?.content?.[0]?.value}</Typography>
                        ))}
                        <Grid className={classes.displayFlex}>
                            <img src={InstagramHandler} alt="instagram-handler" className={classes.instagramIcon}/>
                            <Typography className={classes.instagramHandlerId}>{featuredStylistData.instagramHandle}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

FeaturedOurStylist.propTypes = {
    featuredStylistData: object.isRequired,
    classes: object.isRequired,
};

export default FeaturedOurStylist;
