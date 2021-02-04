import {declarer} from "./abstraction.js";
import {AppInput} from "./components/app-input.js";
import {AppNav} from "./components/app-nav.js";
import {AppSlider} from "./components/app-slider.js";
import {AppSlide} from "./components/app-slide.js";
import {AppPips} from "./components/app-pips.js";
import {AppLayout} from "./components/app-layout.js";
import {AppFullPage} from "./components/app-fullpage.js";
import {AppGallery} from "./components/app-gallery.js";
import {ImageCanvas} from "./components/image-canvas.js";
import {ArticleEditor} from "./components/article-editor.js";
import {CardComposer} from "./components/cards/card-composer.js";
import {CardWrapper} from "./components/cards/card-wrapper.js";
import {AppModal} from "./components/app-modal.js";

export const commonComponents = [
    AppInput,
    AppNav,
    AppSlider,
    AppSlide,
    AppGallery,
    AppLayout,
    AppFullPage,
    AppPips,
    AppModal,
    ImageCanvas,
    ArticleEditor,
    CardComposer,
    CardWrapper
];

export const registerCommon = () => {
    declarer(commonComponents);
}
