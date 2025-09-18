import {DOMElement} from "../../core/index.js";

export class TxtSub extends DOMElement{
    static get is() {return 'txt-sub'}
    HTML() {
        return `<div class="w3-col w3-padding">
    <textarea type="text" class="w3-input" placeholder="Enter text for response"> </textarea>
</div>`;
    }

}