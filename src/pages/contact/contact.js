/* eslint-disable no-console */
import React from 'react';
import { useQuery } from '@apollo/client';
import './contact.scss';
import {
    Typography, Grid, TextField, Button
} from '@material-ui/core';
import {
    withStyles,
} from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { MOBILE_BREAKPOINT, TABLET_BREAKPPOINT } from '../../Helpers/breakpoints';
import ScreenMarketingCollection from '../../gql/queries/marketingCollection';

import contactBanner from "../../assets/images/contact-banner.png";

const styles = (theme) => ({
    container: {
        backgroundColor: '#F9F9F9',
        paddingBottom: '86px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT+1)]: {
            paddingBottom: '60px',
        },
    },
    bannerContainer: {
        background: '#FFFFFF',
        width: '100%',
        height: '390px',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down(TABLET_BREAKPPOINT+1)]: {
            height: '300px'
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            height: '229px',
        },
    },
    banner: {
        width: '1549px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT+1)]: {
            width: 'auto',
            height: '300px',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: 'auto',
            height: '229px',
        },
    }, 
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    contactCotainer: {        
        justifyContent: 'center',
        width: '1367px',
        margin: '0 auto !important',
        padding: 36,
        [theme.breakpoints.down(1367)]: {
            width: '100%',
        },
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            display: 'block'
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: "10px 0"
        },
    },
    content: {
        padding: 15,
    },
    blockItem: {
        boxShadow: "2px 2px 46px rgba(235, 235, 235, 0.5)",
        backgroundColor: "white",
        padding: "27px 36px",
        marginBottom: 30,
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: 10,
            backgroundColor: "transparent",
            boxShadow: "none"
        },
    },
    inputItem: {
        marginBottom: 29,
        "& label": {
            fontFamily: 'AvenirNext',
            color: "#767676",
            fontSize: 18,
            lineHeight: '25px'
        },
        "& textarea": {
            width: "100%",
            border: "1px solid #d1d1d1",
            outline: "none",
            padding: "32px 26px",
            minHeight: 359
        }
    },
    mr0: {
        marginBottom: 0
    },
    blockTitle: {
        fontFamily: 'AvenirNext',
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "45px",
        color: "#42413D",
    },
    flexItem: {
        display: "flex",
        alignItems: "center",
    },
    socialMedia: {
        width: "100%"
    },
    socialMediaItem: {
        width: "48%",
        height: 161,
        background: "#F7F8F9",
        borderTop: "1px solid #D1D1D1",
        justifyContent: "center",

        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            flexDirection: "column",
            backgroundColor: "white",
            border: "none",
            boxShadow: "2px 2px 46px rgba(235, 235, 235, 0.5)",

            "& p": {
                marginLeft: "0px !important"
            }
        },

        "&:first-child": {
            marginRight: "2%"
        },

        "&:last-child": {
            marginLeft: "2%"
        },

        "& p": {
            marginLeft: 15
        }
    },
    phoneItem: {
        background: "#F7F8F9",
        borderTop: "1px solid #D1D1D1",
        padding: "17px 21px",
        marginBottom: 14,

        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            backgroundColor: "white",
            border: "none",
            boxShadow: "2px 2px 46px rgba(235, 235, 235, 0.5)"
        },

        "& p.title": {
            color: "#767676"
        },

        "& div": {
            justifyContent: "space-between"
        }
    },
    width100: {
        width: "100%"
    },
    width60: {
        width: "60%",
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: "100%",
            marginBottom: 20
        },
    },
    width35: {
        width: "35%",
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: "100%"
        },
    },
    justifyContent: {
        justifyContent: "space-between"
    },
    inputGroup: {
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: 18,
            boxShadow: "2px 2px 46px rgba(235, 235, 235, 0.5)",
            backgroundColor: "white",
            marginBottom: 19
        },
    },
    rowReverse: {
        [theme.breakpoints.up(960)]: {
            alignItems: "flex-end"
        },
        [theme.breakpoints.down(960)]: {
            flexDirection: "column-reverse"
        },
    },
    sectionTitle: {
        textAlign: "center",
        fontFamily: 'DINCondensed',
        fontWeight: "bold",
        fontSize: 42,
        lineHeight: "50px",
        color: "#42413D",
    },
    blowoutsBtn: {
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: '20px 57px !important'
        },
    },
})

const Contact = (props) => {
    const {classes} = props
    const SCREEN_MARKETING_QUERY = ScreenMarketingCollection();
    const { data, error, loading } = useQuery(SCREEN_MARKETING_QUERY);

    if (error) {
        console.log('errror ===>', error);
    }
    
    if (data) {
        console.log('marketing data', data);
    }
    
    return (
        <Grid className={classes.container}>
            <Grid className={classes.bannerContainer}>
                <img src={contactBanner} className={classes.banner} />
            </Grid>
            <Grid className={classes.contactCotainer}>
                <Grid container className={classes.rowReverse}>                    
                    <Grid item xs={12} md={6}>
                        <div className={classes.content}>
                            <div className={classes.blockItem}>
                                <Typography className={classes.blockTitle}>Follow us on social media.</Typography>
                                <div className={`${classes.socialMedia} ${classes.flexItem}`}>
                                    <div className={`${classes.socialMediaItem} ${classes.flexItem}`}>
                                        <InstagramIcon />
                                        <Typography className={classes.blockTitle}>@thedrybar</Typography>
                                    </div>
                                    <div className={`${classes.socialMediaItem} ${classes.flexItem}`}>
                                        <FacebookIcon />
                                        <Typography className={classes.blockTitle}>/thedrybar</Typography>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.blockItem}>
                                <Typography className={classes.blockTitle}>Something complicated? Call Us.</Typography>
                                <div className={classes.phoneItem}>
                                    <p className="title">Drybar Services</p>
                                    <div className={classes.flexItem}>
                                        <Typography className={classes.blockTitle}>(877) 379-2279</Typography>
                                        <PhoneAndroidIcon />
                                    </div>
                                </div>
                                <div className={classes.phoneItem}>
                                    <p className="title">Drybar Products</p>
                                    <div className={classes.flexItem}>
                                        <Typography className={classes.blockTitle}>(800) 646-4479</Typography>
                                        <PhoneAndroidIcon />
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography className={classes.sectionTitle}>WRITE US</Typography>
                        <div className={classes.content}>
                            <div className={classes.blockItem}>
                                <div className={classes.inputGroup}>
                                    <div className={classes.inputItem}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            type="text"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.width100}
                                        />
                                    </div>                            
                                    <Grid container className={`${classes.inputItem} ${classes.flexItem} ${classes.justifyContent}`}>
                                        <TextField
                                            id="email"
                                            label="Email"
                                            type="email"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.width60}                               
                                        />
                                        <TextField
                                            id="phone"
                                            label="Phone Number"
                                            type="text"
                                            placeholder="You phone here..."
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.width35}                                       
                                        />
                                    </Grid>
                                </div>                                
                                <div className={`${classes.inputItem} ${classes.mr0}`}>
                                    <Typography className={classes.blockTitle}>YOUR MESSAGE</Typography>
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                        </div>                        
                    </Grid>                   
                </Grid>
                <Grid container>
                    
                </Grid>              
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(Contact);
