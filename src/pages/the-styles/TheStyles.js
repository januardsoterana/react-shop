/* eslint-disable no-console */
import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ReactPlayer from 'react-player';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {Backdrop, CircularProgress} from "@material-ui/core";

import {loadTheStylesContentful} from "../../state/ducks/TheStyles/TheStyles-Actions";
import {
    getStyles,
    getTheStylesSectionDescription,
    getTheStylesSectionHeroImage,
    getTheStylesSectionTitle
} from "../../state/ducks/TheStyles/TheStyles-Selectors";

import '../../assets/css/style.scss';
import '../../assets/css/style-responsive.scss';
import './theStyles.scss';
import './theStyles-responsive.scss';
import arrowLeftIcon from '../../assets/images/arrow-left-1.svg';
import arrowRightIcon from '../../assets/images/arrow-right-1.svg';
import StylesDialog from "./StylesModal";

const NextArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <>
            <div className="slick-arrow right" onClick={onClick}>
                <img src={arrowLeftIcon}/>
            </div>
        </>
    );
};
const PrevArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <>
            <div className="slick-arrow left" onClick={onClick}>
                <img src={arrowRightIcon}/>
            </div>
        </>
    );
};

const TheStyles = ({title, description, heroImage, styles, loadDataFromContentful}) => {

    const slickSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }
        ],
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    };

    const [styleDetailData, setStyleDetailData] = useState({});

    useEffect(() => {
        loadDataFromContentful({});
    }, []);

    if (!title && !description && !heroImage) {
        return (
            <Backdrop style={{zIndex: 11, color: '#fff'}} open>
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    }

    return (
        <div className="tab-pane fade show active mw-1295 m-auto thestyles-page" id="nav-home" role="tabpanel"
             aria-labelledby="nav-home-tab">
            <div className="banner-section">
                <div className="banner-image">
                    <span>{heroImage}</span>
                    <img className="d-block w-100" src={heroImage} alt="Banner"/>
                </div>
            </div>
            <div className="middle-section">
                <div className="book-appointment-section">
                    <div className="row">
                        <h1>{title.toUpperCase()}</h1>
                        <p>{description}</p>
                        <button className="btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100"
                                onClick={() => location.href = "/booking/location"}>
                            Book an Appointment
                        </button>
                    </div>

                    <div className="slider-row">
                        <Slider {...slickSettings}>
                            {styles.map((style, index) => {
                                return <div className="appointment-item" key={'appointment_' + index}>
                                    <div className="content">
                                        <AnchorLink href={`#${style.slug}`}>
                                            <img src={style.featuredImage} alt="style"/>
                                        </AnchorLink>
                                        <div className="mask">
                                            <span className="overlay">{style.title}</span>
                                        </div>
                                    </div>
                                </div>;
                            })}
                        </Slider>
                    </div>
                    {styles.map((style, sIndex) => {
                        return <div className="book-styling-section secondary" id={style.slug} key={sIndex}>
                            <div className="row" id={style.slug}>
                                <div className="text-section">
                                    <div className="yellow-bar-title">
                                        <span className="yellow-bar" />
                                        <h3>{style.title}</h3>
                                    </div>

                                    <p>{style.subtitle}</p>
                                    <button
                                        className="btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100"
                                        onClick={() => location.href = "/booking/location"}>Book
                                        This Style
                                    </button>
                                </div>
                                <div className="video-section">
                                    <div className="video-wrapper">
                                        {style.featuredVideo && style.featuredVideo !== "" &&
                                        <ReactPlayer url={style.featuredVideo}
                                                     className='video-player'
                                                     width='756px'
                                                     height='399px'/>
                                        }
                                        {style.featuredVideo === "" && style.featured360Gif && style.featured360Gif !== "" &&
                                        <img src={style.featured360Gif} width="100%" alt="style"/>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="slider-row">
                                <Slider {...slickSettings}>
                                    {style.gallery.map((item, iIndex) => {
                                        return <div className="style-item" key={`style-gallery-${sIndex}-${iIndex}`}>
                                            <div className="content">
                                                <img src={item.images?.[0] || ''} alt="style"/>
                                                <div className="mask">
                                                    <button
                                                        className="btn-white-trans btn-common w-100 responsive-500-w-100"
                                                        onClick={() => setStyleDetailData({
                                                            style: style,
                                                            lookIndex: iIndex
                                                        })}>
                                                        Show This Model
                                                    </button>
                                                </div>
                                            </div>
                                        </div>;
                                    })}
                                </Slider>
                            </div>
                        </div>;
                    })}
                </div>
                <StylesDialog open={styleDetailData.lookIndex >= 0} handleClose={() => setStyleDetailData({})}
                              bookThisStyle={() => location.href = "/booking/location"}
                              styleData={styleDetailData.style || {}} lookIndex={styleDetailData.lookIndex}/>
                <div className="gradient-bottom-decorator"/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    title: getTheStylesSectionTitle(state),
    description: getTheStylesSectionDescription(state),
    heroImage: getTheStylesSectionHeroImage(state),
    styles: getStyles(state)
});

const mapDispatchToProps = (dispatch) => ({
    loadDataFromContentful: bindActionCreators(loadTheStylesContentful, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TheStyles);

