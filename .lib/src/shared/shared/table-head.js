import {DOMElement, modelMixIn} from "../core/index.js";


/**
 *
 * @extends DOMElement
 * @extends ModelBase
 * */
export class TableHead extends modelMixIn(DOMElement) {
    static get is() {return 'table-head';}
    HTML() {
        return `
<div class="thead w3-black w3-text-uppercase">
    <div class="w3-col s1 w3-padding w3-black">
         #
    </div> 
    <div class="w3-col s2 w3-padding w3-black ">
        item 
    </div>
    <div class="w3-col s4 w3-padding w3-black">
        description
    </div>
    <div class="w3-col s1 w3-padding w3-black">
        qty 
    </div>
    <div class="w3-col s2 w3-padding w3-black">
        cost 
    </div>
    <div class="w3-col s2 w3-padding w3-black">
        amount
    </div>
</div>        
        `;
    }
}
