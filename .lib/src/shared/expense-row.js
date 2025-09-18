import {DOMElement, modelMixIn} from '../core/index.js'
import {Expense} from "./models/expense-model.js";

/**
 * @extends DOMElement,
 * @extends modelMixIn
 * @extends Core
 * @property {RowModel} _model
 * @method interpolate
 * */
export class ExpenseRow extends modelMixIn(DOMElement) {
    static get is () {return 'expense-row'}
    HTML() {
        return `
<div class="w3-bottombar w3-row slim">
    <div class="w3-col s4 w3-padding ">
        <span>{{expense}}</span>
    </div>
    <div class="w3-col s4 w3-padding w3-center">
        <span class="w3-text-x-small">{{date}}</span>
    </div>
    <div class="w3-col s4 w3-padding ">
        <span class="w3-right">{{amount}}</span>
    </div> 
</div>     
        `;
    }

    attachAttributesNLogic() {
        if (!this.model) {
            this.model = new Expense();
        }
        this.interpolate();
    }
}
