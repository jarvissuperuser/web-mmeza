import {Root} from "../../root.js";

export class CardWrapper extends Root{
    static get is() {
        return 'card-wrapper'
    }
    HTMLTemplate() {
        return `
<div class="w3-card w3-col s12 m3 l3 w3-round w3-dark-gray">
    <div class="w3-center">
        <div class="w3-row w3-jumbo w3-padding">
            <button class="w3-button w3-circle box w3-pale">+</button>
        </div>
        <div class="w3-padding"> <span class="">Add To Shop</span></div>
    </div>
</div>
<app-modal showing="true"></app-modal>          
        `;
    }
    loadStyle(styleFile = './styles.css') {
        super.loadStyle(styleFile);
        const styles = `.box { height: 112px; width: 112px }`
        this.setStyles(styles);
    }

}
