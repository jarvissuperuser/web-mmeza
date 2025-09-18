import {DOMElement, modelMixIn, StepBase, stepMixin, uuid, win} from "../core/index.js";
import {Step, Quiz} from "./index.js";

export class QuestionnaireCard extends stepMixin(DOMElement){
    static get is() {return "questionnaire-card"}
    HTML() {
        return `<div class="w3-padding">
        <h3 class="w3-text-dark-gray"> Step <span id="idx">{{index}}</span> </h3>
    <div class="w3-border w3-border-gray w3-padding w3-padding-32 w3-col s12 w3-round w3-round-xlarge" >
        <span class="w3-right w3-text-large pointer w3-tag bg-theme w3-text-red close">&times;</span>
        <h4 class="w3-text-gray w3-padding">{{QuestionnaireTitle}}</h4>
        <p  class="w3-text-gray w3-padding">{{Description}}</p>
    <div class="w3-col pointer">
        <div class="w3-col s12 w3-center">
            <button class="w3-btn w3-theme-accent-1">Compose</button>
        </div>
    </div>
    </div>    
        </div>`;
    }

    loadTargetElements(){
        this.zoneClick = this.getElements('input[type=file]')[0];
        this.uploadElement = this.getElements('.click');
        this.composeButton = this.getElements('button')[0];
        this.close = this.getElements('.close')[0];
        this.stepNum = this.getElements('span#idx')[0];
        this.loadIndex();
        this.stepIdx = this.model.index;
        this.model.stepType = QuestionnaireCard.is;
        super.loadTargetElements();
        this.loadModel().then();
    }

    async loadModel(){
        /**
         * @const {Quiz[]} step
         * */
        const step = await win.crud().read('questionnaires', ['stepId', '==', this.model.id]);
        console.log({step})
        if (step.length) {
            const q = step[0];
            const GREY = 'w3-text-gray';
            const titleEl = this.getElements('h4')[0];
            const description = this.getElements('p')[0];
            titleEl.textContent = q.title;
            description.textContent = q.description;
            titleEl.classList.remove(GREY);
            description.classList.remove(GREY);
            this.qId = q.id;
        }
    }
    attachAttributesNLogic() {
        this.composeButton.onclick =() => {
            const composeState = this.qId? this.qId: 'new';
            location.hash = `#create-quiz/${composeState}/${this.model.id}/${this.model.createId}`
        }

        super.attachAttributesNLogic();
    }

}
