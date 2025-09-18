import {DOMElement, modalMixIn, modelMixIn} from "../../core/index.js";

export class StepModal extends modelMixIn(DOMElement) {
    static get is() {return 'step-modal'}
    HTML() {
        return `<div class="w3-modal bg-blur">
    <div class="w3-modal-content w3-card w3-animate-zoom bg-theme">
        <h4 class="w3-center"><span class="modalTitle">Add New Step</span> <button class="w3-btn w3-red w3-right close">&times;</button></h4>
        <div class="w3-col s12 m8 offset-2 bg-theme w3-padding w3-padding-32">
            <div class="">
                <select name="step" id="step" class="w3-select">
                    <option value="">Select Step Type</option>
                    <option value="uploadCard">upload step</option>
                    <option value="requirementsCard">requirement step</option>
                    <option value="questionnaireCard">questionnaire step</option>
                </select>
            </div>
            <div class="w3-padding">
                <div class="w3-row w3-center w3-padding">
                <button class="w3-btn 3-teal add">Add</button>
                </div>
            </div>
        </div>
    </div>
</div>`;
    }
    loadTargetElements() {
        if(!this.model) this.model = {step:''}
        this.select = this.getElements('#step')[0];
        this.modal = this.getElements('.w3-modal')[0];
        this.loadButton();
    }
    attachAttributesNLogic() {
        this.select.onchange = () => {
            this.model.step = this.select.value;
        }
    }
    loadButton() {
        this.addButton = this.getElements('.add')[0];
        this.closeButton = this.getElements('.close')[0];
        this.closeButton.onclick = () => {
            this.closeModal();
        }
        this.addButton.onclick = () => {
            this.dispatchEvent( new CustomEvent('add', {detail: this.model}));
            this.closeModal();
        }
    }
    closeModal() {
        this.modal.classList.remove('w3-show');
    }
    showModal() {
        this.modal.classList.add('w3-show');
    }
}