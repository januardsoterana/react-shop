import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const baseGraphQLClient = () => {
    const { REACT_APP_SPACE_ID: SPACE_ID, REACT_APP_ACCESS_TOKEN: ACCESS_TOKEN } = process.env;

    const link = createHttpLink({
        uri: `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });

    const cache = new InMemoryCache();
    const apolloClient = new ApolloClient({
        link,
        cache,
    });
    return { apolloClient };
};

export default baseGraphQLClient;
