import {Core} from '../../core/index.js';

export class CardComposer extends Core{
    static get is() {
        return 'card-composer'
    }
    HTMLTemplate() {
        return `
<div class="w3-container">
    <div class="w3-content">
        <card-wrapper></card-wrapper>
    </div>
</div>        
        `;
    }

}
