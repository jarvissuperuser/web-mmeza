import {Core} from '../core/core.js';

export class AppInput extends Core {
    static get is() {
        return 'app-input';
    }
    HTMLTemplate() {
        return `
<label title="${this.getAttribute('title')}" class="primary">
    <input type="text" 
    name="${this.getAttribute('name')}"
   
    class="w3-input primary w3-border-0 w3-border-bottom w3-hover-border-blue w3-padding-mobile">
    <span class="i-label">${this.getAttribute('label')}</span>        
</label>
        `;
    }
    loadStyle(styleFile = './styles.css') {
        super.loadStyle(styleFile);
        const style =`
         @import "${this.themeFile}";
        .primary{color: var(--primary-contrast);background:var(--primary-theme)}
        .secondary{color: var(--secondary-contrast);background: var(--secondary-theme)}
        .tertiary{color: var(--tertiary-contrast);background:var(--tertiary-theme)}
        input.w3-input + span.i-label {
          position: absolute;
          color: #AAA;
          transform: translateY(-1.5rem);
          transition: all ease-in-out .3s;
        }
        input.w3-input:focus + span.i-label {
          transform: translate(-0.5rem, -3.6rem) scale(.8);
        }
        input.w3-input{ color: var(--primary-contrast);}
        input.w3-input:focus { outline:none; border-bottom-color: var(--tertiary-theme) !important; color: white!important}
        span.i-label.has-content {
            transform: translate(-0.5rem, -3.6rem) scale(.8) !important;
        }
        @media (max-width:600px) {
          .w3-padding-mobile {padding-top: 28px;}
        }
        @media (min-width:601px) {
          .w3-padding-mobile {
            padding-top: 24px;
          }
        }
        `;
        this.setStyles(style);
    }

    loadTargetElements() {
        super.loadTargetElements();
        this.label = this.getElements('span.i-label')[0]
        this.input = this.getElements('input.w3-input')[0];
        this.attributeList.push('value');
        this.attributeList.push('label');
        this.attributeList.push('name');
        this.blurred = new CustomEvent('blur');
    }
    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        const {input, label} = this;

        input.onblur = event => {
            const value = event.target.value;
            this._val = value;
            this.setAttribute('value', value);
            if (!!value){
                label.classList.add('has-content');
            }else {
                label.classList.remove('has-content');
            }
            this.dispatchEvent(this.blurred);
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
