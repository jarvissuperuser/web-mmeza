import {modelMixIn, addEl, DOMElement} from "../core/index.js";
import {OptionModel} from "../data/models/option-model.js";

export class AppOption extends modelMixIn(DOMElement) {
    static get is() {return 'app-option'}
    HTML() {
        return `
<div class="w3-col s12 container ">
</div>        
        `;
    }
    loadTargetElements() {
        this.model = this.model ?? new OptionModel();
        this.container = this.getElements('div.container')[0];
        this.inputTemplate = addEl('opt-input');
        this.inputs = [];
    }
    attachAttributesNLogic() {
        this.inputTemplate.classList.add('w3-container', 'bg-theme');
        this.inputLoader()
    }
    inputLoader() {
        this.inputs = []
        this.container.innerHTML = '';
        this.model.items.forEach((i, ix) => {
            const input = this.inputTemplate.cloneNode(true);
            input.placeholder = this.model.placeholder;
            input.value = i;
            input.id = `n${ix}`;
            this.inputs.push(input);
        });
        this.inputs.forEach(input => {
            input.addEventListener('blur', this.inputOnBlur.bind(this));
            input.addEventListener('rmElement', this.inputOnRemove.bind(this));
            this.container.appendChild(input)
        });
    }
    inputOnBlur(event) {
        const self = event.target;
        const id = parseInt(self.id.substr(1));
        this.model.items[id] = self.value;
    }
    inputOnRemove(event) {
        this.inputs.filter(input => input.id !== event.target.id);
        this.model.items.splice(parseInt(event.target.id.substr(1)),1);
        this.inputLoader();
    }
    get length() { return this.inputs.length;}
    addItem(item = '') {
        this.model.items.push(item)
        const newInput = this.inputTemplate.cloneNode(true)
        this.inputs.push(newInput)
        this.inputLoader();
    }
    get items() {
        return this.model.items;
    }
    empty() {
        this.model.items = []
        this.attachAttributesNLogic();
    }
}
