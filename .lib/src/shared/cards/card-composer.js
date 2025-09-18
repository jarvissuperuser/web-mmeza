import {DOMElement} from '../../core/index.js';

export class CardComposer extends DOMElement{
    static get is() {
        return 'card-composer'
    }
    HTML() {
        return `
<div class="w3-container">
    <div class="w3-content">
        <card-wrapper></card-wrapper>
    </div>
</div>        
        `;
    }

}
