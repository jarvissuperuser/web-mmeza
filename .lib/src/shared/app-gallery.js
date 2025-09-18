import {Core, doc} from '../core/index.js';

export class AppGallery extends Core {
    static get is() {
        return 'app-gallery';
    }
    HTMLTemplate() {
        return `
<div class="w3-center">
<div class="gallery-container">
        <input type="radio" name="r-1" id="r-1" >
        <input type="radio" name="r-2" id="r-2">
        <input type="radio" name="r-3" id="r-3">
        <div class="slide">
        <img src="assets/images/app-project-ui.jpg" alt="" class="carousal-img">
        </div><div class="slide">
        <img src="assets/images/app-project-labrie.jpg" alt="" class="carousal-img">
        </div><div class="slide">
        <img src="assets/images/app-project-lb.jpg" alt="" class="carousal-img">
        </div>
    <div class="gallery-pips">
        <label for="r-1"></label>
        <label for="r-2"></label>
        <label for="r-3"></label>
    </div>
</div>
</div>
`;
    }
    static get observedAttributes() {
        return ['index', 'config'];
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.container = this.getElements('.gallery-container')[0];
        this.pips = this.getElements(".gallery-pips")[0];
        // this.pipWrapper = doc.createElement('div');
        this.pip = doc.createElement('div');
    }
    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        this.classList.add('w3-grid');
        const {pips, container, pip} = this;
    }
    loadStyle(styleFile = './styles.css') {
        super.loadStyle(styleFile);
        // this.setStyleFile(`./assets/css/${AppGallery.is}.css`);
        const style = `
@import '../../theme.css";
.gallery-container {
    display: flex;
    overflow: hidden;
    max-width: 768px;
}

.dynamic-width {
    display: flex;
    min-width: 300% !important;
    align-items: center;
}
.carousal-img {
    height: auto;
    max-width: 768px;
    object-fit: cover;
}
.gallery-container input {
    display: none;
}
.slide {
    max-width: 768px;
}
.overflow-hidden {
    overflow: hidden;
}
input:checked:nth-of-type(1) ~ .slide:nth-of-type(1) {
    margin-left: 0
}
input:checked:nth-of-type(2) ~ .slide:nth-of-type(1) {
    margin-left: -100%
}
input:checked:nth-of-type(3) ~ .slide:nth-of-type(1) {
    margin-left: -200%
}
input:checked:nth-of-type(4) ~ .slide:nth-of-type(1) {
    margin-left: 0
}
.gallery-pips {
    display: flex;
    position: absolute;
    width: 768px;
    justify-content: center;
    margin-top: 460px;
}
.gallery-pips label {
    border: var(--secondary-theme) 2px solid;
    padding: 5px;
    border-radius: 50%;
    cursor: crosshair;
    transition: .5s;
}

.gallery-pips label:not(:last-of-type) {
    margin-right: 7px;
}


`;
        this.setStyles(style);
    }

    attributeChangedCallback() {}

}
