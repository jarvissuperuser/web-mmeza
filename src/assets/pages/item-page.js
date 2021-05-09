import {Core, getRoutePath} from '../core/index.js';
import {getCards} from '../js/data/card-loader.js';

export class ItemPage extends Core{
    static get is() {
        return 'item-page'
    }
    HTMLTemplate() {
        return `
<div class="w3-col s12 w3-margin-top-big">
    <div class="w3-col s12 m7 l7">
        <img src="" alt="Item" class="w3-image">
    </div>
    <div class="w3-col m5 l5 w3-hide-small">
        <div class="place-center vh-50 w3-hide-small">
            <div class="w3-center">
                <div class="description"></div>
                <button class="w3-btn add-to-cart w3-grey">Add To Cart</button>
            </div>
        </div>
    </div>
    <div class="w3-bottom w3-hide-large w3-hide-medium w3-padding">
        <div class=" w3-round w3-card w3-light-gray w3-padding"> 
            <div class="w3-center"> 
                <div class="description"> </div>
                <button class="w3-btn add-to-cart w3-grey">Add To Cart</button>
            </div>
        </div>
    </div>
</div>`;
    }
    loadTargetElements() {
        this.img =  this.getElements('img')[0];
        this.descriptionElement = this.getElements('.description');
        this.addToCartElements = this.getElements('button.add-to-cart');
    }
    attachAttributesNLogic(){
        this.model = this.getModel();
        if (this.model) {
            this.img.src = this.model.image;
            this.descriptionElement.forEach( ele => {ele.textContent = this.model.description});
        }
    }
    getModel() {
        const cardsData = getCards();
        const itemId = getRoutePath()[2];
        if (itemId && Array.isArray(cardsData)) {
            return cardsData.filter(c => c.id === itemId)[0];
        }
        return null;
    }
    get model() {
        return this._model;
    }
    set model(mdl) {
        this._model = mdl;
    }
}
