import {ShopCard} from "../../common/components/cards/shop-card.js";

export const cardFactory = (model, clickCallback = null, buttonCallback = null) => {
    const cardElem = new ShopCard();
    cardElem.model = model;
    cardElem.clickCallback = clickCallback?clickCallback:cardElem.clickDefault.bind(cardElem);
    cardElem.buttonCallback = buttonCallback?buttonCallback:cardElem.buttonClickDefault.bind(cardElem);
    return cardElem
}
