import {Root} from '../root.js';
import {goto} from "../abstraction.js";

export class AppSlide extends Root {
    static get is() {
        return 'app-slide';
    }
    HTMLTemplate() {
        return `
<div class="w3-display-container vh-75">
  <img src="${this.getAttribute('src')}" alt="text" class="vh-75 slider-image" >
  <button class="w3-btn w3-display-middle w3-rainbow w3-hover-text-black w3-hover-orange w3-hide" >
    <span class=""><b>${this.getAttribute('text').toUpperCase()}</b></span>
  </button>
</div>
`;
    }
    loadSlots() {
        super.loadSlots();
        this.button = this.getElements('button')[0];
    }

    loadAttributes() {
        super.loadAttributes();
        this.text = this.getAttribute('text');
        this.link = this.getAttribute('link');
        if(this.text){this.button.classList.remove('w3-hide')}
        if (this.link) {
            this.button.click = () => {
                goto(this.getAttribute('link'));
            }
        }
    }
}
