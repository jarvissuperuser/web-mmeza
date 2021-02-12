import {Root} from "../common/root.js";

export class ShopPage extends Root {
    static get is() {
        return 'shop-page';
    }
    HTMLTemplate() {
        return `
<div class="w3-grey vh-100">
    <div class="w3-margin-top-big">
        <card-present></card-present>
    </div>
</div>        
        `;
    }

}
