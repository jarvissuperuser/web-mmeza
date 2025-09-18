import {Core, DOMElement, inputMixin} from "../core/index.js";

export class PageWrapper extends DOMElement{
    static get is() {return 'page-wrapper' }
    HTMLTemplate() {
        return `<div><slot class="vh-100 bg-theme w3-grid w3-place-center">
            <p>Default Text</p>
        </slot></div>`;
    }
    loadTargetElements() {
        console.log(this.innerHTML)
    }
}