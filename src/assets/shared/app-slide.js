import {Core, goto} from '../core/index.js';

export class AppSlide extends Core {
    static get is() {
        return 'app-slide';
    }
    HTMLTemplate() {
        return `
<div class="w3-display-container vh-75">
  <img src="${this.getAttribute('src')}" alt="text" class="vh-75 slider-image" >
  <button class="w3-btn w3-display-middle w3-rainbow w3-hover-text-black w3-hover-orange w3-hide" >
    <b><span class="">{{text}}</span><b>
  </button>
</div>
`;
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.button = this.getElements('button')[0];
        this.image = this.getElements('img')[0];
        this.text = this.getAttribute('text')??'slide';
    }

    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        this.link = this.getAttribute('link');
        this.image.src = this.getAttribute('src');
        if(this.text){this.button.classList.remove('w3-hide')}
        if (this.link) {
            this.button.click = () => {
                goto(this.getAttribute('link'));
            }
        }
    }
}
