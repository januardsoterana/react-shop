/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Typography,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import copyRightMock from '../../../../__mocks__/copyRightMock.json';
import { DESKTOP_BREAKPOINT, TABLET_BREAKPPOINT } from '../../../../Helpers/breakpoints';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '20px 0',
        margin: '0 35px',
        textAlign: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
            padding: '30px 0',
            borderTop: '1px solid #D1D1D1',
            flexDirection: 'column',
            margin: 0
        },
    },
    copyrightText: {
        margin: '10px',
        fontSize: '11px',
        [theme.breakpoints.up(TABLET_BREAKPPOINT+1)]: {
            textAlign: 'left',
        },
        width: '100%',
        whiteSpace: 'nowrap',
    },
    copyrightLinks: {
        width: '100%',
        textAlign: 'right',
        [theme.breakpoints.down(TABLET_BREAKPPOINT+1)]: {
            textAlign: 'center',
            lineHeight: '28px'
        },
    },
    link: {
        fontSize: '11px',
        display: 'inline-block',
        margin: '0 15px !important',
        color: '#42413D',
    },
}));

const copyrightFooter = (location) => {
    const classes = useStyles();
    const isCommonFooter = location?.pathname?.includes('booking');
    return (
        <Grid className={classes.container}>
            <Grid>
                <Typography className={classes.copyrightText}>
                    {isCommonFooter ? copyRightMock.copyrightText : copyRightMock.copyrightCommonText}
                </Typography>
            </Grid>
            <Grid className={classes.copyrightLinks}>
                <>
                    {isCommonFooter ? copyRightMock.links.map((link) => (
                        <Link to="/">
                            <Typography className={classes.link}>
                                {link}
                            </Typography>
                        </Link>
                    )) : null}
                    {copyRightMock.commonLinks.map((link) => (
                        <Link to="/">
                            <Typography className={classes.link}>
                                {link}
                            </Typography>
                        </Link>
                    ))}
                </>
            </Grid>
        </Grid>
    );
};

export default withRouter(copyrightFooter);
