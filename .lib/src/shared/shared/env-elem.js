import {DOMElement} from "../core/index.js";
import {Envelope, frequency} from "./index.js";

export class EnvElem extends DOMElement {
    static get is() {return 'env-elem';}
    HTML() {
        return `<div class="w3-col s12">
    <input type="text" class="w3-input" name="name" placeholder="Envelope Name">
    <input type="number" class="w3-input" name="budget" placeholder="Budget amt">
    <select class="w3-select" style="text-transform: capitalize" name="frequency">
        ${Object.entries(frequency()).map(x => 
         `<option value="${x[1]}">${x[0]}</option>`).join('')}
    </select>
    <input type="text" class="w3-input" name="name">
</div>`;
    }

    loadTargetElements() {
        if (!this.model) this.model = new Envelope();
    }


    loadInputs() {
        this.inputs = this.getElements("input");
        this.inputListener();
    }

    inputListener() {
        if (this.inputs.length) {
            this.inputs.forEach(input => {
                input.onblur = async () => {
                    this.model[input.getAttribute('name')] = input.value;
                    // await win.crud().update(tables.tenders, this.model);
                    /*const display = this.getElements(`span.${input.getAttribute('name')}`)[0];
                    if ( display) display.innerText = input.value;*/
                }
            })
            this.cin.forEach(input => {
                input.onblur = async () => {
                    this.model[input.getAttribute('name')] = input.textContent;
                    this.cinOnBlur(input);
                    // await win.crud().update(tables.tenders, this.model);
                    /*const display = this.getElements(`span.${input.getAttribute('name')}`)[0];
                    if ( display) display.innerText = input.value;*/
                }
            });
        }
    }
}
