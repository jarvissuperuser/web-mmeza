import {Core} from '../core/index.js';

export class AppQuantify extends Core {
    static get is() {
        return 'app-quantify'
    }
    HTMLTemplate() {
        return `
<div class="w3-row">
    <span class="plus">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#47a347" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
        </svg>
    </span>
    <span class="number">1</span>
    <span class="minus">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#de4d48" d="M19,13H5V11H19V13Z"></path>
        </svg>
    </span>
</div>
        `;
    }
    loadTargetElements() {
        this.numElement = this.getElements('.number')[0];
    }
    attachAttributesNLogic() {
        this.numElement.innerText = !!this.number?this.number:1;
    }

    get number() {
        return this._number;
    }
    set number(num){
        this._number = num;
        if (this.numElement) this.numElement.innerText = this._number;
    }
}
