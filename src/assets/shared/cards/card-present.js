import {Core} from '../../core/index.js';
import {getCards} from '../../js/data/card-loader.js';
import {cardFactory} from '../../js/data/various-factories.js';

export class CardPresent extends Core{
    static get is() {
        return 'card-present'
    }
    HTMLTemplate() {
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
