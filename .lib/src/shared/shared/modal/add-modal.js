import {dateFormatter, doc, DOMElement, inputMixin, modalMixIn} from '../../core/index.js';
import {Expense} from "../models/expense-model.js";

export class AddModal extends inputMixin(modalMixIn(DOMElement)) {
    static get is () {return `add-modal`}
    HTML() {
        return `
<div class="w3-modal bg-blur">
    <div class="w3-modal-content w3-card w3-animate-zoom w3-black">
        <h4 class="w3-center"><span class="modalTitle">${this.modalTitle}</span> <button class="w3-btn w3-red w3-right close">&times;</button></h4>
        <div class="w3-col s12 l6 m6 w3-black">
            <div class="canvas">
            </div>
            <div class="w3-padding">
                <app-input label="Expense" name="expense"></app-input>
                <app-input label="Amount" name="amount"></app-input>
                <div class="w3-hide more">
                    <app-input label="Description" name="description"></app-input>
                    <datetime-input name="date"></datetime-input>
                    <button class="w3-button w3-blue w3-block w3-margin-top">Upload</button>
                </div>
                <div class="w3-row w3-center w3-padding">
                    <button class="w3-btn w3-teal add">Add</button>
                </div>
                <div class="w3-row w3-center w3-padding">
                    <button class="w3-btn w3-teal show-more">Details ...</button>
                </div>
            </div>
        </div>
    </div>
</div>              
        `;
    }
    loadTargetElements() {
        if (!this.model) this.model = new Expense();
        //this.modalTitle = 'Add Expense';
        super.loadTargetElements();
        this.detailBox = this.getElements('.more')[0];
        this.loadInputs();
        this.dateTimeInput = this.getElements('datetime-input')[0];
        this.loadButtons();

    }
    attachAttributesNLogic() {
        this.inputListener();
        this.dateTimeListener();
    }
    loadButtons() {
        this.saveEvent =  new CustomEvent('save');
        this.closeButton = this.getElements('.close')[0];
        this.showMore = this.getElements('.show-more')[0];
        this.addButton = this.getElements('.add')[0];
        this.closeButton.onclick = () => {
            this.closeModal();
        };
        this.addButton.onclick = () => {
            this.model.amount = parseFloat(this.model.amount);
            this.saveEvent = new CustomEvent('save',{detail:{model: this.model}});
            this.dispatchEvent(this.saveEvent);
            this.closeModal();
        }
        this.showMore.onclick = () => {
            this.detailBox.classList.remove('w3-hide');
        }
    }
    dateTimeListener() {
        if (this.model && this.dateTimeInput) {
            this.dateTimeInput.value = this.model.date;
        }
        if (this.dateTimeInput)
        this.dateTimeInput.addEventListener('blur', (event) => {
            const element = event.target;
            const {value} = element;
            console.log({value})
            if (value) {
                this.model.date = dateFormatter().format(new Date(value));
            }
        });
    }
    showModal() {
        this.modal.classList.add('w3-show');
    }
    closeModal() {
        this.modal.classList.remove('w3-show');
    }
    reset() {
        super.reset();
        this.detailBox.classList.add('w3-hide');
    }

}
