import {declarer} from "./abstraction.js";
import {AppInput} from "./components/app-input.js";
import {AppNav} from "./components/app-nav.js";
import {AppSlider} from "./components/app-slider.js";
import {AppSlide} from "./components/app-slide.js";

export const commonComponents = [
    AppInput,
    AppNav,
    AppSlider,
    AppSlide,
];

export const registerCommon = () => {
    declarer(commonComponents);
}
