import {DOMElement} from "../../core/index.js";

export class NumSub extends DOMElement{
    static get is() {return 'num-sub'}
    HTML() {
        return `<div class="w3-col w3-padding">
    <input type="number" class="w3-input" placeholder="Enter number for response"> 
</div>`
    }

}