import {Root} from "../../root.js";
import {ShopCard} from "./shop-card.js";
import {ShopItemModel} from "../../../models/shop-item-model.js";
import {getCards, saveCards} from "../../../js/data/card-loader.js";

export class CardWrapper extends Root{
    constructor() {
        super();
        this.cards = []
    }
    static get is() {
        return 'card-wrapper'
    }
    HTMLTemplate() {
        return `
<div class="w3-card w3-col s12 m3 l3 w3-round w3-light-gray w3-margin w3-hover-amber" id="addToShop">
    <div class="w3-center">
        <div class="w3-row w3-jumbo w3-padding" >
            <button class="w3-button w3-circle box w3-dark-gray">+</button>
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
    loadSlots() {
        super.loadSlots();
        this.modal = this.getElements('app-modal')[0];
        this.card = this.getElements('#addToShop')[0];
        this.cardContent = this.getElements('.card-content')[0];
    }
    loadAttributes() {
        const savedCards = getCards('cards');
        if (savedCards) {
            savedCards.forEach(card => {
                const cardElem = this.cardCompose(card, this);
                this.cardContent.appendChild(cardElem);
                this.cards.push(cardElem);
            });
        }

        this.modal.addEventListener('closed', (e) => {
            const element = e.target;
            const newCard = this.cards.filter(c => {
                return c.model.id === element.model.id
            })[0];
            if (!newCard) {
                const cardElem = this.cardCompose(element.model, this);
                this.cardContent.appendChild(cardElem);
                this.cards.push(cardElem);
                this.saveCardData();
            } else {
                newCard.model = element.model;
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
