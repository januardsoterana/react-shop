/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DESKTOP_BREAKPOINT, TABLET_BREAKPPOINT } from '../../../../Helpers/breakpoints';
import facebookIconFooter from '../../../../assets/images/Facebook.svg';
import instagramIconFooter from '../../../../assets/images/InstagramFooter.svg';
import twitterIconFooter from '../../../../assets/images/Twitter.svg';
import pinterestIconFooter from '../../../../assets/images/Pinterest.svg';
import youtubeIconFooter from '../../../../assets/images/Youtube.svg';

const useStyles = makeStyles((theme) => ({
    footerIcon: {
        margin: '0 8px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            height: '24px',
            margin: '0 18px',
        },
    },
}));

const linksFooter = () => {
    const classes = useStyles();

    return (
        <>
            <img alt="Remy Sharp" src={facebookIconFooter} className={classes.footerIcon} />
            <img alt="Remy Sharp" src={instagramIconFooter} className={classes.footerIcon} />
            <img alt="Remy Sharp" src={twitterIconFooter} className={classes.footerIcon} />
            <img alt="Remy Sharp" src={pinterestIconFooter} className={classes.footerIcon} />
            <img alt="Remy Sharp" src={youtubeIconFooter} className={classes.footerIcon} />
        </>
    );
};

export default linksFooter;
