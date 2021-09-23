import { gql } from '@apollo/client';
import contentIds from '../contentIds';

const screenHomeCollections = () => gql`{
  screenHome(id: "${contentIds.homepage}") {
    title
    internalName
    marketingComponentsCollection(limit: 5) {
      items {
        __typename
        ... on MarketingSection {
          internalName
          marketingComponentsCollection(limit: 5) {
            items {
              __typename
              ... on MarketingCollection {
                internalName
                title
                marketingComponentsCollection(limit: 5) {
                  items {
                    __typename
                    ... on MarketingCard {
                      internalName
                      title
                      subtitle
                      image {
                        desktopMedia {
                          url
                        }
                      }
                      avatar {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }    
  }
`;

export default screenHomeCollections;
