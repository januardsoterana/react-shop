/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import {
    Accordion, withStyles, AccordionDetails, AccordionSummary, Typography, Button,
} from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import footerMock from '../../../../__mocks__/footerMock.json';

const styles = () => ({
    accordianContainer: {
        boxShadow: 'none',
        width: '100%',
    },
    accordinRoot: {
        minHeight: 'auto',
        margin: 'auto !important',
    },
    headingFont: {
        fontFamily: 'DINCondensed',
        textTransform: 'uppercase',
        fontSize: '17px',
        fontWeight: '600',
        color: '#42413D',
        letterSpacing: '1.09333px',
    },
    linkText: {
        textTransform: 'none',
        fontSize: '13px',
        letterSpacing: '1.30881px',
        color: '#42413D',
        display: 'block',
        width: '100%',
    },
    button: {
        padding: '15px 0',
        width: '100%',
        textAlign: 'left',
    },
    labeldiv: {
        flexDirection: 'column',
        textAlign: 'left',
    },
});

const ExpansionPanel = withStyles({
    root: {
        padding: 0,
        borderTop: '1px solid #D1D1D1',
        borderBottom: '1px solid #D1D1D1',
        marginBottom: '-1px',
        marginTop: '-1px',
        // boxShadow: 'none',
        // '&:not(:last-child)': {
        //     borderBottom: 0,
        // },
        // '&:before': {
        //     display: 'none',
        // },
        '&$expanded': {
            margin: '20px 0 10px',
        },
    },
    content: {
        fontFamily: 'DINCondensed',
        margin: '20px 0 10px',
        '&$expanded': {
            margin: '20px 0 10px',
        },
    },
})(AccordionSummary);

const ExpansionDetails = withStyles({
    root: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '8px 0 16px',
    },
})(AccordionDetails);

const MobileFooterLinks = ({ classes }) => (footerMock.map((footer) => (
    <Accordion
        className={classes.accordianContainer}
        classes={{ root: classes.accordinRoot }}
    >
        <ExpansionPanel
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={`${footer.title}-footer`}
        >
            <Typography className={classes.headingFont}>{footer.title}</Typography>
        </ExpansionPanel>
        <ExpansionDetails>
            {footer.help_copy_sub ? (
                <Button className={classes.button} classes={{ label: classes.labeldiv }} variant="outlined">
                    <Typography style={footer.styleOverride?.help_copy_sub} className={classes.linkText}>{footer.help_copy_sub}</Typography>
                    <Typography style={footer.styleOverride?.help_copy_sub_text} className={classes.linkText}>{footer.help_copy_sub_text}</Typography>
                </Button>
            ) : null}
            {footer.help_copy_sub_pro ? (
                <Button className={classes.button} variant="outlined">
                    <Typography className={classes.linkText}>{footer.help_copy_sub_pro}</Typography>
                </Button>
            ) : null}
            {footer.help_copy_sub_second ? (
                <Button className={classes.button} variant="outlined">
                    <Typography className={classes.linkText}>{footer.help_copy_sub_second}</Typography>
                </Button>
            ) : null}
            {footer.help_copy_sub_third ? (
                <Button className={classes.button} variant="outlined">
                    <Typography className={classes.linkText}>{footer.help_copy_sub_third}</Typography>
                </Button>
            ) : null}
            {footer.help_copy_sub_third_pro
                ? (
                    <Button className={classes.button} variant="outlined">
                        <Typography className={classes.linkText}>{footer.help_copy_sub_third_pro}</Typography>
                    </Button>
                ) : null}
        </ExpansionDetails>
    </Accordion>
)));

export default withStyles(styles)(MobileFooterLinks);
