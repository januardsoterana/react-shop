/* eslint-disable react/prop-types */
// import { Button } from '@material-ui/core';
import React from 'react';
import Media from 'react-media';
import { withRouter } from 'react-router-dom';
import CommonFooter from './app/Components/Footer/CommonFooter/CommonFooter';
import Header from './app/Components/Header/Header';
import { TABLET_BREAKPPOINT } from './Helpers/breakpoints';

// eslint-disable-next-line react/prop-types
const AppShell = ({ children, location }) => {
    const isSecurePage = location?.pathname?.includes('/account') || location?.pathname?.includes('/booking');
    const isAuthPage = location.pathname.includes('/auth');

    return (
        <>
            <div style={{ overflow: 'hidden' }}>
                {!isSecurePage || isAuthPage ? (
                    <>
                        <Header />
                    </>
                ) : null}
                <div style={{ minHeight: '500px' }}>
                    {children}
                </div>
                {!isSecurePage || isAuthPage ? <CommonFooter /> : null }
            </div>
            <Media
                query={{ maxWidth: TABLET_BREAKPPOINT }}
            >
            </Media>
        </>
    );
};

export default withRouter(AppShell);
