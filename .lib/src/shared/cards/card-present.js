import {DOMElement} from '../../core/index.js';
import {getCards} from '../card-loader.js';
import {cardFactory} from '../various-factories.js';

export class CardPresent extends DOMElement{
    static get is() {
        return 'card-present'
    }
    HTML() {
        return `
<div class="w3-row card-content">
</div>        
        `;
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.cards = []
        this.cardContent = this.getElements('.card-content')[0];
    }
    attachAttributesNLogic() {
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
