import { store, win} from "../core/index.js";
//import {saveData} from "../";
//import {environment} from "../data/config.js";

export const saveCards = (cards = {}, key= 'cards') => {
    store.setItem(key,JSON.stringify(cards));
}
export const getCards = (key='cards') => {
    return JSON.parse(store.getItem(key));
}
/**
 * @param card{ShopItemModel}
 * @param page{string} document / table to fetch data
 */
/*export const saveCardCloud = (card = undefined, page = environment.dbKeys.products) => {
    saveData(page, cleanObj(card));
}*/
/**
 * @param page{string} target/pages
 * @return {Promise<Array<ShopItemModel>>}
 */
export const getCardsCloud = (page ) => {
    if (!win.fire){
        throw Error('Firebase Not Found');
    }
    return new Promise((resolve, reject) => win.fire.db
        .collection(page)
        .where(id, '!=', '')
        .orderBy('dateAdded')
        .orderBy('inventoryAvailable', 'asc')
        .limit(100).get().then(doc => {
            const data = []
            doc.forEach(doc => data.push(doc.data()));
            resolve(data);
        })
        .catch(err => reject(err.message)));
}



