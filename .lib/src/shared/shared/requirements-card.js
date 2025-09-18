import { StepBase} from "../core/index.js";

export class RequirementsCard extends StepBase {
    static get is() {return 'requirements-card'}

    HTML() {
        return `<div class="w3-padding">
        <h3 class="w3-text-dark-gray">Step <span id="idx">{{index}}</span></h3>
        <div class="w3-border w3-border-gray w3-padding w3-padding-32 w3-col s12 w3-round w3-round-xlarge">
              
            <h4>Requirements <span class="w3-right w3-tag bg-theme w3-text-red close">&times;</span> </h4>
            <textarea class="w3-col w3-round w3-round-large" placeholder="Add a description"></textarea>
            <div class="w3-row">
                <div class="w3-col s8">
                    <h5>Checklist</h5>
                </div>
                <div class="w3-col s4 w3-padding">
                    <span class="w3-tag w3-teal w3-right btn plus">&plus;</span>
                </div>
            </div>
            <ul class="w3-list"> 
                <li class="w3-padding">
                    <div class="w3-col s10 m11">
                        <input type="text" class="w3-input py-0" placeholder="requirement item"> 
                    </div>
                    <div class="w3-col s2 m1 w3-padding pr-0 pt-0">
                        <span class="w3-badge w3-red w3-right pointer btn x">&times;</span> 
                    </div>
                </li>
            </ul>
        </div>
        </div>`;
    }

    loadTargetElements() {
        this.loadIndex();
        if(!this.model.data.rList){
            this.model.data.rList = [];
            this.model.stepType = RequirementsCard.is;
        }
        //this.inputs = this.getElements("input");
        this.item = this.getElements("li")[0].cloneNode(true);
        this.textArea = this.getElements('textarea')[0]
        this.list = this.getElements("ul")[0];
        this.getElements("li")[0].remove();
        this.addRequirement = this.getElements(".plus")[0];
        this.close = this.getElements('.close')[0];
        this.stepIdx = this.model.index;
        // this.remove = this.getElements(".x");
        super.loadTargetElements();
    }
    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        const onBlur = e => {
            const {target} = e;
            this.inputs = this.getElements("input");
            this.model.data.description = this.textArea.value;
            this.model.data.rList = []
            this.inputs.forEach(input => {
                this.model.data.rList.push(input.value);
            });
            this.dispatchEvent( new CustomEvent('model', {detail: this.model}))
        }

        const itemRemove = e => {
            let {target} = e;
            while(target.nodeName.toLowerCase() !== "li") {
                target = target.parentNode;
            }
            target.remove();
        }
        this.loadModel(itemRemove,onBlur);
        this.textArea.onblur = onBlur;
        this.addRequirement.onclick = () => {
            const item = this.item.cloneNode(true);
            this.list.append(item);
            item.querySelector('.x').onclick = itemRemove;
            item.querySelector('input').onblur = onBlur;
            item.querySelector('input').focus();
        }
    }

    loadModel(itemRemove,onBlur){
        if(!!this.model.data.rList){
            for (const rListElement of this.model.data.rList) {
                const item = this.item.cloneNode(true);
                this.list.append(item);
                item.querySelector('.x').onclick = itemRemove;
                item.querySelector('input').onblur = onBlur;
                item.querySelector('input').value = rListElement;

            }
        }
    }

}
