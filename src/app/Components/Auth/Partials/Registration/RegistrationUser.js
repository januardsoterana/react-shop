/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import {
    Button, Grid,
    Typography, Backdrop, CircularProgress,
} from '@material-ui/core';

import SectionTitle from '../../../SectionTitle';
import LoginGoogleFacebook from '../LoginWithGoogleFacebook/LoginGoogleFBContainer';
import TextInputField from '../TextInputField';
import signupFormFields from './signupFormFields';
import { createUserOkta } from '../../../../../api/auth-api'
import restClient from '../../../../../api/restClient';
import RegistrationSuccessDialog from './Partials/RegistrationSuccessModal'

const styles = (theme) => ({
    requestNoteDetails: {
        float: 'right',
        background: theme.palette.common.white,
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
        margin: 'auto',
        maxWidth: '800px',
        padding: '30px 22px',
        textAlign: 'center',
        width: '754px',
    },
    authOperation: {
        fontSize: '18px',
        lineHeight: '45px',
        color: theme.palette.common.white,
        textTransform: 'capitalize',
        background: '#54575A',
        height: '63px',
        width: '378px',
        marginTop: '40px',
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
        },
    },
    requestServiceContainer: {
        background: theme.palette.common.lightGrey[3],
        marginBottom: '86px',
    },
    enterYourEmail: {
        width: '100%',
        padding: '7px 0px 0px 0px',

    },
    enterEmailPassword: {
        padding: '29px 0px 0px 0px',
    },
    enterEmailPasswordCopy: {
        float: 'left',
        color: theme.palette.common.lightGrey[4],
    },
    alreadyHaveAccount: {
        color: theme.palette.common.lightGrey[4],
        marginTop: '29px !important',
    },
    facebookLogin: {
        '& .kep-login-facebook': {
            backgroundColor: theme.palette.common.white,
        },
    },
    backToLogin: {
        color: theme.palette.common.grey,
        textDecoration: 'underline',
        cursor: 'pointer',
        marginLeft: '11px',
    },
    SignUpFormInfo: {
        float: 'right',
        margin: '-54px 0px 0px 0px',
    },
    registerMessage: {
        color: "red",
        margin: "27px 2px 2px 2px !important"
    },
    backdrop: {
        zIndex: 11,
        color: '#fff',
    },
    modalTitle: {
        textAlign: "center",
        fontSize: "31px",
        fontFamily: 'DINCondensed',
        lineHeight: "37px",
        textTransform: "uppercase",
        fontWeight: "600"
    },
    registerEmail: {
        textAlign: "center",
        fontSize: "32px",
        color: "#42413D"
    },
    recoverOperation: {
        fontSize: '18px',
        lineHeight: '45px',
        textTransform: 'capitalize',
        height: '63px',
        width: '378px',
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
            color: '#FFFFFF'
        },
        background: "#F9F9F9",
        margin: "14px 2px 19px 111px",
        border: "1px solid #54575A",
        color: "#54575A"
    }
});

const Registration = ({ history, classes, buyout }) => {
    const [formFields, setFormFields] = useState({});
    const [errors, setErrors] = useState({});
    const [showLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [enterEmail, setEnterEmail] = useState("")
    const [hasEmail, setValidateEmail] = useState(false)

    // =========todo refactor error handling===============
    const handleErrorUpdate = (field, message) => {
        const newErrors = { ...errors };
        if (field) {
            if (message && message?.length) {
                newErrors[field] = message;
            } else {
                delete newErrors[field];
            }
        } else {
            signupFormFields.forEach((reqFields) => {
                if (reqFields.required) {
                    if (!(formFields[reqFields.name] || formFields[reqFields.name]?.length)) {
                        newErrors[reqFields.name] = `${reqFields.label} is required`;
                    } else {
                        delete newErrors[reqFields.name];
                    }
                }
            });
            if (formFields.password?.length < 8) {
                newErrors.password = 'Password length should be greater than 8';
            }

            if (formFields.password !== formFields.confirmPassword) {
                newErrors.confirmPassword = 'Password did not match';
            }
        }
        return newErrors;
    };

    const handleChange = (value, fieldName) => {
        const updatedFields = { ...formFields };
        updatedFields[fieldName] = value;
        const newErrors = handleErrorUpdate(fieldName);
        setErrors(newErrors);
        setFormFields(updatedFields);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const {
            firstName, lastName, email
        } = formFields;
        const newErrors = handleErrorUpdate();
        if (Object.keys(errors)?.length === 0) {
            setLoading(true)
            restClient.post(createUserOkta({ firstName, lastName, email }))
                .then((res) => {
                    console.log("okta res", res)
                    if (res.status === 200) {
                        setLoading(false)
                        setOpen(true)
                        setEnterEmail(email)
                        setValidateEmail(false)
                    }
                }).catch((err) => {
                    console.log("okta err", err.response)
                    const newResErrors = { ...newErrors };
                    if (err?.response?.data?.message.includes('already')) {
                        setValidateEmail(true)
                    }
                    err?.response?.data?.errorCauses?.forEach((cause) => {
                        if (cause?.errorSummary) {
                            const [field, message] = cause?.errorSummary?.split(': ');
                            if (field !== 'login') {
                                newResErrors[field] = message;
                            }
                        }
                    });
                    setErrors(newResErrors);
                    setLoading(false)
                    setEnterEmail(email)
                });
        }
    };

    return (
        <>
            <Grid container className={classes.requestServiceContainer}>
                <SectionTitle title="SIGN UP" />
                <Grid className={classes.requestNoteDetails}>
                    <Grid className={classes.requestContainer}>
                        <form onSubmit={handleSignup} className={classes.subscribeEmailForm}>
                            {signupFormFields.map((field, i) => (
                                <Grid className={i !== 0 ? classes.enterEmailPassword : ''}>
                                    <TextInputField
                                        value={formFields?.[field?.name] || ''}
                                        onChange={(e) => handleChange(e.target.value, field.name)}
                                        placeholder={field.placeholder}
                                        className={classes.enterYourEmail}
                                        label={field.label}
                                        error={errors[field.name]?.length}
                                        errorMessage={errors[field.name]}
                                        type={field.type}
                                    />
                                </Grid>
                            ))}
                            {hasEmail &&
                                <Typography style={{color: "red", marginTop: "23px"}}>
                                    This email is already exists in the current organization.
                                </Typography>
                            }
                            <Button
                                type="submit"
                                className={buyout ? 'btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100 mt-5' : classes.authOperation}
                                variant="outlined">
                                Sign Up
                            </Button>
                        </form>
                        <Typography className={classes.alreadyHaveAccount}>
                            Already have an account?
                            <Link to="/auth/login"><span className={classes.backToLogin}>Log In</span></Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <LoginGoogleFacebook />
            {showLoading ? (
                <Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : null}
            {open &&
                <RegistrationSuccessDialog openModal={open} classes={classes} createdEmail={enterEmail} />
            }
        </>
    );
};

export default withRouter(withStyles(styles)(Registration));
