import React, {Component} from 'react';
import {getOffersData} from "../../state/ducks/Home/Home-Selectors";
import {connect} from "react-redux";

class SpecialOfferSectionView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.offersData.items) {
            return <div/>;
        }
        return (
            <>
                <div className="member_ship">
                    <div className="container">
                        <div className="row">
                            {this.props.offersData.items.map((data, index) => {
                                return <div className="col-md-6 col-sm-6" key={index}>
                                    <img src={data['image']} className="img-fluid" alt=""/>
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
    offersData: getOffersData(state),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialOfferSectionView);
