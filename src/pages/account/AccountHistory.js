/* eslint-disable max-len */
import {
    Button,
    Grid, Typography, withStyles,
} from '@material-ui/core';
import { object } from 'prop-types';
import React from 'react';
// import EditableTextField from '../../app/Components/EditableTextField/EditableTextField';

const styles = (theme) => ({
    containerShop: {
        background: theme.palette.common.white,
        marginLeft: '15px',
        padding: '34px 22px',
        textAlign: 'center',
        height: '517px',
    },
    heading: {
        float: 'left',
        paddingBottom: '18px',
        fontFamily: 'MrsEavesSmallCap',
        color: theme.palette.common.grey,
        fontSize: '20px',
    },
    formContainer: {
        margin: '46px 2px 2px 2px',
        width: '710px',
        height: '285px',
        backgroundColor: theme.palette.common.lightGrey[3],
        borderTop: `1px solid ${theme.palette.common.lightGrey[0]}`,
    },
    drybarCopy: {
        margin: '55px 0px 24px 0px !important',
        fontSize: '18px',
        color: '#55585B',
        fontWeight: '700'
    },
    orderHistoryAction: {
        width: '378px',
        height: '63px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.lightGrey[1],
        fontSize: '16px',
        margin: '35px 0px 0px 0px',
        '&:hover': {
            backgroundColor: theme.palette.common.hover[1],
        },
    },
    subCopy: {
        fontFamily: 'AvenirNext',
        lineHeight: '32px',
        fontSize: '18px',
        padding: '0 49px !important'
    }
});

/**
 * Static data - make dynamic when connected with API
 */
const AccountHistory = ({ classes }) => (
    <Grid className={classes.containerShop}>
        <Typography className={classes.heading}>
            View Order History
        </Typography>
        <Grid className={classes.formContainer}>
            <Typography className={classes.drybarCopy}>Your Drybar orders are found a drybar.com.</Typography>
            <Typography className={classes.subCopy}>Your Drybar orders are found a drybar.com. Proin gravida dolor sit amet lacus accumsan et viverra justo vigo. Proin sodales pulvinar sic tempor enorme nueos.</Typography>
        </Grid>
        <Button variant="outlined" className={classes.orderHistoryAction}>View Order History</Button>
    </Grid>
);

AccountHistory.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(AccountHistory);
