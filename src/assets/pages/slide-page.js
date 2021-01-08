import {Root} from "../common/root.js";
import {dataToEl} from "../common/abstraction.js";

export class SlidePage extends Root {
    static get is() {
        return 'slide-page';
    }
    HTMLTemplate() {
        return `
        <div class="w3-black vh-100">
        <app-slider></app-slider>
        </div>
        `;
    }
    loadSlots() {
        super.loadSlots();
        this.appSlider = this.getElements('app-slider')[0];
    }

    loadAttributes() {
        super.loadAttributes();
        dataToEl(this.appSlider,'slides', [
            {src:'assets/images/app-project-ui.jpg',text:'test'},
            {src:'assets/images/app-project-labrie.jpg',text:'test'},
            {src:'assets/images/app-project-lb.jpg',text:'test'},
            ]);
    }
}
