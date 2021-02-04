import {Root} from "../root.js";

export class AppModal extends Root {
    static get is() {
        return 'app-modal';
    }
    HTMLTemplate() {
        return `
<div class="w3-modal ">
    <div class="w3-modal-content w3-card w3-animate-zoom">
        <slot name="content">
            <h3 class="w3-center">Add New Item</h3>
            <form class="w3-col s12 l6 m6">
                <image-canvas></image-canvas>
                <app-input label="Item Name" name="title"></app-input>
                <app-input label="Item Description" name="description"></app-input>
                <app-input label="Item Price" name="price"></app-input>
                <app-input label="Items in Inventory " name="inventoryAvailable"></app-input>
            </form>
            <div class="w3-card-2">
            </div>
        </slot>
    </div>
</div>        
        `;
    }
    loadSlots() {
        super.loadSlots();
        this.modal = this.getElements('.w3-modal')[0];
    }
    loadAttributes() {
        this._state = this.getAttribute('showing');
        if (this._state) {
            this.modal.classList.add('w3-show');
        } else {
            this.modal.classList.remove('w3-show');
        }
    }

    set showing(state) {
        this._state = !!state?state:false;
    }
    get showing() {
        return this._state;
    }
}
