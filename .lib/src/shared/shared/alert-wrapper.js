import {AppAlert, AppToast} from "./index.js";
import {Core, addEl, messagesTypes, processMessages, DOMElement} from "../core/index.js";

export class AlertWrapper extends DOMElement {
    static get is() {
        return 'alert-wrapper'
    }

    HTML() {
        return `
<div class="w3-fixed w3-bottom w3-col s6 l2 m4 w3-padding w3-padding-24 w3-hide-small big">
</div>
<div class="w3-fixed w3-bottom w3-col s12 w3-hide-large w3-hide-medium"  >
</div>        
        `;
    }

    loadTargetElements() {
        this.containers = this.getElements('.w3-fixed');
        this.alertTemplate = addEl(AppAlert.is);
        this.toastTemplate = addEl(AppToast.is);
    }

    attachAttributesNLogic() {
        processMessages(this.messageCallback.bind(this));
    }

    messageCallback(event) {
        const alert = this.alertTemplate.cloneNode(true);
        const toast = this.toastTemplate.cloneNode(true);
        alert.header = event.detail.header;
        alert.message = event.detail.message;
        toast.message = event.detail.message;

        if (event.detail.type && Object.keys(messagesTypes).includes(event.detail.type)) {
            console.log(event.detail.type);
            alert.color = toast.color = messagesTypes[event.detail.type].class;
        }
        alert.addEventListener('closed', event => {
            this.containers[0].removeChild(event.target);
        });
        toast.addEventListener('closed', event => {
            this.containers[1].removeChild(event.target);
        })
        this.containers[0].appendChild(alert);
        this.containers[1].appendChild(toast);
    }
}



