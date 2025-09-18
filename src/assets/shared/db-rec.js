import { DOMElement, dateFormatter, currencyFormatter } from "../core/index.js";

export class DbRec extends DOMElement {
  static get is() {
    return "db-rec";
  }
  HTML() {
    return /* HTML */ `<div class="w3-bottombar slim w3-padding w3-col s12">
      <div class="w3-col s5"><span class="date">{{date}}</span></div>
      <div class="w3-col s5">
        <span class="amount float-right">{{amount}}</span>
      </div>
      <div class="w3-col s2">
        <span class="w3-tag w3-red float-right">&times;</span>
      </div>
    </div> `;
  }
  loadTargetElements() {
    if (!this.dto) {
      this.model = {};
      this.dto = {};
    }
    if (this.dto) {
      this.model = {};
      this.model.date = dateFormatter("short", "").format(this.dto.date); //this.model.date??Date.now()
      this.model.amount = currencyFormatter(this.dto.amount);
    }
    super.loadTargetElements();
  }
  async attachAttributesNLogic() {
    this.interpolate();
  }
}
