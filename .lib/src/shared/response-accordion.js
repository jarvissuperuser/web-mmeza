import {DOMElement,modelMixIn, addEl} from "../core/index.js";

export class ResponseAccordion extends modelMixIn(DOMElement){
    static get is() {return 'response-accordion'}

    HTML() {
        return `<div class="w3-bottombar slim w3-border-white">
    <button class="w3-btn w3-block w3-gray w3-left-align w3-hover-dark-gray w3-hover-text-white">
        
        <span class="w3-center" >&#x273A;</span>
        <span class="w3-padding">{{voucher}}</span>
        <span class="w3-padding">{{phoneNumber}}</span>
        <span class="w3-right">&dtri;</span>
    </button>
    <div class="w3-container w3-hide w3-padding w3-dark-gray w3-animate-opacity" id="cont">
    </div>
</div>`
    }
    loadTargetElements() {
        if (!this.model) {
            this.model = {
                fullName: 'Help',
                answer: 'Yes Ready!'
            }
        }
        this.button = this.byId('button');
        this.content = this.byId('#cont');
        this.readyIndicator =  this.getElements('span.w3-center')[0];
        this.answerTemplate = addEl('p');
        super.loadTargetElements();

    }

    attachAttributesNLogic(){
        super.attachAttributesNLogic();
        const {model} = this;
        this.button.onclick = () => {
            this.content.classList.contains('w3-hide')?
                this.content.classList.remove('w3-hide'):
                this.content.classList.add('w3-hide');
        }
        if (model) {
            if (model.answerList) {
                model.answerList.forEach((answer) => {
                    const answerEl =  this.answerTemplate.cloneNode(true);
                    const idx =  addEl('span');
                    const resp = addEl('span');
                    answerEl.classList.add('w3-block');
                    resp.classList.add('w3-right');
                    answerEl.appendChild(idx);
                    answerEl.appendChild(resp);
                    resp.innerText = answer.response;
                    idx.classList.add('w3-text-blue');
                    idx.innerText = `${answer.questionIndex - -1}. ${answer.question} `;
                    this.content.appendChild(answerEl);
                });
                this.isReady = model.answerList.filter(a => a.questionIndex === 4).some(a => a.response === 'yes');
                this.isReady? this.readyIndicator.classList.add('w3-text-teal'): this.readyIndicator.classList.add('w3-text-orange');
                
            
            }
        }
        this.interpolate();
    }
}
