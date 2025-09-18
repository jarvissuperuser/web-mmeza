export class ShopItemModel {
    constructor() {
        this.id = '';
        this.title = '';// car Make
        this.model = ''; // car Model
        this.year = '2012'; // car Year 
        this.price = '';
        this.currency = '';
        this.description = ''; // car Year
        this.image = '';
        this.hasColorOptions = false;
        this.hasSizeOptions = false;
        this.images = [];
        this.colorOptions = [];
        this.sizeOptions = []; // car <Details></Details>
        this.selectedColor = '';
        this.selectedSize = '';
        this.inventoryAvailable = 0;
        this.quantity = 0;
        this.itemType = '';
        this.dateAdded = 0;
    }
}
