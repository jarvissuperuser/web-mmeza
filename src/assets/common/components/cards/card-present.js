import {Root} from "../../root.js";
import {getCards} from "../../../js/data/card-loader.js";
import {cardFactory} from "../../../js/data/various-factories.js";

export class CardPresent extends Root{
    static get is() {
        return 'card-present'
    }
    HTMLTemplate() {
        return `
<div class="w3-row card-content">
</div>        
        `;
    }
    loadSlots() {
        super.loadSlots();
        this.cards = []
        this.cardContent = this.getElements('.card-content')[0];
    }
    loadAttributes() {
        const cardData = getCards();
        if (Array.isArray(cardData)) {
            cardData.forEach(cardT => {
                const card = cardFactory(cardT);
                this.cardContent.appendChild(card);
                this.cards.push(card);
            });
        }
    }
}
