import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Typography} from '@material-ui/core';


const RecoverSuccess = ({openModal, classes, oktaAuth, sessionToken, onClose}) => {

    const onSubmitClick = () => {
        oktaAuth && oktaAuth.signInWithRedirect({
            sessionToken: sessionToken,
        });
        onClose()
    }

    return (
        <div>
            <Dialog
                open={openModal}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.modalTitle}>
                    <Typography className={classes.modalTitle}>Password Reset</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        We have received your password reset request. if your email matches our records we will send you
                        an password reset link in just a second.
                    </DialogContentText>
                </DialogContent>
                <Button type="submit" className={classes.recoverOperation} variant="outlined"
                        onClick={() => onSubmitClick()}>
                    Confirm
                </Button>
            </Dialog>
        </div>
    );
}

export default RecoverSuccess
