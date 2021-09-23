/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import {
    Button,
    Dialog,
    Grid, Typography, withStyles,
} from '@material-ui/core';
import Axios from 'axios';
import { object } from 'prop-types';
import React, { useState } from 'react';
import appConfig from '../../app.config';
import EditableTextField from '../../app/Components/EditableTextField/EditableTextField';
import { MOBILE_BREAKPOINT } from '../../Helpers/breakpoints';


const styles = (theme) => ({
    container: {
        background: '#fff',
        marginLeft: '15px',
        padding: '34px 22px',
        textAlign: 'center',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            background: '#f9f9f9',
        },
    },
    heading: {
        fontWeight: '800',
        textAlign: 'center',
        paddingBottom: '18px',
        borderBottom: '1px solid #D1D1D1',
    },
    formContainer: {
        padding: '30px 0 0',
    },

    button: {
        width: '378px',
        height: '63px',
        maxWidth: '100%',
        margin: '20px 0 48px',
    },
    emailPref: {
        textAlign: 'left',
        margin: '32px 0 0',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            background: '#ffffff',
            padding: '12px'
        },
    },
    emailTypography: {
        margin: '10px 0 20px',
        color: '#979797',
    },
    dialog: {
        padding: '25px',
    },
});

/**
 * Static data - make dynamic when connected with API
 */
const AccountInformation = ({ classes, user }) => {
    const [userData, setUserData] = useState(user);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const handleChange = (value, type) => {
        setUserData({
            ...userData,
            [type]: value,
        });
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const {
            given_name, family_name, email,
        } = userData;
        Axios({
            method: 'post',
            url: `https://drybar.oktapreview.com/api/v1/users/${userData.sub}`,
            data: {
                profile: {
                    firstName: given_name,
                    lastName: family_name,
                    email,
                },
            },
            headers: {
                Authorization: `SSWS ${appConfig.token}`,
                'Access-Control-Allow-Origin': '*',
            },
        }).then((res) => {
            if (res.data.status === 'STAGED' || res.data.status === 'ACTIVE') {
                setShowConfirmationDialog(true);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <Grid className={classes.container}>
                <Typography className={classes.heading}>
                    Profile
                </Typography>
                <Grid className={classes.formContainer}>
                    <EditableTextField
                        label="First Name"
                        onChange={(e) => handleChange(e.target.value, 'given_name')}
                        defaultValue={userData.given_name}
                    />
                    <EditableTextField
                        label="Last Name"
                        onChange={(e) => handleChange(e.target.value, 'family_name')}
                        defaultValue={userData.family_name}
                    />
                    <EditableTextField
                        disabled
                        label="Email address"
                        defaultValue={userData.email}
                    />
                    <EditableTextField
                        label="Phone Number"
                        defaultValue="(714) 555-1212"
                    />
                    <EditableTextField
                        type="password"
                        label="Password"
                        defaultValue="(714) 555-1212"
                    />
                    <Button
                        onClick={handleUpdateUser}
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                    >
                        Save
                    </Button>
                    <Typography className={classes.heading}>
                        Email Preferences
                    </Typography>
                    <Grid className={classes.emailPref}>
                        <Button variant="text" style={{ padding: '0' }}>
                            Email opt out
                        </Button>
                        <Typography className={classes.emailTypography}>
                            Password rules will go here lorem ipsum dolor interdum et malesuada.
                        </Typography>
                        <Button variant="text" style={{ padding: '0' }}>
                            CCPA enactment
                        </Button>
                        <Typography className={classes.emailTypography}>
                            Proin gravida dolor sit amet lacus accumsaninterdum et malesuada fames ac ante ipsum primis into faucibus. In congue augue lorem.
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
            <Dialog
                classes={{
                    paper: classes.dialog,
                }}
                onClose={() => setShowConfirmationDialog(false)}
                aria-labelledby="customized-dialog-title"
                open={showConfirmationDialog}
            >
                User updated successfully
            </Dialog>
        </>
    );
};

AccountInformation.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(AccountInformation);
