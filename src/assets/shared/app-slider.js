import {Core, addEl, sliderAnimation} from '../core/index.js';

export class AppSlider extends Core {
    static get is() {
        return 'app-slider';
    }
    HTMLTemplate() {
        return `
<div class="w3-display-container slide-wrapper"></div>
`;
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.slideWrapper = this.getElements('.slide-wrapper')[0];
        /***
         * implementation is obselete
         */
         /// < obsolete>
        this.slidesJson = this.getAttribute('slides');
        if (this.slidesJson) {
            this.slidesData = JSON.parse(this.slidesJson);
            this.slides = []
            for (const slide of this.slidesData){
                this.slides.push(addEl('app-slide'));
            }
        }
        /// </ obsolete>
    }
    static get observedAttributes() {
        return ['src','slides', 'animate', 'config'];
    }
    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        if (this.slides && this.slides.length) {
            for (let slide = 0; slide < this.slides.length; slide++){
                this.slides[slide].setAttribute('src', this.slidesData[slide].src);
                this.slides[slide].setAttribute('text', this.slidesData[slide].text);
                this.slides[slide].classList.add('w3-hide');
                this.slideWrapper.appendChild(this.slides[slide]);
            }
            this.loop = sliderAnimation(this.slides,'w3-animate-left', 2000);
            this.loop.next();
        }
    }
    startLoop() {
        sliderAnimation(this.slides,'w3-animate-left', 2000);
        this.loop.next();
    }
    pauseLoop() {
        this.loop.return();
    }
    attributeChangedCallback(prop, oldV, newV) {
        if(prop==='slides')this.connectedCallback();
        if(prop==='animate'){
            if ((this.slides && this.slides.length) && newV) {
                this.startLoop()
            } else
            {
                this.pauseLoop();
            }
        }
    }

}
