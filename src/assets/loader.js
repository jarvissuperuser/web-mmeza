/**
 * Loads Components and Pages
 * */
import {PageView} from "./common/page-view.js";
import {HomePage} from "./pages/home-page.js";
import {SlidePage} from "./pages/slide-page.js";
import {declarer} from "./common/abstraction.js";


export const components = [
    HomePage,
    SlidePage,
    PageView,
];

export const registerPages = ()=>{
    declarer(components)
}
