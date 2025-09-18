import {DOMElement, win,uuid} from "../core/index.js";
import { ShopItemModel } from "../data/models/shop-item-model.js";
import {file, tables} from "../data/lazy-ops.js";
import { ShopCard } from "../shared/index.js";

export class ShopPage extends DOMElement {
    static get is() {
        return 'shop-page';
    }
    HTML() {
        return `
<div class="w3-card w3-col s12 m3 w3-round w3-light-gray w3-margin w3-hover-gray" id="addToShop">
    <div class="w3-center">
        <div class="w3-row w3-jumbo w3-padding" >
            <button class="w3-button w3-circle box w3-text-dark-gray">+</button>
        </div>
        <div class="w3-padding"> <span class="">Add Item To Shop</span></div>
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
        this.cards = [];
        super.loadTargetElements();
        this.modal = this.getElements('app-modal')[0];
        this.card = this.getElements('#addToShop')[0];
        this.cardContent = this.getElements('.card-content')[0];
    }
    async attachAttributesNLogic() {
        let data = win.crud().read(tables.products, ['id', '!=', '0']);
        const cardImgs = [];

        data.then( async res => {
            const savedCards = res;
            cardImgs.push(...await win.crud().read(tables.productImgs, ['shopItemId', '!=', '0']));
            if (savedCards) {
                const sortedCarts = savedCards.sort(s => s.inventoryAvailable + s.inventoryAvailable);
                sortedCarts.reverse();
                sortedCarts.forEach(card => {
                    card.images = cardImgs.filter(img => img.shopItemId === card.id).sort((a,b) => a.index - b.index).map(img => img.src);
                    const cardElem = this.cardCompose(card, this);
                    this.cardContent.appendChild(cardElem);
                    this.cards.push(cardElem);
                });
            }
        });

        this.modal.addEventListener('closed',async (e) => {
            const element = e.target;
            const newCard = this.cards.filter(c => {
                return c.model.id === element.model.id
            })[0];
            
            const imgs = element.imgWraps;
            console.log({newCard: element.model});
            if (!newCard) {
                const imgPath = [];
                imgs.forEach(async i => {
                    if (!i.src) {
                        let img = await win[file.setImg](i.blob, i.imgName);
                        i.src = img.url;
                        imgPath.push(img.url);
                        delete i.blob;
                        await win.crud().create(tables.productImgs, i);
                    }
                });
                //console.log({imgPath, imgs, state:'not'});
                element.model.images = imgPath;
                await win.crud().update(tables.products, element.model);
                this.cardContent.appendChild(this.cardCompose(element.model, this));
            } else {
                const imgPath = [];
                imgs.forEach(async i => {
                    if (i.changed) {
                        let img = await win[file.setImg](i.blob,i.imgName);
                        i.src = img.url;
                        imgPath.push(img.url);
                        delete i.blob;
                        console.log({img: i});
                        await win.crud().create(tables.productImgs, i);
                    }
                });
                //console.log({imgPath, imgs});
                // console.log({imgs});
                element.model.images = imgPath;
                await win.crud().create(tables.products, element.model);
                //this.cardContent.appendChild(this.cardCompose(element.model, this));

                //saveCardCloud(element.model);
            }
        });
        this.card.onclick = () => {
            this.modal.model = new ShopItemModel();
            this.modal.showing = true;
            this.modal.buttonText = 'Add To Shop';
            this.modal.modalTitle = 'Add Car to Shop';
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
