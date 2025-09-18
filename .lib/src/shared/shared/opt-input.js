import { DOMElement } from "../core/index.js";

export class OptInput extends DOMElement {
    static get is() {
        return 'opt-input';
    }
    HTML() {
        return `
    <div class="w3-col s8 m10 l11">
        <input type="text" 
        placeholder="${this.placeholder}"
        class="w3-input primary w3-border-0 w3-border-bottom bg-theme w3-hover-border-blue m-0 w3-small">
    </div>
    <div class="w3-col s4 m2 l1">
        <button class="w3-btn rm w3-small w3-text-red">&times;</button>
    </div>
        `;
    }

    loadTargetElements() {
        // this.label = this.getElements('span.i-label')[0];
        this.input = this.getElements('input.w3-input')[0];
        this.btn = this.getElements('button.rm')[0];
        this.blurred = new CustomEvent('blur');
        this.inputChanged = new CustomEvent('input');
        this.removeChanged = new Event('rmElement');
    }
    attachAttributesNLogic() {
        const {input, btn} = this;
        input.value = this._val;
        input.onblur = event => {
            const value = event.target.value;
            this._val = value;
            this.setAttribute('value', value);
            this.dispatchEvent(this.blurred);
        }
        input.oninput = event => {
            const value = event.target.value;
            this._val = value;
            this.setAttribute('value', value);
            this.dispatchEvent(this.inputChanged);
        }
        input.focus()
        btn.onclick = event => {
            this.dispatchEvent(this.removeChanged);
        }
    }
    get value() {
        return this._val;
    }
    set value(val) {
        this._val = val
        if (this.input) this.input.value = val;
    }


}
