/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { object } from 'prop-types';

import { withOktaAuth } from '@okta/okta-react';
import {
    Button, Grid,
    Input, Typography,
    Backdrop, CircularProgress, InputAdornment
} from '@material-ui/core';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@material-ui/icons';

import SectionTitle from '../../../SectionTitle';
import LoginGoogleFacebook from '../LoginWithGoogleFacebook/LoginGoogleFBContainer';

const LogIn = (props) => {
    const { classes, oktaAuth, authState, history, buyout } = props;
    const [email, setEmailValue] = useState('');
    const [password, setPassword] = useState('');
    const [hideShowPassword, setHideShowPass] = useState(true);
    const [errors, setErrors] = useState({});
    const [showLoading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        const newError = { ...errors };
        delete newError.email;
        setErrors(newError);
        setEmailValue(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const newError = { ...errors };
        delete newError.password;
        setErrors(newError);
        setPassword(e.target.value);
    };

    const handleHideShowPassword = () => {
        setHideShowPass(!hideShowPassword);
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const newError = { ...errors };
        delete newError.signin;
        if (!password?.length) {
            newError.password = 'Password is required';
        } else {
            delete newError.password;
        }
        if (!email?.length) {
            newError.email = 'Email is required';
        } else {
            delete newError.email;
        }

        setErrors(newError);
        if (!Object.keys(newError).length) {
            setLoading(true)
            oktaAuth.signIn({ username: email, password }).then((response) => {
                if (response) {
                    oktaAuth.signInWithRedirect({
                        sessionToken: response.sessionToken,
                    });
                    setLoading(false)
                }
            }).catch((err) => {
                setLoading(false)
                setErrors({ signin: err.errorSummary })
            }
            );
        }
    };

    const handleSocialLogin = async (idp) => {
        oktaAuth.token.getWithRedirect({
            scopes: [
                'openid',
                'email',
                'profile',
            ],
            // Use a custom IdP for social authentication
            idp,
        })
            .then((res) => {
                const { tokens } = res;

                // Do something with tokens, such as
                oktaAuth.tokenManager.setTokens(tokens);
            })
            .catch((err) => {
                // handle OAuthError or AuthSdkError
                console.log('log in error-->', err);
            });
    };

    if (authState.isPending) {
        return null;
    }
    if (authState.isAuthenticated) {
        history.push('/');
    }

    return (
        <>
            <Grid container className={classes.requestServiceContainer}>
                {console.log("loading  ===>",showLoading)}
                <SectionTitle title="LOG IN" />
                <Grid className={classes.requestNoteDetails}>
                    <Grid className={classes.requestContainer}>
                        <form onSubmit={handleSubmit} className={classes.subscribeEmailForm}>
                            <Grid>
                                <Grid className={classes.fieldsContainer}>
                                    <Typography className={classes.enterEmailPasswordCopy}>Email</Typography>
                                    <Input
                                        classes={{
                                            input: classes.input,
                                        }}
                                        id="standard-adornment-amount"
                                        error={errors.email}
                                        value={email}
                                        onChange={(e) => handleEmailChange(e)}
                                        startAdornment=""
                                        placeholder="Your email here..."
                                        className={classes.enterYourEmail}
                                    />
                                </Grid>
                                <Grid className={classes.enterEmailPassword}>
                                    <Typography className={classes.enterEmailPasswordCopy}>Password</Typography>
                                    <Input
                                        classes={{
                                            input: classes.input,
                                        }}
                                        id="standard-adornment-amount"
                                        value={password}
                                        onChange={(e) => handlePasswordChange(e)}
                                        startAdornment=""
                                        placeholder="Your password here..."
                                        type={hideShowPassword ? 'password' : 'text'}
                                        className={classes.enterYourEmail}
                                        error={errors.password}
                                        endAdornment={(
                                            <InputAdornment position="start">
                                                {hideShowPassword ? <VisibilityIcon className={classes.visibilityIcon} onClick={() => handleHideShowPassword()} /> : <VisibilityOffIcon className={classes.visibilityIcon} onClick={() => handleHideShowPassword()} />}
                                            </InputAdornment>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            {errors.signin ? (
                                <Typography color="error">
                                    {errors.signin}
                                </Typography>
                            ) : null}
                            <Button type="submit" className={buyout ? 'btn-common btn-yellow btn-lg font-weight-bold responsive-500-w-100' : classes.authOperation} variant="outlined">
                                Log In
                            </Button>
                        </form>
                        {!buyout && (<Link to="/auth/sign-up"><Typography className={classes.recoverPassword}>Sign Up</Typography></Link>)}
                        <Link to="/auth/recover-password"><Typography className={classes.recoverPassword}>Recover Password</Typography></Link>
                    </Grid>
                </Grid>
                {showLoading ? (
                <Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : null}
            </Grid>
            <LoginGoogleFacebook handleSocialLogin={handleSocialLogin} classes={classes} />
        </>
    );
};

LogIn.prototype = {
    classes: object.isRequired,
};

export default withRouter(withOktaAuth(LogIn));
