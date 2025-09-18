import {DOMElement} from "../../core/index.js";

export class TfSub extends DOMElement{
    static get is() {return 'tf-sub'}
    HTML() {
        return `<div class="w3-col">
    <div class="w3-col s6 w3-padding">
        <p class="w3-right">True</p>
    </div>
    <div class="w3-col s6 w3-padding">
        <p class="">False</p>
    </div>
</div>`
    }

}