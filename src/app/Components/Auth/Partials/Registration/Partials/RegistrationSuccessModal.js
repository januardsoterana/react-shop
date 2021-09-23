import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import { resendVerificationEmail } from '../../../../../../api/auth-api'
import restClient from '../../../../../../api/restClient';

const RegistrationSuccess = ({ openModal, classes, createdEmail }) => {
    const [open, setOpen] = React.useState(openModal);

    const handleClose = () => {
        setOpen(false);
    };

    const recoverEmailHandler = () => {
        restClient.post(resendVerificationEmail(createdEmail))
        console.log("on recover click")
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.modalTitle}>
                    <Typography className={classes.modalTitle}>Check your email</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please check your email at the address below and follow the instructions to verify your account.
                        If you did not receive an email or it expired
                        you can resend one.
                </DialogContentText>
                    <Typography className={classes.registerEmail}>{createdEmail}</Typography>
                </DialogContent>
                <Button type="submit" className={classes.recoverOperation} variant="outlined" onClick={() => recoverEmailHandler()}>
                Resend my verification email
                </Button>
            </Dialog>
        </div>
    );
}

export default RegistrationSuccess