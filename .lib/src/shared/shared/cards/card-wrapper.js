import { DOMElement, uuid} from '../../core/index.js';
import {ShopCard} from './shop-card.js';
import {ShopItemModel} from '../../data/models/shop-item-model.js';
import { saveCards} from "../card-loader.js";
//import {uploadImage} from "../../js/data/crud-core.js";
//import {environment} from "../../../env/config.js";

export class CardWrapper extends DOMElement{
    constructor() {
        super();
        this.cards = []
    }
    static get is() {
        return 'card-wrapper'
    }
    HTML() {
        return `
<div class="w3-card w3-col s12 m3 w3-round w3-light-gray w3-margin w3-hover-gray" id="addToShop">
    <div class="w3-center">
        <div class="w3-row w3-jumbo w3-padding" >
            <button class="w3-button w3-circle box w3-text-dark-gray">+</button>
        </div>
        <div class="w3-padding"> <span class="">Add To Shop</span></div>
    </div>
</div>
<div class="w3-row">
    <div class="card-content"></div>
</div>
<app-modal></app-modal>          
        `;
    }
    loadStyle(styleFile = './styles.css') {
        super.loadStyle(styleFile);
        const styles = `.box { height: 112px; width: 112px }`
        this.setStyles(styles);
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.modal = this.getElements('app-modal')[0];
        this.card = this.getElements('#addToShop')[0];
        this.cardContent = this.getElements('.card-content')[0];
    }
    attachAttributesNLogic() {
        /*let data = getCardsCloud(environment.dbKeys.products);
        data.then(res => {
            const savedCards = res;
            if (savedCards) {
                const sortedCarts = savedCards.sort(s => s.inventoryAvailable + s.inventoryAvailable);
                sortedCarts.reverse();
                console.log({ sortedCarts, savedCards });
                sortedCarts.forEach(card => {
                    const cardElem = this.cardCompose(card, this);
                    this.cardContent.appendChild(cardElem);
                    this.cards.push(cardElem);
                });
            }
        })*/

        this.modal.addEventListener('closed', (e) => {
            const element = e.target;
            const newCard = this.cards.filter(c => {
                return c.model.id === element.model.id
            })[0];
            console.log({newCard: element.model});
            if (!newCard) {
                const fileName =`${uuid()}.jpg`;
                /*const task = uploadImage(element.model.image, fileName);
                task.then(url => {
                    element.model.image = url;
                    const cardElem = this.cardCompose(element.model, this);
                    this.cardContent.appendChild(cardElem);
                    saveCardCloud(cardElem.model);
                }).catch(console.log);*/
            } else {
                newCard.model = element.model;
                //saveCardCloud(element.model);
            }
        });
        this.card.onclick = () => {
            this.modal.model = new ShopItemModel();
            this.modal.showing = true;
            this.modal.buttonText = 'Add To Shop';
            this.modal.modalTitle = 'Add new Item to Shop';
        };
    }
    cardCompose(model,self) {
        const cardElem = new ShopCard();
        cardElem.model = model;
        cardElem.clickCallback = () => {
            self.modal.model = cardElem.model;
            self.modal.showing = true;
            self.modal.modalTitle = `Edit Shop Item ID: ${cardElem.model.id}`;
            self.modal.buttonText = 'Save Edit';
        };
        return cardElem
    }
    saveCardData() {
        const cardData = []
        this.cards.forEach(card => {
            cardData.push(card.model);
        });
        saveCards(cardData);
    }
}
