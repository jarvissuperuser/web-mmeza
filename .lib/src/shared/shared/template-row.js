import {DOMElement, modelMixIn} from "../core/index.js";
import {TableModel} from "./models/table-model.js";


export class TemplateRow extends modelMixIn(DOMElement) {
    static get is() {
        return 'template-row'
    }

    HTML() {
        return `

<div class="w3-col s4 w3-padding ">
     <span>{{title}}</span>
</div> 
<div class="w3-col s4 w3-padding ">
    <span>{{docType}}</span>
</div>
<div class="w3-col s4 w3-padding ">
    <span>{{author}}</span>
</div> 
     
        `;
    }

    attachAttributesNLogic() {
        if (!this.model) {
            this.model = new TableModel();
        }
        this.interpolate();
    }
}
