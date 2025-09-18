import {addEl, DOMElement, modelMixIn, } from "../core/index.js";
import {Question} from "./models/question-model.js";

export class QuestionTemplate extends modelMixIn(DOMElement){
    static get is() {return'question-template'}

    HTML() {
       return `<div class="w3-col s12 w3-padding w3-border">
    <div class="w3-col s12">
        <div class="w3-right w3-tag bg-theme w3-text-red close">&times;</div>
        <!--<div class="w3-padding">
            <input type="text" class="w3-input" placeholder="Type a question here">
        </div> -->
        <h4 contenteditable="true" placeholder="Type a question here" name="question">Type a question here</h4>
    </div>
    <div class="w3-col s12">
        <div class="w3-col s12 m10 offset-1">
            <select name="answerType" id="qType" class="w3-select">
                <option value="none">Select Question Type</option>
                <option value="yesNo"> yes/no</option>
                <option value="trueFalse">true/false</option>
                <option value="multipleChoice">multiple choice</option>
                <option value="numberField">number field</option>
                <option value="freeText">free typing</option>
            </select>
        </div>
    </div>
    <div class="w3-col w3-grid w3-place-center preview">
    </div>
</div>`
    }
    loadTargetElements() {
        const {model, dataset} = this;
        const {questionType, idx, id, question} = dataset;

        this.previewContainer =this.getElements('.preview')[0];
        this.questionType =this.getElements('[name=answerType]')[0];

        this.yesNo = addEl('yn-sub');
        this.trueFalse =  addEl('tf-sub');
        this.multipleChoice = addEl('mc-sub');
        this.numberField = addEl('num-sub');
        this.freeText = addEl('txt-sub');
        this.close =this.getElements(".close")[0];
        if (model){
            this.options = model.responseOptions
            this.responseType = model.questionType;
            this.getElements('[contenteditable]')[0].textContent = model.question;
            this.dataModel = this.model
        }
        if (!this.model) {
            this.model = new Question();
            this.model.questionType = questionType;
            this.model.responseOptions = this.options;
            this.model.index = parseInt(idx);
            this.model.id = id;
            this.model.question =  question;
        }
        super.loadTargetElements();
    }
    attachAttributesNLogic() {
        const {questionType, question} = this.dataset
        this.questionType.onchange = event => {
            const {target} = event;
            this.previewContainer.innerHTML = "";
            this.previewContainer.appendChild(this[target.value]);
            this.activeSub = this[target.value]
            this.responseType = target.value;
            this._options = this.activeSub.responses ? this.activeSub.responses: [];
            this.dispatchEvent(
                new CustomEvent('question',
                    {detail:{questionType: target.value, options: this._options, model : this.model}}
                )
            );

        }
        this.multipleChoice.addEventListener('options', e => {
            const v = this.querySelector('h4').textContent;
            this.model.responseOptions = e.detail.options;
            this.model.question = v;
            this.dispatchEvent(
                new CustomEvent('question',
                    {detail:{questionType: this.dataset.questionType,options:e.detail.options, question:v, model: this.model}}))
        } );
        this.close.onclick = () =>  {this.dispatchEvent(new CustomEvent('close', {detail:{}}))}
        if (questionType) {
            this.previewContainer.appendChild(this[questionType]);
            this.questionType.value = questionType;
            console.log({options: this.model.responseOptions})
            if (!!this[questionType].responses) this[questionType].responses = this.model.responseOptions;
            this.cin.forEach(i => {
                if (i.getAttribute('name') === 'question' && !!question) {
                    i.textContent = question;
                }
            })
            this.activeSub = this[questionType];
        }

        //console.log({inputs: this.cin})
    }
    get options() {
        this._options = !!this.activeSub && !!this.activeSub.responses? this.activeSub.responses : []
        return this._options;
    }
    set options(value) {
        this._options = value;
        if (!!this.multipleChoice && !!this.multipleChoice.responses) {
            this.multipleChoice.responses = value;
        }

    }

    set responseType(value) {
        if (this.questionType)
        this.questionType.value = value;
        this.dataset.questionType = value;
        if(this.model) this.model.questionType = value;
    }

    /**
     * @param {Question} value
     * */
    set dataModel(value) {
        this.dataset.idx = value.index
        this.dataset.id = value.id
        this.dataset.question = value.question;
        this.dataset.questionType = value.answerType
    }
}
/*

* */