import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';

const BackdropCircularProgress = () => (
    <Backdrop
        style={{
            zIndex: 11,
            color: '#fff',
        }}
        open
    >
        <CircularProgress color="inherit" />
    </Backdrop>
);

export default BackdropCircularProgress;
