import React, {Component} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {strings} from '../../assets/constants';
import appConfig from "../../app.config";


const {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    ADDRESS1,
    ADDRESS2,
    CITY,
    STATE,
    POSTAL_CODE,
    PHONE_NUMBER,
    PREFERRED_SHOP,
    PREFERRED_START_TIME,
    PARTY_SIZE,
    NOTES,
    NOTE_PLACEHOLDER,
    SUBMIT
} = strings;

export default class EventDetailView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            phoneNumberError: '',
            addressError: '',
            cityError: '',
            regionError: '',
            postalCodeError: '',
            preferredShopError: '',
            preferredStartTimeError: '',
            partySizeError: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    onSubmit() {
        if (this.validateInput(this.firstName.value) || this.validateInput(this.lastName.value)
            || this.validateInput(this.email.value) || this.validateInput(this.phoneNumber.value)
            || this.validateInput(this.address1.value) || this.validateInput(this.city.value)
            || this.validateInput(this.region.value) || this.validateInput(this.postalCode.value)
            || this.validateInput(this.preferredShop.value) || this.validateInput(this.preferredStartTime.value)
            || this.validateInput(this.partySize.value)) {
            toast('Please input all fields');
            return;
        }

        let formdata = new FormData();
        formdata.append('Field1', this.firstName.value);
        formdata.append('Field2', this.lastName.value);
        formdata.append('Field3', this.email.value);
        formdata.append('Field10', this.phoneNumber.value);
        formdata.append('Field4', this.address1.value);
        formdata.append('Field5', this.address2.value);
        formdata.append('Field6', this.city.value);
        formdata.append('Field7', this.region.value);
        formdata.append('Field8', this.postalCode.value);
        formdata.append('Field12', this.preferredShop.value);
        formdata.append('Field15', this.preferredStartTime.value);
        formdata.append('Field17', this.partySize.value);
        formdata.append('Field19', this.note.value);
        formdata.append('Field21', this.props.title.toUpperCase());

        window
            .fetch(`https://cors-anywhere.herokuapp.com/https://${appConfig.wufoo.subDomain}.wufoo.com/api/v3/forms/${appConfig.wufoo.genericPartyFormId}/entries.json`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa(appConfig.wufoo.apiKey + ':password')}`
                },
                body: formdata,
                redirect: 'follow'
            })
            .then((response) => response.json())
            .then(data => {
                toast('Content has been saved!');
            })
            .catch(error => console.log('error in wufoo api ', error));
    }

    validateInput(value) {
        if (!value) {
            return 'This field should not be empty.';
        }
        return '';
    }

    render() {
        const {preferredShopChoices, preferredStartTimeChoices, partySizeChoices} = this.props;
        const {title, description, dividerIcon, action} = this.props;
        console.log(this.props)
        return (
            <div className="event-detail" id={action?.link?.replace("#", "")}>
                <div className="content">
                    <div className="row flex-column align-items-center">
                        <div className="divider row align-items-center w-100">
                            <div className="dash-line flex-grow-1"/>
                            <img src={dividerIcon} alt="Divider Icon"/>
                            <div className="dash-line flex-grow-1"/>
                        </div>
                        <h2>{title.toUpperCase()}</h2>
                        <div className="detail-section w-100">
                            {description.map((item, index) => {
                                return <>
                                    {item['type'] === 'paragraph' &&
                                    <span className="top d-block w-100" key={index}>{item['content']}</span>}
                                    {item['type'] === 'list' &&
                                    <ul key={index}>
                                        {item['content'].map((listItem, index) => {
                                            return <li key={index}>{listItem}</li>;
                                        })}
                                    </ul>}
                                </>
                                {/*<span className="note">{note}</span>*/
                                }
                            })}
                        </div>
                        <div className="contact-section w-100">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>{FIRST_NAME}</label>
                                    <input className="form-control" type="text" ref={(c) => this.firstName = c}
                                           onChange={(sender) => {
                                               this.setState({firstNameError: this.validateInput(sender.target.value)});
                                           }}/>
                                    {this.state.firstNameError &&
                                    <p className="error-msg">{this.state.firstNameError}</p>}
                                </div>
                                <div className="col-md-6">
                                    <label>{LAST_NAME}</label>
                                    <input className="form-control" type="text" ref={(c) => this.lastName = c}
                                           onChange={(sender) => {
                                               this.setState({lastNameError: this.validateInput(sender.target.value)});
                                           }}/>
                                    {this.state.lastNameError &&
                                    <p className="error-msg">{this.state.lastNameError}</p>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label>{EMAIL}</label>
                                    <input className="form-control" type="email" ref={(c) => this.email = c}
                                           onChange={(sender) => {
                                               this.setState({emailError: this.validateInput(sender.target.value)});
                                           }}/>
                                    {this.state.emailError &&
                                    <p className="error-msg">{this.state.emailError}</p>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <label>{ADDRESS1}</label>
                                    <input className="form-control" type="text" ref={(c) => this.address1 = c}
                                           onChange={(sender) => {
                                               this.setState({addressError: this.validateInput(sender.target.value)});
                                           }}/>
                                    {this.state.addressError &&
                                    <p className="error-msg">{this.state.addressError}</p>}
                                </div>
                                <div className="col-md-3">
                                    <label>{ADDRESS2}</label>
                                    <input className="form-control" type="text" ref={(c) => this.address2 = c}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>{CITY}</label>
                                    <input className="form-control" type="text" ref={(c) => this.city = c}
                                           onChange={(sender) => {
                                               this.setState({cityError: this.validateInput(sender.target.value)});
                                           }}/>
                                    {this.state.cityError &&
                                    <p className="error-msg">{this.state.cityError}</p>}
                                </div>
                                <div className="col-md-6">
                                    <label>{STATE}</label>
                                    <input className="form-control" type="text" ref={(c) => this.region = c}
                                           onChange={(sender) => {
                                               this.setState({stateError: this.validateInput(sender.target.value)});
                                           }}/>
                                    {this.state.stateError &&
                                    <p className="error-msg">{this.state.stateError}</p>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>{POSTAL_CODE}</label>
                                    <input className="form-control" type="text" ref={(c) => this.postalCode = c}
                                           onChange={(sender) => {
                                               this.setState({postalCodeError: this.validateInput(sender.target.value)});
                                           }}/>
                                    {this.state.postalCodeError &&
                                    <p className="error-msg">{this.state.postalCodeError}</p>}
                                </div>
                                <div className="col-md-6">
                                    <label>{PHONE_NUMBER}</label>
                                    <input className="form-control" type="text" ref={(c) => this.phoneNumber = c}
                                           onChange={(sender) => {
                                               this.setState({phoneNumberError: this.validateInput(sender.target.value)});
                                           }}/>
                                    {this.state.phoneNumberError &&
                                    <p className="error-msg">{this.state.phoneNumberError}</p>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label>{PREFERRED_SHOP}</label>
                                    <select className="form-control" ref={(c) => this.preferredShop = c}
                                            onChange={(sender) => {
                                                this.setState({preferredShopError: this.validateInput(sender.target.value)});
                                            }}>
                                        {preferredShopChoices.map(choice => {
                                            return <option value={choice}>{choice}</option>;
                                        })}
                                    </select>
                                    {this.state.preferredShopError &&
                                    <p className="error-msg">{this.state.preferredShopError}</p>}
                                </div>
                                <div className="col-md-4">
                                    <label>{PREFERRED_START_TIME}</label>
                                    <select className="form-control" ref={(c) => this.preferredStartTime = c}
                                            onChange={(sender) => {
                                                this.setState({preferredStartTimeError: this.validateInput(sender.target.value)});
                                            }}>
                                        {preferredStartTimeChoices.map(choice => {
                                            return <option value={choice}>{choice}</option>;
                                        })}
                                    </select>
                                    {this.state.preferredStartTimeError &&
                                    <p className="error-msg">{this.state.preferredStartTimeError}</p>}
                                </div>
                                <div className="col-md-4">
                                    <label>{PARTY_SIZE}</label>
                                    <select className="form-control" ref={(c) => this.partySize = c}
                                            onChange={(sender) => {
                                                this.setState({partySizeError: this.validateInput(sender.target.value)});
                                            }}>
                                        {partySizeChoices.map(choice => {
                                            return <option value={choice}>{choice}</option>;
                                        })}
                                    </select>
                                    {this.state.partySizeError &&
                                    <p className="error-msg">{this.state.partySizeError}</p>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label className="emphas">{NOTES.toUpperCase()}</label>
                                    <textarea className="form-control" placeholder={NOTE_PLACEHOLDER} rows="5"
                                              ref={(c) => this.note = c}/>
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100"
                            onClick={this.onSubmit}>{SUBMIT}</button
                        >
                        <ToastContainer hideProgressBar={true}/>
                    </div>
                </div>
            </div>
        );
    }
}
