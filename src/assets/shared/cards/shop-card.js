import {Core} from '../../core/index.js';
import {ShopItemModel} from '../../models/shop-item-model.js';

export class ShopCard extends Core{
    static get is() {
        return 'shop-card'
    }
    /*
    *
    * */
    HTMLTemplate() {
        return `
<div class="w3-col s12 w3-padding">
    <div class="w3-card-2 w3-hover-shadow w3-round w3-black">
        <img alt="Item Name" class="w3-image w3-round w3-round-top">
        <div class="c-body w3-padding">
            <div class="w3-row"><span class="w3-text-large title"></span> <span class="w3-right price">Item Price</span></div>
            <div class="w3-row"><app-quantify class="w3-left"></app-quantify> <button class="w3-button w3-white w3-right add">+ Add To Cart</button></div>
        </div>
    </div>
</div>
        `;
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.titleElement = this.getElements('span.title')[0];
        this.priceElement = this.getElements('span.price')[0];
        this.image = this.getElements('img.w3-image')[0];
        this.cardElement = this.getElements('div.w3-card-2')[0];
        this.addButton = this.getElements('button.add')[0];
        this.addToCart =  new CustomEvent('addToCard');
    }
    attachAttributesNLogic() {
        this.titleElement.innerText = this.model.title;
        this.priceElement.innerText = this.model.price;
        this.image.src = this.model.image;
        this.cardElement.onclick = this.clickCallback;
        this.addButton.onclick = () => {
            if (!this.disableAdd) {
                this.dispatchEvent(this.addToCart);
                return;
            }
            this.clickCallback();
        };
    }

    set model(m) {
        this._model = m;
        if (this.titleElement) this.attachAttributesNLogic();
    }
    get model() {
        return this._model;
    }
    get disableAdd() {
        return this._disabled? this._disabled : false;
    }
    set disableAdd(_disable) {
        this._disabled = _disable;
    }
    get buttonCallback() {
        return this.buttonClickAction ? this.buttonClickAction : this.buttonClickDefault;
    }
    buttonClickDefault() {
        this.dispatchEvent(this.addToCart);
    }
    set buttonCallback(cb) {
        this.buttonClickAction = cb;
    }
    get clickCallback() {
        return this.clickAction ? this.clickAction : this.clickDefault;
    }
    clickDefault() {
        location.pathname = `/item/${this.model.id}`;
    }
    set clickCallback(cb) {
        this.clickAction = cb;
    }
}
