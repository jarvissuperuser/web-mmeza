import {store} from "../../common/abstraction.js";

export const saveCards = (cards = {}, key= 'cards') => {
    store.setItem(key,JSON.stringify(cards))
}
export const getCards = (key='cards') => {
    return JSON.parse(store.getItem(key));
}
