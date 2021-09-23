/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
    Grid, Typography, withStyles, TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

const styles = (theme) => ({
    enterEmailPasswordCopy: {
        float: 'left',
        color: theme.palette.common.lightGrey[4],
    },
    enterYourEmail: {
        width: '100%',
        padding: '7px 0px 0px 0px',

    },
});

const TextInputField = (props) => {
    const {
        error, onChange, value, label, errorMessage, classes, ...others
    } = props;
    const [inputValue, setValue] = useState();

    const handleChange = (e) => {
        onChange(e);
        setValue(e.target.value);
    };

    return (
        <Grid>
            {label
                ? <Typography className={classes.enterEmailPasswordCopy}>{label}</Typography>
                : null}
            <TextField
                value={inputValue}
                onChange={handleChange}
                error={error}
                className={classes.enterYourEmail}
                helperText={error ? errorMessage : ''}
                {...others}
            />
        </Grid>
    );
};

export default withStyles(styles)(TextInputField);
