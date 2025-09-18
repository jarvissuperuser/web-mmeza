import {ShopCard} from "./cards/shop-card.js";
import {CartModel } from "../data/models/cart-model.js";
import { ShopItemModel } from "../data/models/shop-item-model.js";
import { uuid} from "../core/index.js";
import {ProfileModel} from "../data/models/profile-model.js";

export const cardFactory = (model, clickCallback = null, buttonCallback = null) => {
    const cardElem = new ShopCard();
    cardElem.model = model;
    cardElem.clickCallback = clickCallback?clickCallback:cardElem.clickDefault.bind(cardElem);
    cardElem.buttonCallback = buttonCallback?buttonCallback:cardElem.buttonClickDefault.bind(cardElem);
    return cardElem
}
/***
 * @return {Object<Array<CartModel>, Array<ProfileModel>>}
 * */
export const mockOrders = () => {
    const orders = [];
    const users = mockUsers();
    const newOrder1  = newOrder();
    newOrder1.userId = users[0].id;
    orders.push(newOrder1);
    const newOrder2  = newOrder();
    newOrder2.userId = users[1].id;
    orders.push(newOrder2);
    const newOrder3  = newOrder();
    newOrder3.userId = users[2].id;
    orders.push(newOrder3);
    const newOrder4  = newOrder();
    newOrder4.userId = users[3].id;
    orders.push(newOrder4);
    return {orders, users};
}

export const mockUsers = () =>{
    const users = [];
    const user1 = new ProfileModel();
    user1.fullName = 'Timothy Mugadza';
    user1.address = '2 Rissik st, Marshalltown, Johannesburg 2000';
    user1.phone = '0815162835';
    user1.id = uuid();
    users.push(user1);

    const user2 = new ProfileModel();
    user2.fullName = 'Micheal Ngulube';
    user2.address = '61 woodlands Ave, Hurlingham, Sandton 2070, Gauteng';
    user2.phone = '0815162835';
    user2.id = uuid();
    users.push(user2);

    const user3 = new ProfileModel();
    user3.fullName = 'Josh Ngulube';
    user3.address = '61 woodlands Ave, Hurlingham, Sandton 2070, Gauteng';
    user3.phone = '0815162835';
    user3.id = uuid();
    users.push(user3);

    const user4 = new ProfileModel();
    user4.fullName = 'Anotida Makunike';
    user4.address = '61 woodlands Ave, Hurlingham, Sandton 2070, Gauteng';
    user4.phone = '0815162835';
    user4.id = uuid();
    users.push(user4);
    return users;
}
const newOrder= ()=> {
    const order = new CartModel();
    order.id = uuid();
    order.userId = uuid();
    order.state = Object.keys(cartState)[(randomizer()+3)%5];
    if ([0,1,2].includes(randomizer())) {
        const shopItem1 = new ShopItemModel();
        shopItem1.price = 550;
        shopItem1.title = 'corduroy';
        shopItem1.quantity = randomizer()+1;
        shopItem1.selectedSize = 'S';
        shopItem1.selectedColor = 'Safari Khaki';
        shopItem1.dateAdded = Date.now();
        order.items.push(shopItem1);
    }
    if ([0,1,3].includes(randomizer())) {
        const shopItem2 = new ShopItemModel();
        shopItem2.price = 380;
        shopItem2.title = 't-shirts';
        shopItem2.quantity = randomizer()+1;
        shopItem2.selectedSize = 'M';
        shopItem2.selectedColor = 'Safari Khaki';
        shopItem2.dateAdded = Date.now();
        order.items.push(shopItem2);
    }
    if ([0,2].includes(randomizer())) {
        const shopItem3 = new ShopItemModel();
        shopItem3.price = 450;
        shopItem3.title = 'shorts';
        shopItem3.quantity = randomizer()+1;
        shopItem3.selectedSize = 'S';
        shopItem3.selectedColor = 'pink';
        shopItem3.dateAdded = Date.now();
        order.items.push(shopItem3);
    }
    if ([1,3].includes(randomizer())) {
        const shopItem4 = new ShopItemModel();
        shopItem4.price = 600;
        shopItem4.title = 'Pants';
        shopItem4.quantity = 0+1;
        shopItem4.selectedSize = 'L';
        shopItem4.selectedColor = 'blue';
        shopItem4.dateAdded = Date.now();
        order.items.push(shopItem4);
    }
    return order;
}
