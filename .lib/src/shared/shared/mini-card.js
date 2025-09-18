import {DOMElement, modelMixIn} from "../core/index.js";
import {MiniModel} from "./index.js";

export class MiniCard extends modelMixIn(DOMElement){
    static get is() {return 'mini-card'}
    HTML() {
        return `
<div class="w3-padding w3-col s6 m3">
    <div class="w3-card w3-padding w3-teal w3-round w3-round-large">
        <h3><span>{{title}}</span></h3>
        <p class="tx-of"><span>{{detail}}</span></p>
    </div>
</div>
        `
    }
    attachAttributesNLogic() {
        if (!this.model) {
            this.model = new MiniModel();
        }
        this.interpolate(false);
    }


}
