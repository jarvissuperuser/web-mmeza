import {Core, messagesTypes} from '../../core/index.js';

export class AppAlert extends Core{
    static get is() { return 'app-alert';}
    HTMLTemplate() {
        return `
<div class="w3-card w3-margin w3-animate-zoom">

    <div class="w3-row "><h4 class="w3-left w3-padding">Alert </h4><button class="w3-btn w3-small w3-right">&times;</button></div>
    <div class="w3-padding">
        <p>Hello World</p>
    </div>

</div>
        `;
    }
    loadTargetElements() {
        this.cardElement = this.getElements('.w3-card')[0];
        this.headerElement = this.getElements('h4')[0];
        this.messageElement = this.getElements('p')[0];
        this.closeButton = this.getElements('button')[0];
        this.closed = new CustomEvent('closed');
    }
    attachAttributesNLogic() {
        if(this.headerElement) {
            this.headerElement.innerText = this.header;
        }
        this.messageElement.innerText = this.message;
        this.cardElement.classList.add(this.color);
        this.closeButton.onclick = () => {this.dispatchEvent(this.closed);}
    }

    get color() {
        return this._color ?? messagesTypes.info.class;
    }
    set color(c) {
        this._color = c;
    }
    get header () {
        return this._header ?? 'Alert: info';
    }
    set header(h) {
        this._header = h;
    }
    get message () {
        return this._message ?? 'New Alert';
    }
    set message(h) {
        this._message = h;
    }
}
