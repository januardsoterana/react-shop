import { gql } from '@apollo/client';

const productAddOnCollections = (productID) => `{
    productCollection(where: {productId: "${productID}"}) {
        items {
          type
          productId
          title
          serviceTime
          price
          description {
            json
          }
          bestFor
          imagesCollection(limit: 10) {
            items {
              desktopMedia {
                url
              }
            }
          }
        }
      }
  }
`;

export default productAddOnCollections;
