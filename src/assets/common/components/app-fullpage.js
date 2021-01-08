import {Root} from "../root.js";
import {doc} from "../abstraction.js";
import {pages}  from "../../js/data/page-data.json";

export class AppFullPage extends Root {
    static get is() {
        return 'app-fullpage';
    }
    HTMLTemplate() {
        return `
<div class="pg-container">
</div>
        `;
    }
    loadSlots() {
        super.loadSlots();
        this.container = this.getElements('.pg-container');
        this.pageTemplate = doc.createElement('app-layout');
    }
    loadAttributes() {
        super.loadAttributes();
    }


}
