import {AppInput} from "./app-input.js";

export class DatetimeInput extends AppInput {
    static get is() {return 'datetime-input'}
    HTML() {
        return `
<label title="${this.getAttribute('title')}" class="primary">
    <input type="datetime-local" 
    name="${this.getAttribute('name')}-date"
   
    class="w3-input primary w3-border-0 w3-border-bottom w3-hover-border-blue w3-padding-mobile">
        
</label>
        `;
    }
    set value(val) {
        this._val = val;
        this.input.value = val;
    }

    get value() {
        return this._val
    }
}
