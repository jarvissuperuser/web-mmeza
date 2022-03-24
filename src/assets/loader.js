/**
 * Loads Components and Pages
 * */
import {PageView} from './pages/page-view.js';
import {HomePage} from './pages/home-page.js';
import {SlidePage} from './pages/slide-page.js';
import {declarer} from './core/index.js';
import {EditorPage} from './pages/editor-page.js';
import {ComposePage} from './pages/compose-page.js';
import {ItemPage} from './pages/item-page.js';
import {ShopPage} from './pages/shop-page.js';


export const components = [
    HomePage,
    SlidePage,
    EditorPage,
    ComposePage,
    ShopPage,
    ItemPage,
    PageView,
];

export const registerPages = ()=>{
    declarer(components);
};
