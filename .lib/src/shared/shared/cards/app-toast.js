import {AppAlert} from "./app-alert.js";

export class AppToast extends AppAlert{
    static get is() { return 'app-toast'}
    HTMLTemplate() {
        return `
<div class="w3-card w3-margin w3-animate-bottom">
    <div class="w3-padding w3-text-white">
      <p>{{alert.message}}</p>
    </div>
</div>        
        `;
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.closeButton = this.cardElement;
    }
}
