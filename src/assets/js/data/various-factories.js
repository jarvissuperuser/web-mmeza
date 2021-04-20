import {ShopCard} from '../../shared/index.js';

export const cardFactory = (model, clickCallback = null, buttonCallback = null) => {
    const cardElem = new ShopCard();
    cardElem.model = model;
    cardElem.clickCallback = clickCallback?clickCallback:cardElem.clickDefault.bind(cardElem);
    cardElem.buttonCallback = buttonCallback?buttonCallback:cardElem.buttonClickDefault.bind(cardElem);
    return cardElem
}
