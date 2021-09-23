import {
    queryStoresCollection
} from "./contentfulBarflyQueries";
import {
    doQuery
} from "../../state/utils/contentful";

export const gqlLoadStores = async () => {
    let data = await doQuery(queryStoresCollection());
    let stores = data?.storeCollection?.items || [];
    stores = stores.filter(store => store.bookerLocationId);
    return stores;
}
