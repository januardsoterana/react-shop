import React, {Component} from 'react';
import {getRibbonData} from "../../state/ducks/Home/Home-Selectors";
import {connect} from "react-redux";

class ContainerOuterBorderView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.ribbonData.items) {
            return <div/>;
        }
        return (
            <>
                <div className="container">
                    <div className="outer_border">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main_posiztions">
                                    <div className="bg_strip"><p>{this.props.ribbonData['title']}</p></div>
                                </div>
                            </div>
                            {this.props.ribbonData['items'].map((item, index) => {
                                return <div className="col-md-4 col-sm-12" key={index}>
                                    <div className="first_box">
                                        <div className="icon_area">
                                            <div className="icon_img">
                                            <span>
                                                <img src={item['avatar']} alt=""/>
                                            </span>
                                            </div>
                                            <div className="heading_and_details">
                                                <h3>{item['title']}</h3>
                                                <p>{item['subtitle']}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>;
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    ribbonData: getRibbonData(state),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerOuterBorderView);

