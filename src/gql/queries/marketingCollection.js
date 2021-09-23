import { gql } from '@apollo/client';

const screenMarketingCollection = () => gql`{
  screenCollection (where:{
    slug: "contact"
      }) {
        items {
          title
          description {
              json
          }
          slug
          marketingComponentsCollection {
            items {
              ... on MarketingCollection {
                  __typename
                  sys {
                    id
                  }
              }
              ... on MarketingSection {
                __typename
                sys {
                  id
                }
              }
            }
          }
          metadata {
            __typename
          }
        }
      }  
    }
`;

export default screenMarketingCollection;
