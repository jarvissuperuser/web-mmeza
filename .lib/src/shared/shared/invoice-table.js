import {addEl, DOMElement, modelMixIn} from "../core/index.js";
import {RowModel, TableBody, TableModel} from "./index.js";

/**
 * @extends DOMElement
 * @extends modelMixIn
 * */
export class InvoiceTable extends modelMixIn(DOMElement){
    static get is() {return 'invoice-table';}
    HTML() {
        return `
<div class="w3-col s12 tbl"> 
    <table-head></table-head>
</div>
        `;
    }
    loadTargetElements() {
        this.table = this.getElements('div.tbl')[0];
        this.tbody = addEl(TableBody.is)
    }
    attachAttributesNLogic() {
        this.tbody.model = this.model ?? new TableModel();
        if (this.tbody.model.tableRows.length === 0) {
            this.tbody.model.tableRows.push(new RowModel());
            this.tbody.model.tableRows.push(new RowModel());
            this.tbody.model.tableRows.push(new RowModel());
        }
        this.table.appendChild(this.tbody);
    }
}
