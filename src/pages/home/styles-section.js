import React, {Component} from 'react';
import {isMobile, isTablet} from "react-device-detect";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import heartImage from '../../assets/images/ic-heart.png';

import {getTheStylesData} from "../../state/ducks/Home/Home-Selectors";
import {connect} from "react-redux";
import arrowLeftIcon from "../../assets/images/arrow-left-1.svg";
import arrowRightIcon from "../../assets/images/arrow-right-1.svg";

const NextArrow = (props) => {
    const {onClick} = props;
    return (
        <>
            <div className="slick-arrow right" onClick={onClick}>
                <img src={arrowLeftIcon}/>
            </div>
        </>
    );
};
const PrevArrow = (props) => {
    const {onClick} = props;
    return (
        <>
            <div className="slick-arrow left" onClick={onClick}>
                <img src={arrowRightIcon}/>
            </div>
        </>
    );
};

class StylesSectionView extends Component {
    constructor(props) {
        super(props);

        this.renderCarousel = this.renderCarousel.bind(this);
        this.getSlide = this.getSlide.bind(this);
    }

    getSlide(sliderData, isScreen) {

        return isScreen ? (<div className="d-flex flex-wrap">
            {sliderData.map((item, index) => {
                return <div className="col-sm-6 col-md-6 slider-wrap" key={index}>
                    <div className="row">
                        <div className="inner-slide-item">
                            <div className="d-flex position-relative">
                                <a href="#" onClick={() => null} className="slider_info">
                                    <img className="img-fluid card-img-top" src={item['image']} alt=""/>
                                    <div className="card-img-overlay t_img">
                                        <span className="text-uppercase">{item['title']}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>) : (
            <div className="inner-slide-item">
                <div className="d-flex position-relative">
                    <a href="#" onClick={() => null} className="slider_info">
                        <img className="img-fluid card-img-top" src={sliderData['image']} alt=""/>
                        <div className="card-img-overlay t_img">
                            <span className="float-left text-uppercase">{sliderData['title']}</span>
                        </div>
                    </a>
                </div>
            </div>);
    }

    renderCarousel() {
        const slickSettings = {
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1028,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 504,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ],
            nextArrow: <NextArrow/>,
            prevArrow: <PrevArrow/>
        };

        const isScreen = window.innerWidth > 1028;
        const items = this.props.stylesData.items;

        let countPerPage = isScreen ? 4 : 1;
        let groups = [];
        for (let i = 0; i < items.length; i = i + countPerPage) {
            let group = [];
            for (let j = 0; j < Math.min(countPerPage, items.length - i); j++) {
                group.push(items[i + j]);
            }
            groups.push(group);
        }

        return <Slider {...slickSettings}>
            {isScreen && groups.map((group, index) => {
                return this.getSlide(group, isScreen);
            })}
            {!isScreen && items.map((item, index) => {
                return this.getSlide(item, isScreen);
            })}
        </Slider>
    }

    render() {
        if (!this.props.stylesData.items) {
            return <div/>;
        }

        const {title, subtitle, action, items} = this.props.stylesData;

        return (
            <>
                <div className="the_styles_section mb-4">
                    <div className="border-line">
                        <div className="dot-line"/>
                        <img src={heartImage} alt=""/>
                        <div className="dot-line"/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-12 my-auto">
                                <div className="the_styles">
                                    <h3>{title.toUpperCase()}</h3>
                                    <p>{subtitle}</p>
                                    <a className="see_all"
                                       href={action.link}>{action.title}</a>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12 styles-show">
                                {this.renderCarousel()}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    stylesData: getTheStylesData(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StylesSectionView);
