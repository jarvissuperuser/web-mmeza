import {DOMElement} from '../core/index.js';

export class AppToggle extends DOMElement{
    static get is() {return 'app-toggle'}

    HTML() { 
        return `<label class="toggle-check">
    <input type="checkbox" class="toggle w3-hide" checked>
    <div class="switch"></div>
    <div class="label w3-small"></div>
</label>` 
    }
    loadTargetElements() {
        this.input = this.byId('input[type=checkbox]');
        this.label = this.getElements('.label')[0];
        if (this.model) this.input.checked = this.model.checked;
        if(!this.model) this.model = {checked: this.input.checked};
        this.inputChanged = new CustomEvent('inp');
    }

    attachAttributesNLogic() {
        this.setText();
        this.input.onchange = () => {this.setText(); this.dispatchEvent(this.inputChanged)};
    }

    setText() {
        if (this.model.onText){
            this.label.innerText = this.input.checked? this.model.onText : this.model.offText;
        }
    }

    get checked() {
        if (this.input) return this.input.checked;
        return null;
    }

    set checked(value) {
        if (this.input) this.input.checked = value;
        if(this.model) this.model.checked = value;
    }

    get value() {
        if (this.input) return this.input.checked;
        return null;
    }
    set value(value) {
        if (this.input) this.input.checked = value;
        if (this.model) this.model.checked = value;
        if(!this.model) this.model = {checked: value};
    }
    set onText(value) {
        if (this.model)  this.model.onText = value;
        this.setText();
    }
    set offText(value) {
        if (this.model)  this.model.offText = value;
        this.setText();
    }
}
