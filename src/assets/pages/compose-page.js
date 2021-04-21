import {Root} from '../core/index.js';

export class ComposePage extends Root {
    static get is() {
        return 'compose-page';
    }
    HTMLTemplate() {
        return `
<div class="w3-white vh-100">
    <div class="w3-margin-top-big">
        <card-composer></card-composer>
    </div>
</div>        
        `;
    }
}
