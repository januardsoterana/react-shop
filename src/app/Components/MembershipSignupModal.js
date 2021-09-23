/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {
    Button, Grid, Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {toast, ToastContainer} from "react-toastify";

import {strings} from '../../assets/constants';
import appConfig from "../../app.config";
import './MembershipSignupModal.scss';

const {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    ADDRESS1,
    ADDRESS2,
    CITY,
    STATE,
    POSTAL_CODE,
    COUNTRY,    
    PHONE_NUMBER,
    BIRTHDAY,
    LOCATION,
    SUBMIT
} = strings;


export default class MembershipSignupModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            addressError: '',
            cityError: '',
            regionError: '',
            postalCodeError: '',
            countryError: '',
            phoneNumberError: '',
            birthdayError: '',
            locationError: ''
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
            ...this.validateInput(this.address1.value, 'addressError'),
            ...this.validateInput(this.city.value, 'cityError'),
            ...this.validateInput(this.region.value, 'stateError'),
            ...this.validateInput(this.postalCode.value, 'postalCodeError'),
            ...this.validateInput(this.phoneNumber.value, 'phoneNumberError'),
            ...this.validateInput(this.country.value, 'countryError'),
            ...this.validateInput(this.birthday.value, 'birthdayError'),
            ...this.validateInput(this.location.value, 'locationError'),
        }

        if (Object.values(validState).join('')) {
            this.setState(validState);
            return;
        }

        let formdata = new FormData();
        formdata.append('Field1', this.firstName.value);
        formdata.append('Field2', this.lastName.value);
        formdata.append('Field3', this.email.value);
        formdata.append('Field4', this.address1.value);
        formdata.append('Field5', this.address2.value);
        formdata.append('Field6', this.city.value);
        formdata.append('Field7', this.region.value);
        formdata.append('Field8', this.postalCode.value);        
        formdata.append('Field9', this.country.value);        
        formdata.append('Field10', this.phoneNumber.value);
        formdata.append('Field18', this.birthday.value);
        formdata.append('Field12', this.location.value);
        formdata.append('Field16', 'Membership Action');
console.log('-- formData : ', formdata, this.birthday.value)
        window
            .fetch(`https://cors-anywhere.herokuapp.com/https://${appConfig.wufoo.subDomain}.wufoo.com/api/v3/forms/${appConfig.wufoo.membershipSignupFormId}/entries.json`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa(appConfig.wufoo.apiKey + ':password')}`
                },
                body: formdata,
                redirect: 'follow'
            })
            .then((response) => response.json())
            .then(data => {
                console.log('-- data : ', data);
                if( data.EntryId ){
                    toast('Content has been saved!');
                    toast('Thank you for your request. Someone from the DryBar team will reach out to you within 48 hours');
                    setTimeout(() => {
                        console.log('Delay')
                        this.props.onClose();
                    }, 1000);
                } else if( data.FieldErrors?.length > 0 ){
                    let stateObj = {};
                    for(let i=0; i<data.FieldErrors.length; i++){
                        if( data.FieldErrors[i].ID == 'Field1' ) stateObj['firstNameError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field2' ) stateObj['lastNameError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field3' ) stateObj['emailError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field4' ) stateObj['addressError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field5' ) stateObj['addressError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field6' ) stateObj['cityError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field7' ) stateObj['stateError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field8' ) stateObj['postalCodeError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field9' ) stateObj['countryError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field10' ) stateObj['phoneNumberError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field18' ) stateObj['birthdayError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field12' ) stateObj['locationError'] = data.FieldErrors[i].ErrorText;
                        if( data.FieldErrors[i].ID == 'Field16' ) stateObj['firstNameError'] = data.FieldErrors[i].ErrorText;
                    }
                    
                    if (Object.values(stateObj).join('')) {
                        this.setState(stateObj);
                        return;
                    }
                }
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
        console.log('-- stateName : ', stateName);
        if( stateName == 'birthdayError' ){
            var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
            if (!(date_regex.test(value))) {
                console.log('-- failed validation');
                stateObj[stateName] = 'Please enter a valid date in MM/DD/YYYY format.';
            }
        }
        return stateObj;
    }

    render() {

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
                            <div className="col-sm-6">
                                <label>{EMAIL}</label>
                                <input className="form-control" type="email" ref={(c) => this.email = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'emailError')});
                                       }}/>
                                {this.state.emailError &&
                                <p className="error-msg">{this.state.emailError}</p>}
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
                                <label>{COUNTRY}</label>
                                <input className="form-control" type="text" ref={(c) => this.country = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'countryError')});
                                       }}/>
                                {this.state.countryError &&
                                <p className="error-msg">{this.state.countryError}</p>}
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
                                <label>{CITY}</label>
                                <input className="form-control" type="text" ref={(c) => this.city = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'cityError')});
                                       }}/>
                                {this.state.cityError &&
                                <p className="error-msg">{this.state.cityError}</p>}
                            </div>
                            <div className="col-sm-6">
                                <label>{POSTAL_CODE}</label>
                                <input className="form-control" type="text" ref={(c) => this.postalCode = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'postalCodeError')});
                                       }}/>
                                {this.state.postalCodeError &&
                                <p className="error-msg">{this.state.postalCodeError}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>{BIRTHDAY}</label>
                                <input className="form-control" type="text" ref={(c) => this.birthday = c}
                                       onChange={(sender) => {
                                           console.log('-- birthday : ', sender.target.value)
                                           this.setState({...this.validateInput(sender.target.value, 'birthdayError')});
                                       }}/>
                                {this.state.birthdayError &&
                                <p className="error-msg">{this.state.birthdayError}</p>}
                            </div>
                            <div className="col-sm-4">
                                <label>{LOCATION}</label>
                                <input className="form-control" type="text" ref={(c) => this.location = c}
                                       onChange={(sender) => {
                                           this.setState({...this.validateInput(sender.target.value, 'locationError')});
                                       }}/>
                                {this.state.locationError &&
                                <p className="error-msg">{this.state.locationError}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex mt-3 justify-content-center">
                        <button
                            className="btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100"
                            onClick={this.onSubmit}>{SUBMIT}</button>
                    </div>
                    <ToastContainer hideProgressBar={true}/>
                </Grid>
            </Grid>
        );
    }
}
