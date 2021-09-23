/* eslint-disable react/prop-types */
import { Button, TextField, withStyles } from '@material-ui/core';
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const styles = () => ({
    textField: {
        width: '100%',
        color: '#979797',
        marginBottom: '27px',
    },
    textInput: {
        padding: '10px 0',
        fontSize: '20px',
    },
    disabled: {
        borderBottom: 'none',
        '&:before': {
            borderBottom: 'none',
            borderBottomStyle: 'none !important',
        },
    },
    button: {
        textTransform: 'none',
    },
});

const EditableTextField = (props) => {
    const { classes, disabled } = props;
    return (
        <TextField
            className={classes.textField}
            InputProps={{
                classes: {
                    root: classes.inputRoot,
                    disabled: classes.disabled,
                    input: classes.textInput,
                },
                endAdornment: (!disabled ? (
                    <Button
                        variant="outlined"
                        className={classes.button}
                    >
                        Edit
                    </Button>
                ) : null),
            }}
            {...props}
        />
    );
};

export default withStyles(styles)(EditableTextField);
