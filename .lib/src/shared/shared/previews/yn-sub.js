import {DOMElement} from "../../core/index.js";

export class YnSub extends DOMElement{
    static get is() {return 'yn-sub'}
    HTML() {
        return `<div class="w3-col">
    <div class="w3-col s6 w3-padding">
        <p class="w3-right">yes</p>
    </div>
    <div class="w3-col s6 w3-padding">
        <p class="">no</p>
    </div>
</div>`
    }

}