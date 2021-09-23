import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
    bool,
} from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

const variants = ['h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1'];

function TypographyDemo(props) {
    const { loading = false } = props;

    return (
        <div>
            {variants.map((variant) => (
                <Typography component="div" key={variant} variant={variant} style={{ display: 'flex', justifyContent: 'center' }}>
                    {loading ? <Skeleton style={{ height: '101px', width: '438px' }} /> : null}
                </Typography>
            ))}
        </div>
    );
}

TypographyDemo.propTypes = {
    loading: bool.isRequired,
};

export default function SkeletonTypography() {
    return (
        <Grid style={{ padding: '60px' }}>
            <TypographyDemo loading />
        </Grid>
    );
}
