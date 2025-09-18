import {DOMElement} from "../../core/index.js";

export class McSub extends DOMElement{
    static get is() {return 'mc-sub'}
    HTML() {
return `<div class="w3-col s12">
                <div class="w3-col s8">
                    <p>Add Response options</p>
                </div>
                <div class="w3-col s4 w3-padding">
                    <span class="w3-tag w3-teal w3-right btn plus">&plus;</span>
                </div>
            </div>
            
            <div class="w3-col s12">
            <ul class="w3-list"> 
                <li class="w3-padding">
                    <div class="w3-col s10 m11">
                        <input type="text" class="w3-input py-0" placeholder="possible response" aria-roledescription="response"> 
                    </div>
                    <div class="w3-col s2 m1 w3-padding pr-0 pt-0">
                        <span class="w3-badge w3-red w3-right pointer btn x">&times;</span> 
                    </div>
                </li>
            </ul>
            </div>`
    }
    loadTargetElements() {
        if (!this._responses) {
            this._responses = []
        }
        super.loadTargetElements();
        this.item = this.getElements("li")[0].cloneNode(true);
        this.list = this.getElements("ul")[0];
        //this.inputs = this.getElements("input");
        this.getElements("li")[0].remove();
        this.addRequirement = this.getElements(".plus")[0];
    }

    get responses() {
        return this._responses;
    }
    set responses(value) {
        this._responses = value;
        if (this._responses){
            this._responses.forEach(response => {
                if (this.item) {
                    const item = this.item.cloneNode(true);
                    this.itemAttach(item);
                    item.querySelector('input').value = response;
                }
            })
        }
    }
    attachAttributesNLogic() {

        const onBlur = e => {
            const {target} = e;
            this.inputs = this.getElements("input");
            this._responses = [];
            this.inputs.forEach(input => {
                this._responses.push(input.value);
            });
            this.dispatchEvent(new CustomEvent('options', {detail:{options: this.responses}}));
        }

        const itemRemove = e => {
            let {target} = e;
            while(target.nodeName.toLowerCase() !== "li") {
                target = target.parentNode;
            }
            target.remove();
        }
        this.itemAttach = (item) => {
            this.list.append(item);
            item.querySelector('.x').onclick = itemRemove;
            item.querySelector('input').onblur = onBlur;
        }
        this.itemAdd = () => {
            const item = this.item.cloneNode(true);
            this.itemAttach(item);
            item.querySelector('input').focus();
        }
        //this.inputs.forEach(input => {input.onblur = onBlur;})
        this.addRequirement.onclick = this.itemAdd



    }

}