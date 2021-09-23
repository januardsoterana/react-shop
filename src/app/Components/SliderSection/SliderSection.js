/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import { node, object } from 'prop-types';
import React, { useState } from 'react';
import DesktopHomePageContainer from '../../../pages/home/Home';

const styles = () => ({
    container: {
        position: 'relative',
    },
    image: {
        width: '100%',
    },
    textContainer: {
        position: 'absolute',
        textAlign: 'center',
        top: '160px',
        left: '0',
        right: '0',
    },
    headingtext: {
        fontSize: '109px',
        color: '#ABC7E6',
        lineHeight: '101px',
        textShadow: '2px 3px #265e9b',
        fontFamily: 'DINCondensed',
        letterSpacing: '-3px',
        fontWeight: '700',
    },
    subText: {
        fontSize: '22px',
        color: '#42413D',
        margin: '60px 0 35px',
        fontWeight: '400',
    },
    button: {
        padding: '7px 44px',
        width: '173px',
        height: '42px',
        fontSize: '15px',
    },
    navigationDot: {
        width: '12px',
        borderRadius: '100%',
        height: '12px',
        border: 'solid 1px #42413D',
        backgroundColor: '#0000',
        margin: '0 10px',
        cursor: 'pointer',
    },
    dotContainer: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'row',
        padding: '0',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '100px',
        left: '0',
        right: '0',
    },
    selected: {
        backgroundColor: '#FFDD30',
        border: '0px',
    },
});

const SliderSection = ({ block, classes }) => {
    const [currentIndex, setIndex] = useState(0);
    const getNavigationDots = () => (
        <ul className={classes.dotContainer}>
            { block.map((c, index) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <li
                    className={`${classes.navigationDot} ${currentIndex === index ? classes.selected : ''}`}
                    onClick={() => setIndex(index)}
                />
            ))}
        </ul>
    );

    return (
        <Grid className={classes.container}>
            <Grid>
                <img className={classes.image} src={block[currentIndex].img} alt="Slider" />
                <Grid className={classes.textContainer}>
                    {block[currentIndex].text ? block[currentIndex].text.split('\n').map((text) => (
                        <Typography className={classes.headingtext}>
                            {text}
                        </Typography>
                    )) : null}
                    {block[currentIndex].subText ? (
                        <Typography className={classes.subText}>
                            {block[currentIndex].subText}
                        </Typography>
                    ) : null}
                    {block[currentIndex].button ? (
                        <Button className={classes.button} variant="contained" color="secondary">
                            {block[currentIndex].button}
                        </Button>
                    ) : null}
                </Grid>
                {getNavigationDots()}
            </Grid>
            <DesktopHomePageContainer />
        </Grid>

    );
};

SliderSection.propTypes = {
    block: node.isRequired,
    classes: object.isRequired,
};

export default withStyles(styles)(SliderSection);
