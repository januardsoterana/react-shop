/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import crypto from 'crypto';
import restClient from '../api/restClient';

const allowedMethods = ['post', 'get'];

/*
    TODO points:
     - Add caching
*/

const useFetch = ({
                      url = '',
                      data: queryData = {},
                      params,
                      headers,
                      method = 'post',
                      options = {
                          skip: false,
                      },
                  }) => {
    const [loading, setLoading] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const dataHash = crypto.createHash('sha1').update(JSON.stringify(queryData)).digest('hex');

    useEffect(() => {
        /* ===== Error checking ===== */
        if (!allowedMethods.includes(method) || !url?.length || options.skip) {
            if (options.skip) {
                return;
            }
            if (!allowedMethods.includes(method)) {
                setError(`useFetch error: invalid method: ${method}`);
            } else if (!url?.length) {
                setError(`useFetch error, invalid url: ${url}`);
            }

            // TODO add error debug statements once environments are setup
            return;
        }

        /* ===== Data Fetching ===== */
        (async () => {
            setLoading(true);

            // get function by method from restClient
            const fetchMethod = restClient[method];

            try {
                const response = await fetchMethod({
                    url,
                    data: queryData,
                    params,
                    headers,
                });

                if (response?.data) {
                    setData(response.data);
                }
            } catch (fetchedError) {
                if (fetchedError) {
                    setError(fetchedError);
                }
            }

            setLoading(false);
        })();
    }, [dataHash]);

    return {loading, data, error};
};

export const useFetchAsync = async ({
                                        url = '',
                                        data: queryData = {},
                                        params,
                                        headers,
                                        method = 'post',
                                        options = {
                                            skip: false,
                                        },
                                    }) => {
    let data = null, error = null;
    /* ===== Error checking ===== */
    if (!allowedMethods.includes(method) || !url?.length || options.skip) {
        if (options.skip) {
            return;
        }
        if (!allowedMethods.includes(method)) {
            error = `useFetch error: invalid method: ${method}`;
        } else if (!url?.length) {
            error = `useFetch error, invalid url: ${url}`;
        }
    } else {
        /* ===== Data Fetching ===== */
        // get function by method from restClient
        const fetchMethod = restClient[method];

        try {
            const response = await fetchMethod({
                url,
                data: queryData,
                params,
                headers,
            });

            if (response?.data) {
                data = response.data;
            }
        } catch (fetchedError) {
            if (fetchedError) {
                error = fetchedError;
            }
        }
    }

    return {data, error};
};

export default useFetch;
