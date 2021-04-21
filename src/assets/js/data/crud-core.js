import {store} from '../../core/index.js';

export const saveCore = (objects = {}, key= 'cards') => {
    store.setItem(key,JSON.stringify(objects))
}
export const getCore = (key='cards') => {
    return JSON.parse(store.getItem(key));
}
