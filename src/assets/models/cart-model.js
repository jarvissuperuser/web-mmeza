export const cartState = {
    OPEN: 'open',
    CONFIRMED: 'confirmed',
    PROCESSING: 'in-transit',
    SHIPPED: 'delivered',
    RETURNED: 'returned'
}

export const currency = {
    RAND: 'ZAR',
    DOLLAR: 'USD'
}

export class CartModel {
    /**
     * @property {Array<ShopItemModel>}items
     * */
    constructor() {
        this.state = cartState.OPEN;
        this.id = '';
        this.items = [];
        this.userId = '';
        this.currency = currency.RAND;
        this.dateAdded = Date.now();
        this.dateConfirmed = -1;
        this.dateDelivered = -1;
        this.dateRefunded = -1;
        this.totalRefunded = 0;
        this.returnedItems = [];
        this.refunds = [];
        this.total = 0;
        this.tax = 0;
    }
}
