/**
 * Load storesCollection
 * @returns {DocumentNode}
 */
const queryStoresCollection = () => (
    `{
      storeCollection {
        items {
          title
          slug
          number
          type
          bookerLocationId
          information
          mapImage {
            url
          }
          contact
          
        }
      }
    }`
);

export {
    queryStoresCollection
};
