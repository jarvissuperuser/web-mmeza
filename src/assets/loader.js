/**
 * Loads Components and Pages
 * */
import {PageView} from "./common/page-view.js";
import {HomePage} from "./pages/home-page.js";
import {declarer} from "./common/abstraction.js";


export const components = [
    HomePage,
    PageView,
];

export const registerPages = ()=>{
    declarer(components)
}
