import {declarer} from '../core/index.js';
import {
    AppInput,
    AppNav,
    AppSlider,
    AppSlide,
    AppGallery,
    AppLayout,
    AppFullPage,
    AppPips,
    AppModal,
    AppQuantify,
    ImageCanvas,
    ShopCard,
    ArticleEditor,
    // CardComposer,
    CardPresent,
    CardWrapper
} from './index.js';

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
    AppQuantify,
    ImageCanvas,
    ShopCard,
    ArticleEditor,
    // CardComposer,
    CardPresent,
    CardWrapper
];

export const registerCommon = () => {
    declarer(commonComponents);
}
