import React, {Component} from 'react';

export default class EventSummaryView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {image, title, subtitle, action} = this.props;

        return (
            <div className="event-item">
                <div className="content">
                    <div className="content-wrapper">
                        <div className="position-relative">
                            <img src={image} alt="event"/>
                            <div className="mask"/>
                        </div>
                        <div className="row flex-column align-items-center">
                            <h6>{title}</h6>
                            <span className="overlay">{subtitle}</span>
                            <a href={action.link} className="btn-common btn-gray-trans btn-lg">
                                {action.title}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
