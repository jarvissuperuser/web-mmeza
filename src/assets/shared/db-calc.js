import { DOMElement, inputMixin, addEl } from "../core/index.js";
import { DbRec } from "./db-rec.js";
export class DbCalc extends inputMixin(DOMElement) {
  static get is() {
    return "db-calc";
  }
  HTML() {
    return /* HTML */ `<div class="page">
			<div class="w3-col s12">
				<h1 class="w3-center">Simple Journal</h1>
			</div>
			<div class="w3-col s12 m4 w3-padding">
				<h4>Journal Entry</h4>
				<input
					class="w3-input"
					type="datetime-local"
					placeholder="Date"
				/><input
					class="w3-input"
					type="number"
					step="0.01"
					placeholder="Amount"
				/>
				<button type="button" class="w3-btn w3-teal w3-col" data-action="add">
					add record
				</button>
			</div>
			<div class="w3-col s12 m4 w3-padding data">
				<h4>Journal Records</h4>
			</div>
		</div> `;
  }
  loadTargetElements() {
    this.loadInputs();
    this.loadButtons();
    this.container = this.byId(".data");
    this.template = addEl(DbRec.is);
    this.model = {
      records: [],
    };
  }
  async attachAttributesNLogic() { }
  loadButtons() {
    this.buttons = this.getElements("button");
    Array.from(this.buttons).forEach((btn) => {
      if (btn.dataset.action == "add") {
        btn.onclick = () => {
          const values = Array.from(this.inputs).map((i) => i.value);
          const val = new InputRecord();
          val.date = values[0];
          val.amount = values[1];
          this.model.records.push(val.toJSON());
          Array.from(this.inputs).forEach((i) => (i.value = ""));
          this.addRec(val.toJSON());
        };
      }
    });
  }
  loadRecs() {
    this.recs = this.getElements(DbRec.is);
    Array.from(this.recs).forEach((r) => r.remove());
    this.model.records.forEach((r) => {
      const rec = this.template.cloneNode(true);
      rec.dto = r;
      this.container.append(rec);
    });
  }
  addRec(entry) {
    if (entry.amount && entry.date) {
      const rec = this.template.cloneNode(true);
      rec.dto = entry;
      this.container.append(rec);
    }
  }
}

class InputRecord {
  constructor() {
    this._date = new Date();
    this._amount = 0.0;
  }
  get date() {
    return this._date;
  }
  set date(value) {
    this._date = new Date(value);
  }
  get amount() {
    return this._amount;
  }
  set amount(value) {
    this._amount = parseFloat(value);
  }
  set(val = { amount: 0, date: new Date() }) {
    this._amount = val.amount;
    this.date = new Date(val.date);
  }
  toJSON() {
    return {
      amount: this._amount,
      date: this._date,
    };
  }
}
