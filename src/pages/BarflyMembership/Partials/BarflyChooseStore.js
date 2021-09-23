import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Button, Dialog, Grid} from '@material-ui/core';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';

import '../BarflyMembership.scss';
import {bindActionCreators} from "redux";
import {chooseStore, loadStoresContentful} from "../../../state/ducks/Barfly/Barfly-Actions";
import {connect} from "react-redux";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: '20px 16px 16px',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: '0',
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    }
}))(MuiDialogActions);

const StoreChooseDialog = ({open, handleClose, stores, chooseStore}) => {

    return (
        <div>
            <Dialog id="store-choose-dialog" onClose={handleClose} aria-labelledby="store-choose-dialog-title"
                    open={open}>
                <DialogTitle id="store-choose-dialog-title" onClose={handleClose}>
                    LOCATIONS
                </DialogTitle>
                <DialogContent dividers>
                    {stores.map(store => {
                        return <Grid className="store-item">
                            <Grid container direction="column" className="store-item-inner">
                                <Grid container direction="row" alignItems="center" className="store-title-row">
                                    <Grid xs={7} className="d-flex align-items-start">
                                        <InfoIcon/>
                                        <span className="store-title">{store.title}</span>
                                    </Grid>
                                    <Grid xs={5} className="d-flex justify-content-end">
                                        <Button variant="contained" onClick={() => {
                                            chooseStore(store);
                                            handleClose();
                                        }}>
                                            <Typography style={{width: '100%', display: 'block'}}>
                                                Select
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" justify="flex-strat" className="store-location-row">
                                    <Grid xs={7} className="d-flex" direction="row" justify="flex-start">
                                        <LocationIcon/>
                                        <span
                                            className="store-location">{store.contact?.street1 + ' ' + store.contact?.city + ', '
                                        + store.contact?.state + ' ' + store.contact?.postalCode}</span>
                                    </Grid>
                                    <Grid xs={5} className="d-flex justify-content-end">
                                        <Button>
                                            <Typography style={{width: '100%', display: 'block'}}>
                                                Get Directions
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid className="d-flex">
                                    <span className="store-information">{store.information}</span>
                                </Grid>
                            </Grid>
                        </Grid>;
                    })}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary" className="button-primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    chooseStore: bindActionCreators(chooseStore, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreChooseDialog);