/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// const HOST = 'middleware--loadbalancer-411306138.us-west-1.elb.amazonaws.com';
const HOST = 'middleware-test.drybarshops.com';

const getUrl = (endpoint, host, protocolOverride) => `${protocolOverride || 'https://'}${host || HOST}${endpoint}`;

const callAxios = (method, endpoint, params = {}, data = {}, headers = {
    Accept: '*/*',
}, options) => {
    const customHost = options.host;
    const protocolOverride = options.protocol;
    const config = {
        method,
        url: getUrl(endpoint, customHost, protocolOverride),
        params,
        headers,
        data,
    };
    return axios(config);
};

const get = ({
    url, data, params, headers, options = {},
}) => callAxios('get', url, params, data, headers, options);
const post = ({
    url, data, params, headers, options = {},
}) => callAxios('post', url, params, data, headers, options);

export default {
    get,
    post,
};
