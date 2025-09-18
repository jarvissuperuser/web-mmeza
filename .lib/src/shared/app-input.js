import {DOMElement} from '../core/core.js';

export class AppInput extends DOMElement {
    static get is() {
        return 'app-input';
    }
    HTML() {
        return `
<label title="${this.getAttribute('title')?? 'Enter ' + this.getAttribute('label')}" class="primary">
    <input 
    name="${this.getAttribute('name')}"
    type="${this.getAttribute('type') ?? 'text'}"
    class="w3-input primary w3-border-0 w3-border-bottom w3-hover-border-blue w3-padding-mobile">
    <span class="i-label">${this.getAttribute('label').trim()}</span>        
</label>
        `;
    }
    loadStyle(styleFile = './styles.css') {
        //super.loadStyle(styleFile);
        const style =`
        /*@import url("style.css");*/
        .primary{color: var(--primary-contrast);background-color:var(--primary-theme)}
        .secondary{color: var(--secondary-contrast);background: var(--secondary-theme)}
        .tertiary{color: var(--tertiary-contrast);background:var(--tertiary-theme)}
        input.w3-input + span.i-label {
          position: absolute;color: var(--label-grey);transform: translateY(-1.7rem) translateX(0.5rem);
          transition: all ease-in-out .3s;transform-origin: left;
        }
        input.w3-input:focus + span.i-label {transform: translate(0.5rem, -3.6rem) scale(.8);}
        input.w3-input{ color: var(--primary-contrast);margin-top:32px}
        input.w3-input:focus { outline:none; border-bottom-color: var(--tertiary-contrast) !important; color: var(--primary-contrast)!important}
        span.i-label.has-content {transform: translate(0.5rem, -3.6rem) scale(.8) !important;transform-origin: left;}
        @media (max-width:600px) {
          .w3-padding-mobile {padding-top: 28px}
        }
        @media (min-width:601px) {
          .w3-padding-mobile {padding-top: 24px}
        }
        input:-internal-autofill-selected,
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
            background-color: #101727 !important;
            color: -internal-light-dark(white,#101727) !important;
            -webkit-text-fill-color: var(--primary-theme);
            -webkit-box-shadow: 0 0 0px 1000px #101727 inset;
            caret-color: white;
        }
        .w3-input{
            padding:8px;display:block;border:none;border-bottom:1px solid var(--label-grey);width:100%;
            background: var(--primary-theme);
        }
        .w3-hover-border-blue:hover,:focus {border-color:#2196F3!important}
        
        `;
        this.setStyles(style);
    }

    loadTargetElements() {
        super.loadTargetElements();
        this.loadStyle();
        this.label = this.getElements('span.i-label')[0]
        this.input = this.getElements('input.w3-input')[0];
        this.attributeList.push('value');
        this.attributeList.push('label');
        this.attributeList.push('name');
        this.blurred = new CustomEvent('blur');
        this.inputChanged = new CustomEvent('inp');
    }
    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        const {input, label} = this;

        input.onblur = event => {
            const value = event.target.value;
            this._val = value;
            this.setAttribute('value', value);
            if (!!label)
            if (!!value){
                label.classList.add('has-content');
            }else {
                label.classList.remove('has-content');
            }
            this.dispatchEvent(this.blurred);
        }
        input.oninput = event => {
            const value = event.target.value;
            this._val = value;
            this.setAttribute('value', value);
            this.dispatchEvent(this.inputChanged);
            if (!!label)
                if (!!value){
                    label.classList.add('has-content');
                }else {
                    label.classList.remove('has-content');
                }

        }
    }
    get value() {
        return this._val;
    }
    set value(val) {
        this._val = val
        this.input.value = val;
        if (this._val){
            this.label.classList.add('has-content');
        }else {
            this.label.classList.remove('has-content');
        }
    }


}
