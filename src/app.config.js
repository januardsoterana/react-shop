// TEST okta domain endpoint for testing
export const OKTA_DOMAIN = 'drybar.oktapreview.com';

// test login credentials:
// username: test@drybar.com
// password: blueberry@2020

// server config
export default {
    url: 'http://t.drybarshops.com',
    // url: 'http:///164.90.150.191',
    issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
    redirectUri: `${window.location.origin}/login/callback`,
    pkce: false,
    clientId: '0oa5n6ah7xAHfBE7R1d6',
    googleIdp: '0oa37etyyGEmyg8kw5d6',
    facebookIdp: '0oa25mv7fIA0iVTTD5d6',

    wufoo: {
        subDomain: 'drybar',
        apiKey: '2V0P-FHL0-E3OP-7HEW',
        genericPartyFormId: 'm639jay05gnt4z',
        membershipSignupFormId: 'q1h4eg4w190zl46',
    }
};

// dev config

// export default {
//     url: 'http://localhost:3000',
//     issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
//     redirectUri: `${window.location.origin}/login/callback`,
//     pkce: false,
//     clientId: '0oa25kwxurm0FddCC5d6',
//     devMode: true,
//     token: '00aS2lulFI8xJGnVSGVhJk9DjQ1BthoEIo32z16fyx',
//     googleIdp: '0oa37etyyGEmyg8kw5d6',
//     facebookIdp: '0oa25mv7fIA0iVTTD5d6',
// };
