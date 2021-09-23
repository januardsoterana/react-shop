/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {
    Button, Grid, Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {toast, ToastContainer} from "react-toastify";

import {strings} from '../../assets/constants';
import appConfig from "../../app.config";
import './ContactModal.scss';

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


export default class ContactModal extends Component {
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
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    handleOutsideClick(event) {
        event.preventDefault();
        if (event.target === event.currentTarget && this.props.onClose !== undefined) {
            this.props.onClose();
        }
    }

    onSubmit() {
        const validState = {
            ...this.validateInput(this.firstName.value, 'firstNameError'),
            ...this.validateInput(this.lastName.value, 'lastNameError'),
            ...this.validateInput(this.email.value, 'emailError'),
            ...this.validateInput(this.phoneNumber.value, 'phoneNumberError'),
            ...this.validateInput(this.address1.value, 'addressError'),
            ...this.validateInput(this.city.value, 'cityError'),
            ...this.validateInput(this.region.value, 'stateError'),
            ...this.validateInput(this.postalCode.value, 'postalCodeError'),
            ...this.validateInput(this.preferredShop.value, 'preferredShopError'),
            ...this.validateInput(this.preferredStartTime.value, 'preferredStartTimeError'),
            ...this.validateInput(this.partySize.value, 'partySizeError'),
        }

        if (Object.values(validState).join('')) {
            this.setState(validState);
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
        formdata.append('Field21', 'Book More Than 4');

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
                toast('Thank you for your request. Someone from the DryBar team will reach out to you within 48 hours');
                setTimeout(() => {
                    console.log('Delay')
                    this.props.onClose();
                }, 750);
            })
            .catch(error => console.log('error in wufoo api ', error));


    }

    validateInput(value, stateName) {
        let stateObj = {};
        if (!value) {
            stateObj[stateName] = 'This field should not be empty.';
        } else {
            stateObj[stateName] = '';
        }
        return stateObj;
    }

    render() {
        const {preferredShopChoices, preferredStartTimeChoices, partySizeChoices} = this.props;

        return (
            <Grid onClick={this.handleOutsideClick} id="contact-modal">
                <Grid className="modal-container">
                    <Grid className="header position-relative">
                        <Typography className="header-text">
                            Please input contact information.
                        </Typography>
                        <Button onClick={this.props.onClose} style={{padding: 0}}>
                            <CloseIcon className="close-icon"/>
                        </Button>
                    </Grid>
                    <div className="contact-section">
                        <div className="row">
                            <div className="col-sm-6">
                                <label>{FIRST_NAME}</label>
                                <input className="form-control" type="text" ref={(c) => this.firstName = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'firstNameError')});
                                       }}/>
                                {this.state.firstNameError &&
                                <p className="error-msg">{this.state.firstNameError}</p>}
                            </div>
                            <div className="col-sm-6">
                                <label>{LAST_NAME}</label>
                                <input className="form-control" type="text" ref={(c) => this.lastName = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'lastNameError')});
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
                                           this.setState({...this.validateInput(sender.target.value, 'emailError')});
                                       }}/>
                                {this.state.emailError &&
                                <p className="error-msg">{this.state.emailError}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-9">
                                <label>{ADDRESS1}</label>
                                <input className="form-control" type="text" ref={(c) => this.address1 = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'addressError')});
                                       }}/>
                                {this.state.addressError &&
                                <p className="error-msg">{this.state.addressError}</p>}
                            </div>
                            <div className="col-sm-3">
                                <label>{ADDRESS2}</label>
                                <input className="form-control" type="text" ref={(c) => this.address2 = c}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label>{CITY}</label>
                                <input className="form-control" type="text" ref={(c) => this.city = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'cityError')});
                                       }}/>
                                {this.state.cityError &&
                                <p className="error-msg">{this.state.cityError}</p>}
                            </div>
                            <div className="col-sm-6">
                                <label>{STATE}</label>
                                <input className="form-control" type="text" ref={(c) => this.region = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'stateError')});
                                       }}/>
                                {this.state.stateError &&
                                <p className="error-msg">{this.state.stateError}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label>{POSTAL_CODE}</label>
                                <input className="form-control" type="text" ref={(c) => this.postalCode = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'postalCodeError')});
                                       }}/>
                                {this.state.postalCodeError &&
                                <p className="error-msg">{this.state.postalCodeError}</p>}
                            </div>
                            <div className="col-sm-6">
                                <label>{PHONE_NUMBER}</label>
                                <input className="form-control" type="text" ref={(c) => this.phoneNumber = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'phoneNumberError')});
                                       }}/>
                                {this.state.phoneNumberError &&
                                <p className="error-msg">{this.state.phoneNumberError}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>{PREFERRED_SHOP}</label>
                                <select className="form-control" ref={(c) => this.preferredShop = c}
                                        onChange={(sender) => {
                                            this.setState({...this.validateInput(sender.target.value, 'preferredShopError')});
                                        }}>
                                    {preferredShopChoices.map(choice => {
                                        return <option value={choice}>{choice}</option>;
                                    })}
                                </select>
                                {this.state.preferredShopError &&
                                <p className="error-msg">{this.state.preferredShopError}</p>}
                            </div>
                            <div className="col-sm-4">
                                <label>{PREFERRED_START_TIME}</label>
                                <select className="form-control" ref={(c) => this.preferredStartTime = c}
                                        onChange={(sender) => {
                                            this.setState({...this.validateInput(sender.target.value, 'preferredStartTimeError')});
                                        }}>
                                    {preferredStartTimeChoices.map(choice => {
                                        return <option value={choice}>{choice}</option>;
                                    })}
                                </select>
                                {this.state.preferredStartTimeError &&
                                <p className="error-msg">{this.state.preferredStartTimeError}</p>}
                            </div>
                            <div className="col-sm-4">
                                <label>{PARTY_SIZE}</label>
                                <select className="form-control" ref={(c) => this.partySize = c}
                                        onChange={(sender) => {
                                            this.setState({...this.validateInput(sender.target.value, 'partySizeError')});
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
                    <div className="d-flex mt-3 justify-content-center">
                        <button
                            className="btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100"
                            onClick={this.onSubmit}>{SUBMIT}</button>
                    </div>
                    <ToastContainer
                        className=""
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        pauseOnHover
                    />
                </Grid>
            </Grid>
        );
    }
}
