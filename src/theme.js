const { createMuiTheme } = require('@material-ui/core');

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FFDD30',
        },
        secondary: {
            main: '#54575A',
            100: '#E5E5E5',
            200: 'F8F8F8',
        },
        common: {
            white: '#FFFFFF',
            grey: '#42413D',
            lightGrey: ['#D1D1D1', '#54575A', '#BDBDBD', '#F9F9F9', '#989898'],
            hover: ['rgb(58, 60, 62)', '#b29a21'],
        },
    },
    typography: {
        fontFamily: ['AvenirNext', 'DINCondensed', 'MrsEavesSmallCaps'],
        color: '#42413D',
    },
    overrides: {
        MuiButton: {
            root: {
                '&:focus': {
                    outline: 'none',
                },
            },
            contained: {
                color: '#54575A',
                fontFamily: 'AvenirNext',
                fontSize: '13px',
                margin: '3px 0',
                fontWeight: '400',
                textTransform: 'none',
                borderRadius: '0',
                maxWidth: 'fit-content',
                padding: '8px 22px',
                whiteSpace: 'nowrap',
                boxShadow: 'none',
            },
            text: {
                color: '#42413D',
                fontFamily: 'AvenirNext',
                fontWeight: '200',
                textTransform: 'none',
                borderRadius: '0',
                maxWidth: 'fit-content',
                whiteSpace: 'nowrap',
                fontSize: '16px',
                textDecoration: 'underline',
                textUnderlinePosition: 'under',
                padding: '4px',
                alignSelf: 'flex-end',
                margin: '0',
                '&:hover': {
                    textDecoration: 'underline',
                    color: '#42413D',
                    textUnderlinePosition: 'under',
                    backgroundColor: 'none',
                },
            },
            outlined: {
                border: 'none',
            },
        },
    },
});

export default theme;
