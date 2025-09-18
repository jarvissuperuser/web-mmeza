import {DOMElement, modelMixIn} from "../core/index.js";
import {RowModel} from "./index.js";

/**
 * @extends DOMElement,
 * @extends modelMixIn
 * @extends Core
 * @property {RowModel} _model
 * @method interpolate
 * */
export class TableRow extends modelMixIn(DOMElement) {
    static get is() {return 'table-row'}
    HTML() {
        return `
<div class="w3-col s1 w3-padding ">
     <span>{{position}}</span>
</div> 
<div class="w3-col s2 w3-padding ">
    <span>{{item}}</span>
</div>
<div class="w3-col s4 w3-padding ">
    <span>{{description}}</span>
</div>
<div class="w3-col s1 w3-padding ">
    <span>{{quantity}}</span> 
</div>
<div class="w3-col s2 w3-padding ">
    <span>{{unitPrice}}</span>
</div>
<div class="w3-col s2 w3-padding ">
    <span>{{total}}</span>
</div>        
        `;
    }
    attachAttributesNLogic() {
        if (!this.model) {
            this.model = new RowModel()
        }
        this.calTotal();
        this.interpolate();
    }
    calTotal() {
        this.model.total = this.model.unitPrice * this.model.quantity;
    }
    attributeChangedCallBack(prop, oldV, newV) {
    }

}
