import React, {Component} from 'react';
import {connect} from "react-redux";

import slideArrowLeft from '../../assets/images/slide_arrow.png';
import slideArrowRight from '../../assets/images/slide_arrow2.png';

import {strings} from '../../assets/constants';
import {getHeroData} from "../../state/ducks/Home/Home-Selectors";

const {
    NEXT,
    PREVIOUS,
} = strings;

class SliderSectionView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current_card: 0
        }

        this.getImages = this.getImages.bind(this);
        this.getIndicators = this.getIndicators.bind(this);
        this.getNavigationArrows = this.getNavigationArrows.bind(this);
        this.getSlide = this.getSlide.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }

    handleNext(index) {
        // handles indicators' click at the bottom of the slides
        if (!isNaN(index)) {
            this.setState({current_card: index});
            return;
        }
        // handles next arrow click of the slides
        if (this.state.current_card < this.card_container.children.length - 1) {
            let new_current_card = this.state.current_card + 1;
            this.setState({current_card: new_current_card});
        } else {
            this.setState({current_card: 0});
        }
    }

    // handles previous arrow click of the slides
    handlePrevious() {
        if (this.state.current_card > 0) {
            let new_current_card = this.state.current_card - 1;
            this.setState({current_card: new_current_card});
        } else {
            this.setState({current_card: this.card_container.children.length - 1});
        }
    }

    getIndicators() {
        return (
            < ol className="carousel-indicators slid_tabs">
                {this.props.heroData.items.map((_, index) => {
                    const active = index === this.state.current_card;

                    return <li
                        onClick={() => this.handleNext(index)}
                        style={{cursor: 'pointer'}}
                        data-target="#carousel-example-2"
                        data-slide-to={index}
                        key={index}
                        className={active ? "active" : ''}></li>;
                })}
            </ol>
        );
    }

    getNavigationArrows() {
        return (
            <>
                <a onClick={this.handlePrevious} className="carousel-control-prev" role="button" data-slide="prev"
                   style={{cursor: 'pointer'}}>
                    <span className="" aria-hidden="true"><img src={slideArrowLeft} alt=""/></span>
                    <span className="sr-only">{PREVIOUS}</span>
                </a>
                <a onClick={this.handleNext} className="carousel-control-next" role="button" data-slide="next"
                   style={{cursor: 'pointer'}}>
                    <span className="" aria-hidden="true"><img src={slideArrowRight} alt=""/></span>
                    <span className="sr-only">{NEXT}</span>
                </a>
            </>
        );
    }

    getSlide(active, data, index) {
        console.log("slider data",data)
        return (
            <div className={active ? "carousel-item active" : "carousel-item"} key={index}>
                <div className="view">
                    <img className="d-block w-100 hero-image" src={data['image']} alt={`${index} slide`}/>
                    <div className="mask rgba-black-light" />
                </div>
                <div className="carousel-caption carousel_top">

                    <h3 className="h3-responsive">{data?.['title'] ? data?.['title']?.toUpperCase() : ''}</h3>
                    <p>{data?.['subtitle'] || ''}</p>
                    <a className="book_btn" href={data?.['action']['link']}>{data?.['action']['title']}</a></div>
            </div>
        );
    }

    getImages() {
        const slides = this.props.heroData.items.map((data, index) => {
            const active = index === this.state.current_card;
            return this.getSlide(active, data, index);
        })
        return (
            <>
                {slides}
            </>
        );
    }

    render() {
        if (!this.props.heroData.items) {
            return <div/>;
        }
        return (
            <>
                <div className="slider_section">
                    {/* <!--Carousel Wrapper--> */}
                    <div id="carousel-example-2" className="carousel slide carousel-fade" data-ride="carousel">
                        {/* <!--Indicators--> */}
                        {this.getIndicators()}
                        {/* <!--Slides--> */}
                        <div className="carousel-inner" role="listbox" ref={ref_id => this.card_container = ref_id}>
                            {this.getImages()}
                        </div>
                        {/* <!--Controls--> */}
                        {this.getNavigationArrows()}
                    </div>
                    {/* <!--/.Carousel Wrapper--> */}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    heroData: getHeroData(state),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SliderSectionView);

