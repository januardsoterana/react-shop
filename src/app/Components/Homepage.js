import { Grid } from '@material-ui/core';
import React from 'react';
import SliderSection from './SliderSection/SliderSection';
import sliderImage from '../../assets/images/slider.jpg';

const data = [{
    slider: [
        {
            img: sliderImage, text: 'LOREM\nIPSUM\nDOLOR!', subText: 'Lorem ipsum dolor sit amet', button: 'Book Today',
        },
        {
            img: sliderImage, text: 'LOREM\nIPSUM\nDOLOR!', subText: 'Lorem ipsum dolor sit amet', button: 'Book Today',
        },
    ],
}];

const Homepage = () => (
    <Grid>
        {data.map((block) => {
            switch (Object.keys(block)[0]) {
            case 'slider':
                return <SliderSection block={block.slider} />;
            default:
                return null;
            }
        })}
    </Grid>
);

Homepage.propTypes = {
    // data: array.isRequired,
};

export default Homepage;
