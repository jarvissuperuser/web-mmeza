import {addEl, currencyFormatter, DOMElement, modelMixIn} from "../core/index.js";
import {TableModel, TableRow} from "./index.js";

/**
 * @mixin modelMixin
 * @extends DOMElement
 * @property {TableRow} trTemplate
 * @property {TableModel} _model
 * @method interpolate
 * */
export class TableBody extends modelMixIn(DOMElement) {
    static get is() {return 'table-body'}
    HTML() {
        return `

<div class="tbody">
</div>
<div class="w3-row">
    
    <div class="w3-black w3-col s2 w3-right w3-padding"><span>{{total}}</span></div> 
    <div class="w3-black w3-col s2 w3-right w3-padding"><b>TOTAL</b></div> 
</div>       
        `;
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.container = this.getElements('div.tbody')[0];
        this.trTemplate = addEl(TableRow.is);
        this.trList = [];
    }
    attachAttributesNLogic() {
        if (!this.model) {
            this.model = new TableModel()
        }
        this.mkTableRows()
        this.sumOfRows();
        this.interpolate()
    }
    mkTableRows() {
        if (this.model) {
            this.model.tableRows.forEach((row, ix) => {
                const tr = this.trTemplate.cloneNode(true);
                tr.model = row;
                tr.model.position = ix + 1;
                this.trList.push(tr);
            })
        }
        this.trList.forEach(r => {
            this.container.append(r);
        })
    }
    sumOfRows() {
        this.model.total = 0.001;
        this.model.tableRows.forEach(this.rowSum.bind(this));
        this.model.total = currencyFormatter(this.model.total);
    }
    /**
     * @param {RowModel} row
     * */
    rowSum(row) {
        this.model.total += (row.unitPrice * row.quantity);
    }
}
