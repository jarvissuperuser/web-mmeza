import {DOMElement} from "../core/index.js";

export class BinaryQuestion extends DOMElement {
    static get is() {return 'binary-question'}
    HTML() {
        return `<div class="w3-col w3-border">
    <div class="w3-col w3-padding">
        <p contenteditable="true" placeholder="Add a question">Add a question</p>
    </div>
    <div class="w3-col w3-grid w3-place-center">
        <div class="w3-col s12 m10">
            <select name="questionType" id="qType" class="w3-select">
                <option value="yesNo"> yes/no</option>
                <option value="trueFalse">true/false</option>
                <option value="multipleChoice">multiple choice</option>
                <option value="freeText">free typing</option>
            </select>
        </div>
    </div>
    <div class="w3-col">
        <div class="w3-col s6 w3-padding">
            <p class="w3-right">yes</p>
        </div>
        <div class="w3-col s6 w3-padding">
            <p class="">no</p>
        </div>
    </div>
</div>`;
    }
}
