import {Root} from '../root.js';
import {addEl,dataToEl} from "../abstraction.js";

export class AppSlider extends Root {
    static get is() {
        return 'app-slider';
    }
    HTMLTemplate() {
        return `
<div class="w3-display-container slide-wrapper"></div>
`;
    }
    loadSlots() {
        super.loadSlots();
        this.slideWrapper = this.getElements('.slide-wrapper')[0];
        this.slidesJson = this.getAttribute('slides');
        if (this.slidesJson) {
            this.slidesData = JSON.parse(this.slidesJson);
            this.slides = []
            for (const slide of this.slidesData){
                this.slides.push(addEl('app-slide'));
            }
        }
    }
    static get observedAttributes() {
        return['src','slides'];
    }
    loadAttributes() {
        super.loadAttributes();
        if (this.slides && this.slides.length) {
            for (let slide = 0; slide < this.slides.length; slide++){
                this.slides[slide].setAttribute('src', this.slidesData[slide].src);
                this.slides[slide].setAttribute('text', this.slidesData[slide].text);
                this.slides[slide].classList.add('w3-hide');
                this.slideWrapper.appendChild(this.slides[slide]);
            }
        }
    }

    attributeChangedCallback(prop, newVal, old) {
        if(prop==='slides')this.connectedCallback();
    }

}
