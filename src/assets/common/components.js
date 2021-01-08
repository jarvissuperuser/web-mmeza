import {declarer} from "./abstraction.js";
import {AppInput} from "./components/app-input.js";
import {AppNav} from "./components/app-nav.js";
import {AppSlider} from "./components/app-slider.js";
import {AppSlide} from "./components/app-slide.js";
import {AppPips} from "./components/app-pips.js";
import {AppLayout} from "./components/app-layout";
import {AppFullPage} from "./components/app-fullpage";

export const commonComponents = [
    AppInput,
    AppNav,
    AppSlider,
    AppSlide,
    AppLayout,
    AppFullPage,
    AppPips,
];

export const registerCommon = () => {
    declarer(commonComponents);
}
