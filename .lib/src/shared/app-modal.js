import {Core, uuid} from '../core/index.js';
import {ShopItemModel} from '../models/shop-item-model.js';

export class AppModal extends Core {
    static get is() {
        return 'app-modal';
    }
    HTMLTemplate() {
        return `
<div class="w3-modal ">
    <div class="w3-modal-content w3-card w3-animate-zoom">
        <slot name="content">
            <h3 class="w3-center"><span class="modalTitle">${this.modalTitle}</span> <button class="w3-btn w3-red w3-right close">&times;</button></h3>
            <form class="w3-col s12 l6 m6">
                <image-canvas></image-canvas>
                <div class="w3-padding w3-black">
                    <app-input label=" Item Name" name="title"></app-input>
                    <app-input label=" Item Description" name="description"></app-input>
                    <app-input label=" Item Price" name="price"></app-input>
                    <app-input label=" Items in Inventory " name="inventoryAvailable"></app-input>
                </div>
            </form>
            <div class="w3-col s12 l6 m6 w3-padding">
                <div class="w3-card-2 w3-round w3-black">
                    <img  alt="Item Name" class="w3-image w3-round w3-round-top">
                    <div class="c-body w3-padding">
                        <div class="w3-row"><span class="w3-text-large title"></span> <span class="w3-right price">Item Price</span></div> 
                        <div class="w3-row"><button class="w3-button w3-white w3-right w3-disabled" disabled>+ Add To Cart</button></div>
                    </div>
                </div>
                <div class="w3-padding w3-center">
                    <button class="w3-button w3-teal add">+ Add To Catalog</button>
                </div>
                <div class="w3-padding w3-center">
                    <button class="w3-button w3-deep-orange disable">Disable</button>
                </div>
                <div class="w3-padding w3-center">
                    <button class="w3-button w3-teal w3-deep-purple">Delete</button>
                </div>
            </div>
        </slot>
    </div>
</div>        
        `;
    }
    loadStyle(styleFile = './styles.css') {
        super.loadStyle(styleFile);
        const styles = `
        .close {
            padding: 0 8px !important;
        }
        `;
        this.setStyles(styles);
    }

    loadTargetElements() {
        super.loadTargetElements();
        this.keys = Object.keys(this.model);
        this.modal = this.getElements('.w3-modal')[0];
        this.imageCanvas = this.getElements('image-canvas')[0];
        this.img = this.getElements('img')[0];
        this.titleElement = this.getElements('span.title')[0];
        this.priceElement = this.getElements('span.price')[0];
        this.modalTitleElement = this.getElements('span.modalTitle')[0];
        this.inputs = this.getElements('app-input');
        this.close = this.getElements('.close')[0];
        this.button = this.getElements('button.add')[0];
        this.closed = new CustomEvent('closed');
        this._model = this.model;
    }
    attachAttributesNLogic() {
        const width = this.getElements('form')[0].getBoundingClientRect().width?
            this.getElements('form')[0].getBoundingClientRect().width
            :449.2;
        this.imageCanvas.setAttribute('width', width);
        // if (this.model.image) this.imageCanvas.src = this.model.image;
        this.img.src = this.imageCanvas.src;
        this.imageCanvas.addEventListener('changes', event => {
            this.img.src = event.target.src;
            this._model.image = event.target.src;
        });
        this.inputs.forEach(input =>
            input.addEventListener('blur', () => {
                this._model[input.getAttribute('name')] = input.value;
                const display = this.getElements(`span.${input.getAttribute('name')}`)[0];
                if ( display) display.innerText = input.value;
            }));
        this.updateState();
        this.close.onclick = () => this.closeState() ;
        this.button.innerText = this.buttonText;
        this.button.onclick = () => {
            this.processData();
            this.dispatchEvent(this.closed);
            this.closeState();
        };
    }
    processData() {
        const filterInputs = (key) => {
            return Array.from(this.inputs)
                .filter(input => input.getAttribute('name') === (key))[0]
        }
        for(const target of this.keys) {
            const input = filterInputs(target);
            if (input) this._model[target] = input.value;
        }

        this._model.image = this.imageCanvas.src;
        if (!this.model.id) this._model.id = uuid();
        if(!this.model.dateAdded) this._model.dateAdded = Date.now();
    }
    loadData() {
        const filterInputs = (key) => {
            return Array.from(this.inputs)
                .filter(input => input.getAttribute('name') === (key))[0]
        }
        for(const target of this.keys) {
            const input = filterInputs(target);
            if (input) input.value = this._model[target];
        }

        this.titleElement.innerText = this._model.title;
        this.priceElement.innerText = this._model.title;
        if (this.model.image) this.imageCanvas.src = this.model.image;
        if (!this.model.image) this.imageCanvas.src = this.imageCanvas.rawImg;
    }
    updateState() {
        if (this.showing) {
            this.modal.classList.add('w3-show');
        } else {
            this.modal.classList.remove('w3-show');
        }
    };
    closeState() {
        this._state = false;
        this.updateState();
    }
    set showing(state) {
        this._state = state;
        if(!this.model.image) this.imageCanvas.src = this.imageCanvas.rawImg;
        this.loadData();
        this.updateState();
    }
    get showing() {
        return !!this._state?this._state:false;
    }
    get buttonText() {
        return this._buttonText ? this._buttonText : 'Add To Shop';
    }
    set buttonText(text) {
        this._buttonText = text;
        this.attachAttributesNLogic();
    }
    set model(m) {
        this._model = m;
    }
    get model() {
        return this._model ? this._model : new ShopItemModel();
    }
    get modalTitle() {
        return  this._modalTitle?this._modalTitle: 'Add Item to Shop';
    }
    set modalTitle(title) {
        this._modalTitle = title;
        if (this.modalTitleElement) this.modalTitleElement.innerText = title ;
    }
}
