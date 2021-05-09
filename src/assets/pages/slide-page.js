import {Core, dataToEl} from '../core/index.js';

export class SlidePage extends Core {
    static get is() {
        return 'slide-page';
    }
    HTMLTemplate() {
        return `
        <div class="w3-black vh-100">
            <div class="w3-container">
                <div class="w3-content">
                </div>
            </div>
        <app-slider></app-slider>
            <div class="w3-container w3-content">
                <div class="w3-center">
                <app-gallery></app-gallery>
                </div>
            </div>
        </div>
        `;
    }

    loadTargetElements() {
        super.loadTargetElements();
        this.appSlider = this.getElements('app-slider')[0];
    }

    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        dataToEl(this.appSlider,'slides', [
            {src:'assets/images/app-project-ui.jpg',text:'Hello'},
            {src:'assets/images/app-project-labrie.jpg',text:'Hi'},
            {src:'assets/images/app-project-lb.jpg',text:'What'},
            ]);
    }
}
