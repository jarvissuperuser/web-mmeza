import {Root} from "../root.js";

export class AppInput extends Root {
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

    loadSlots() {
        super.loadSlots();
        this.label = this.getElements('span.i-label')[0]
        this.input = this.getElements('input.w3-input')[0];
        this.attributeList.push('value');
        this.attributeList.push('label');
        this.attributeList.push('name');
    }
    loadAttributes() {
        super.loadAttributes();
        const {input, label} = this;

        input.onblur = event => {
            const value = event.target.value;
            this.setAttribute('value', value);
            if (!!value){
                label.classList.add('has-content');
            }else {
                label.classList.remove('has-content');
            }
        }
    }


}
