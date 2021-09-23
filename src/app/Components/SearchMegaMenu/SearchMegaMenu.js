import React, {useEffect, useState} from 'react';
import {Input, InputAdornment, Grid, withStyles} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Slider from "react-slick";
import LocationImg from '../../../assets/images/mapMarkerIcon.png';
import arrowLeftIcon from '../../../assets/images/arrow-left-1.svg';
import arrowRightIcon from '../../../assets/images/arrow-right-1.svg';
import addressMarker from '../../../assets/images/activeMarker.svg';
import {DESKTOP_BREAKPOINT, TABLET_BREAKPPOINT, MOBILE_BREAKPOINT} from '../../../Helpers/breakpoints';

const styles = theme => ({
    input: {
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: 'calc(100% - 40px)',
            margin: '8px 20px',
        },
    },
    searchMenuWrapper: {
        position: 'static',
        paddingBottom: '10px',
    },
    search: {
        zIndex: '99',
        display: 'flex',
        color: '#42413D',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            color: '#989898',
        },
    },
    section: {
        width: '25%',
        padding: '16px',
        [theme.breakpoints.down(DESKTOP_BREAKPOINT)]: {
            width: '50%',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '100%',
            padding: '8px',
        }
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '8px',
        fontFamily: 'MrsEavesSmallCaps',
        borderBottom: '1px solid #d1d1d1',
    },
    subSection: {
        display: 'block',
        padding: '16px 0',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            display: 'none',
        }
    },
    subSectionMobile: {
        display: 'none',
        padding: '16px 0',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            display: 'block',
            padding: '4px 0',
        }
    },
    categoryTitle: {
        fontSize: '20px',
        paddingRight: '8px',
        textTransform: 'uppercase',
        color: '#42413D',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '18px',
        }
    },
    categoryCount: {
        fontSize: '18px',
        color: '#767676',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '16px',
        }
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
        padding: '4px 0',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            flexDirection: 'column',
            margin: '0 4px',
            padding: '4px 0',
        }
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    image: {
        border: '1.5px solid #E3E3E3',
        marginRight: '16px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            marginRight: '0',
        }
    },
    video: {
        flexBasis: '200px',
        flexGrow: '0',
        flexShrink: '0',
        marginRight: '16px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            flexBasis: '95px',
            margin: '2px',
        },
    },
    itemTitle: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#42413D',
        fontSize: '11px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            paddingTop: '4px',
        }
    },
    itemContent: {
        fontSize: '11px',
    },
    locationAddress: {
        fontSize: '11px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '14px',
        }
    },
    price: {
        fontSize: '11px',
        fontWeight: '600',
    },
    slickArrow: {
        top: '43px',
    },
    ellipsis: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': 1,
        '-webkit-box-orient': 'vertical',
    },
    ellipsis4: {
        '-webkit-line-clamp': 4,
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            '-webkit-line-clamp': 2,
        }
    },
});

const NextArrow = ({ classes, onClick }) => (
    <div className={`slick-arrow right ${classes.slickArrow}`} onClick={onClick}>
        <img src={arrowLeftIcon} />
    </div>
);

const PrevArrow = ({ classes, onClick }) => (
    <div className={`slick-arrow left ${classes.slickArrow}`} onClick={onClick}>
        <img src={arrowRightIcon} />
    </div>
);

const Title = ({ classes, title, count }) => (
    <div className={classes.header}>
        <span className={classes.categoryTitle}>{title}</span>
        <span className={classes.categoryCount}>({count} items)</span>
    </div>
);

const StyleItem = ({ classes, image, width, title, link }) => (
    <div className={classes.flexRow}>
        <img src={image}
            className={classes.image}
            width={width}
            alt="styles"
        />
        <div className={classes.flexCol}>
            <div className={`${classes.itemTitle} ${classes.ellipsis}`}>{title}</div>
            {link && <Link to={link}>view more</Link>}
        </div>
    </div>
);

const LocationItem = ({ classes, image, width, title, address, openHours }) => (
    <div className={classes.flexRow} style={{ flexDirection: 'row' }}>
        <img src={image}
            className={classes.image}
            width={width}
            alt="location"
            style={{ border: 'none', marginRight: '4px' }}
        />
        <div>
            {title && <div className={`${classes.itemTitle} ${classes.ellipsis}`}>{title}</div>}
            {address && <div className={`${classes.locationAddress} ${classes.ellipsis}`}>{address}</div>}
            {openHours && <div className={`${classes.itemContent} ${classes.ellipsis}`}>{openHours}</div>}
        </div>
    </div>
)

const VideoItem = ({ classes, video, width, height, title, content }) => (
    <div className={classes.flexRow}>
        <ReactPlayer
            url={video}
            className={`video-player ${classes.video}`}
            width={width}
            height={height}
        />
        <div>
            <div className={`${classes.itemTitle} ${classes.ellipsis}`}>{title}</div>
            <div className={`${classes.itemContent} ${classes.ellipsis} ${classes.ellipsis4}`}>{content}</div>
        </div>
    </div>
);

const ProductItem = ({ classes, image, width, title, price, content }) => (
    <div className={classes.flexRow}>
        <img src={image}
            className={classes.image}
            width={width}
            alt="product"
        />
        <div>
            <div className={`${classes.itemTitle} ${classes.ellipsis}`}>
                {title}
            </div>
            <div className={classes.price}>
                {price}
            </div>
            <div className={`${classes.itemContent} ${classes.ellipsis} ${classes.ellipsis4}`}>
                {content}
            </div>
        </div>
    </div>
);

const SearchMegaMenu = ({classes, className}) => {
    const [visible, setVisible] = useState(false);

    const slickSettings = {
        // dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        slidesPerRow: 1,
        nextArrow: <NextArrow classes={classes} />,
        prevArrow: <PrevArrow classes={classes} />
    };

    const videoSlickSettings = {
        ...slickSettings,
        slidesToShow: 2,
        slidesToScroll: 2,
    };

    return <div className={`${classes.searchMenuWrapper} ${className}`}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}>
        <Input
            className={classes.input}
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            }
        />
        {visible && <Grid className={`mega-menu-section dropdown-content ${classes.search}`} container>
        {/* {<Grid className={`mega-menu-section dropdown-content ${classes.search}`} container> */}
            <Grid item className={classes.section}>
                <Title classes={classes} title="styles" count={8} />
                <div className={classes.subSection}>
                    <StyleItem
                        classes={classes}
                        image={"https://images.ctfassets.net/13n1l6os99jz/66UKg9zOV4TkGyCkIR3ELi/83f96ad2ac5139617ced57cec79387ad/Services_Straight_Up8_822x822.jpg"}
                        width="117"
                        title="Mai Tai"
                        link="/"
                    />
                    <StyleItem
                        classes={classes}
                        image={"https://images.ctfassets.net/13n1l6os99jz/66UKg9zOV4TkGyCkIR3ELi/83f96ad2ac5139617ced57cec79387ad/Services_Straight_Up8_822x822.jpg"}
                        width="117"
                        title="Mai Tai"
                        link="/"
                    />
                </div>
                <div className={classes.subSectionMobile}>
                    <Slider {...slickSettings}>
                        <StyleItem
                            classes={classes}
                            image={"https://images.ctfassets.net/13n1l6os99jz/66UKg9zOV4TkGyCkIR3ELi/83f96ad2ac5139617ced57cec79387ad/Services_Straight_Up8_822x822.jpg"}
                            width="90"
                            title="Mai Tai"
                        />
                        <StyleItem
                            classes={classes}
                            image={"https://images.ctfassets.net/13n1l6os99jz/66UKg9zOV4TkGyCkIR3ELi/83f96ad2ac5139617ced57cec79387ad/Services_Straight_Up8_822x822.jpg"}
                            width="90"
                            title="Mai Tai"
                        />
                    </Slider>
                </div>
            </Grid>

            <Grid item className={classes.section}>
                <Title classes={classes} title="locations" count={8} />
                <div className={classes.subSection}>
                    <LocationItem
                        classes={classes}
                        image={LocationImg}
                        width={"60"}
                        title={"Drybar Huntington Beach, Pacific City"}
                        address={"21016 Pacific Coast Hwy Suite D104 Lorem ipsum coast"}
                        openHours={"9am-5pm daily"}
                    />
                    <LocationItem
                        classes={classes}
                        image={LocationImg}
                        width={"60"}
                        title={"Drybar Huntington Beach, Pacific City"}
                        address={"21016 Pacific Coast Hwy Suite D104  Lorem ipsum coast"}
                        openHours={"9am-5pm daily"}
                    />
                </div>
                <div className={classes.subSectionMobile}>
                    <LocationItem
                        classes={classes}
                        image={addressMarker}
                        width={"13"}
                        address={"21016 Pacific Coast Hwy Suite D104  Lorem ipsum coast"}
                    />
                    <LocationItem
                        classes={classes}
                        image={addressMarker}
                        width={"13"}
                        address={"21016 Pacific Coast Hwy Suite D104 Lorem ipsum coast"}
                    />
                </div>
            </Grid>

            <Grid item className={classes.section}>
                <Title classes={classes} title="How to videos" count={8} />
                <div className={classes.subSection}>
                    <VideoItem
                        classes={classes}
                        video="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                        width="200px"
                        height="120px"
                        title="The VideoTitle"
                        content="Lorem ipsum dolor sit amet, enorm consecte tur adipiscing elit, sindore eiusmod tem is"
                    />
                    <VideoItem
                        classes={classes}
                        video="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                        width="200px"
                        height="120px"
                        title="The VideoTitle"
                        content="Lorem ipsum dolor sit amet, enorm consecte tur adipiscing elit, sindore eiusmod tem is"
                    />
                    <VideoItem
                        classes={classes}
                        video="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                        width="200px"
                        height="120px"
                        title="The VideoTitle"
                        content="Lorem ipsum dolor sit amet, enorm consecte tur adipiscing elit, sindore eiusmod tem is"
                    />
                </div>
                <div className={classes.subSectionMobile}>
                    <Slider {...videoSlickSettings}>
                        <VideoItem
                            classes={classes}
                            video="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                            width="100%"
                            height="95px"
                            title="The VideoTitle"
                            content="Lorem ipsum dolor sit amet, enorm consecte tur adipiscing elit, sindore eiusmod tem is"
                        />
                        <VideoItem
                            classes={classes}
                            video="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                            width="100%"
                            height="95px"
                            title="The VideoTitle"
                            content="Lorem ipsum dolor sit amet, enorm consecte tur adipiscing elit, sindore eiusmod tem is"
                        />
                        <VideoItem
                            classes={classes}
                            video="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                            width="100%"
                            height="95px"
                            title="The VideoTitle"
                            content="Lorem ipsum dolor sit amet, enorm consecte tur adipiscing elit, sindore eiusmod tem is"
                        />
                    </Slider>
                </div>
            </Grid>

            <Grid item className={classes.section}>
                <Title classes={classes} title="Products" count={8} />
                <div className={classes.subSection}>
                    <ProductItem
                        classes={classes}
                        image={"https://images.ctfassets.net/13n1l6os99jz/66UKg9zOV4TkGyCkIR3ELi/83f96ad2ac5139617ced57cec79387ad/Services_Straight_Up8_822x822.jpg"}
                        width="117"
                        title="The Product"
                        price="$15"
                        content={" Sed scelerisque mieu  facilisis orci tempus. Nam aliquet renatis is"}
                    />
                    <ProductItem
                        classes={classes}
                        image={"https://images.ctfassets.net/13n1l6os99jz/RrElBIZl7svZKNpf7OD8r/349e646249b584ce8281318cf4a45f76/Services_Mai-Tai1_822x822.jpg"}
                        width="117"
                        title="The Product"
                        price="$15"
                        content={" Sed scelerisque mieu  facilisis orci tempus. Nam aliquet renatis is"}
                    />
                    <ProductItem
                        classes={classes}
                        image={"https://images.ctfassets.net/13n1l6os99jz/3xjzI7gwzYScjxgH7sZMiH/5cf19cd30801847c39729a6c75c90814/Services_Cosmo2_822x822__1_.jpg"}
                        width="117"
                        title="The Product"
                        price="$15"
                        content={" Sed scelerisque mieu  facilisis orci tempus. Nam aliquet renatis is"}
                    />
                    <ProductItem
                        classes={classes}
                        image={"https://images.ctfassets.net/13n1l6os99jz/5oHoIRtmb3xNtBD1iybmcN/3c37e4728d805e2d0b9e8c982d7b8c7d/Services_Manhattan5_822x822__1_.jpg"}
                        width="117"
                        title="The Product"
                        price="$15"
                        content={" Sed scelerisque mieu  facilisis orci tempus. Nam aliquet renatis is"}
                    />
                </div>
                <div className={classes.subSectionMobile}>
                    <Slider {...slickSettings}>
                        <ProductItem
                            classes={classes}
                            image={"https://images.ctfassets.net/13n1l6os99jz/66UKg9zOV4TkGyCkIR3ELi/83f96ad2ac5139617ced57cec79387ad/Services_Straight_Up8_822x822.jpg"}
                            width="95"
                            title="The Product"
                        />
                        <ProductItem
                            classes={classes}
                            image={"https://images.ctfassets.net/13n1l6os99jz/RrElBIZl7svZKNpf7OD8r/349e646249b584ce8281318cf4a45f76/Services_Mai-Tai1_822x822.jpg"}
                            width="95"
                            title="The Product"
                        />
                        <ProductItem
                            classes={classes}
                            image={"https://images.ctfassets.net/13n1l6os99jz/3xjzI7gwzYScjxgH7sZMiH/5cf19cd30801847c39729a6c75c90814/Services_Cosmo2_822x822__1_.jpg"}
                            width="95"
                            title="The Product"
                        />
                        <ProductItem
                            classes={classes}
                            image={"https://images.ctfassets.net/13n1l6os99jz/5oHoIRtmb3xNtBD1iybmcN/3c37e4728d805e2d0b9e8c982d7b8c7d/Services_Manhattan5_822x822__1_.jpg"}
                            width="95"
                            title="The Product"
                        />
                    </Slider>
                </div>
            </Grid>
        </Grid>}
    </div>;
}

export default withStyles(styles)(SearchMegaMenu);
