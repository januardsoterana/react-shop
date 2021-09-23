import { gql } from '@apollo/client';

const screenAddOnsCollections = () => gql`{
    screenProductCollection(limit: 2) {
        items {
          title
          description {
            json
          }
          productsCollection {
            items {
              title
              subtitle
              price
              description {
                json
              }
              bestFor
              imagesCollection(limit: 3) {
                items {
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
`;

export default screenAddOnsCollections;
