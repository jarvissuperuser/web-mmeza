import {Root} from "../root.js";
import {doc} from "../abstraction.js";

export class AppGallery extends Root {
    static get is() {
        return 'app-gallery';
    }
    HTMLTemplate() {
        return `
<div class="gallery-container w3-col s12">
    <div class="gallery-pips"></div>
</div>
`;
    }
    static get observedAttributes() {
        return ['index', 'config'];
    }
    loadSlots() {
        super.loadSlots();
        this.container = this.getElements('.gallery-container')[0];
        this.pips = this.getElements(".gallery-pips")[0];
        // this.pipWrapper = doc.createElement('div');
        this.pip = doc.createElement('div');
    }
    loadAttributes() {
        super.loadAttributes();
        this.classList.add('w3-grid');
        const {pips, container, pip} = this;
    }
    loadStyle(styleFile = './styles.css') {
        super.loadStyle(styleFile);
        this.setStyleFile(`./assets/css/${AppGallery.is}.css`);
    }

    attributeChangedCallback() {}

}
