import { gql } from '@apollo/client';
import contentIds from '../contentIds';

const screenBarfly = () => gql`{
    barfly(id: "${contentIds.barflyMembership}") {
        membershipsCollection(limit: 2) {
          items {
            title
            subtitle
            price
            benefitsCollection(limit: 6) {
              items {
                ... on BarflyBenefits {
                  name
                  value
                }
              }
            }
          }
        }
        finePrint {
          json
        }
        thankYou {
          json
        }
        marketingComponentsCollection(limit: 1) {
          items {
            __typename
            ... on MarketingSection {
              internalName
              marketingComponentsCollection(limit: 1) {
                items {
                  __typename
                  ... on MarketingCard {
                    image {
                      desktopMedia {
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
`;

export default screenBarfly;
