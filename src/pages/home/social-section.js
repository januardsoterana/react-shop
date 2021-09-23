import React, {Component} from 'react';
import {connect} from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import instagramColorIcon from '../../assets/images/instagram-color.png';
import {links, strings} from '../../assets/constants';
import {getSocialData} from "../../state/ducks/Home/Home-Selectors";

import socialImage1 from '../../assets/images/carousel1.png';
import socialImage2 from '../../assets/images/carousel2.png';
import socialImage3 from '../../assets/images/carousel3.png';
import socialImage4 from '../../assets/images/carousel4.png';
import socialImage5 from '../../assets/images/carousel5.png';
import arrowLeftIcon from "../../assets/images/arrow-left-1.svg";
import arrowRightIcon from "../../assets/images/arrow-right-1.svg";

const {INSTAGRAM_LINK} = links;
const {FOLLOW_US} = strings;

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

class SocialSectionView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.socialData.hashtag) {
            return <div/>;
        }

        const slickSettings = {
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1028,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 350,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ],
            nextArrow: <NextArrow/>,
            prevArrow: <PrevArrow/>
        };

        const socialImages = [socialImage1, socialImage2, socialImage3, socialImage4, socialImage5, socialImage3];

        const {title, hashtag, handle} = this.props.socialData;

        return (
            <>
                <div className="social_section">
                    <div className="container-fluid">
                        <div className="row" style={{position: 'relative', paddingTop: '60px'}}>
                            <div className="flex-1">
                                <h2 className="dry_bar">#{hashtag.toLowerCase()}
                                    <span>{title}</span></h2>
                            </div>
                            <div className="my-auto text-right">
                                <h3 className="follow_instagram">
                                    <img src={instagramColorIcon} alt=""/>
                                    <span>{FOLLOW_US} <a href={INSTAGRAM_LINK + handle}>@{handle}</a></span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dry_bar_section">
                    <div className="container">
                        <div id="demo2" className="carousel slide" data-ride="carousel">
                            {/* <!-- Indicators -->
                            <!-- The slideshow --> */}
                            <div className="carousel-inner no-padding my-2"
                                 ref={ref_id => this.drybarContainer = ref_id}>
                                <Slider {...slickSettings}>
                                    {socialImages.map((image, index) => {
                                        return <div>
                                            <a href="#" onClick={() => null} className="slider_info border_carousel">
                                                <img className="img-fluid card-img-top" src={image} alt=""/>
                                            </a></div>;
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    socialData: getSocialData(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SocialSectionView);

