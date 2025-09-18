import {DOMElement,modelMixIn, addEl, win} from "../core/index.js";

export class AccessAccordion extends modelMixIn(DOMElement){
    static get is() {return 'access-accordion'}

    HTML() {
        return `<div class="w3-bottombar slim w3-border-white">
    <button class="w3-btn w3-block w3-gray w3-left-align w3-hover-dark-gray w3-hover-text-white">
        
        <span class="w3-center" >&#x273A;</span>
        <span class="w3-padding w3-hide-small">{{department}}</span>
        <span class="w3-padding">{{fullName}}</span>
        <span class="w3-padding w3-hide-small">{{accessLevel}}</span>
        <span class="w3-right">&dtri;</span>
    </button>
    <div class="w3-container w3-hide w3-padding w3-dark-gray w3-animate-opacity" id="cont">
        <div class="w3-col s12 m4 w3-padding">
        <div class="w3-center img-c"></div>
        </div>
        <div class="w3-col s12 m8 w3-padding" id="detail">
        </div>
    </div>
</div>`
    }
    loadTargetElements() {
        if (!this.model) {
            this.model = {
                fullName: 'Help',
                accessLevel: 'Full',
                department: 'Security',
            }
        }
        this.button = this.byId('button');
        this.content = this.byId('#cont');
        this.detail = this.byId('#detail');
        this.readyIndicator = this.getElements('span.w3-center')[0];
        this.answerTemplate = addEl('p');
        this.picContainer = this.getElements('div.img-c')[0];
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
            if (model.details) {
                model.details.forEach(answer => {
                    if (!['picSrc'].includes(answer.t)) {
                        const answerEl = this.answerTemplate.cloneNode(true);
                        const idx = addEl('span');
                        const resp = addEl('span');
                        answerEl.classList.add('w3-block');
                        resp.classList.add('w3-right', 'tx-clip');
                        answerEl.appendChild(idx);
                        answerEl.appendChild(resp);
                        resp.innerText = answer.d;
                        idx.innerText = answer.t;
                        this.detail.appendChild(answerEl);
                    } else if (['picSrc'].includes(answer.t)){
                        win.crud().blobGet(answer.d).then(imgBlob => {
                            const url = URL.createObjectURL(imgBlob);
                            const pic =  addEl('img');
                            pic.onload = () => {
                                URL.revokeObjectURL(url)
                            };
                            pic.src = url;
                            pic.classList.add('w3-image');
                            pic.width = 1024;
                            pic.height = 1024;
                            this.picContainer.appendChild(pic);
                        });
                    }
                });
                this.isReady = true;
                this.isReady? this.readyIndicator.classList.add('w3-text-teal'): this.readyIndicator.classList.add('w3-text-orange');
            }
        }
        this.interpolate();
    }
}
