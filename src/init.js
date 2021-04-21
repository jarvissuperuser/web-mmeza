import {registerPages} from './assets/loader.js';
import {registerCommon} from './assets/shared/components.js';
import {win,doc} from './assets/core/index.js';
import {init, resolvePath} from './assets/core/index.js';

// registerComponents
registerCommon();
registerPages();

// win.onload = () => {
//     console.log('loaded')
//     let route = hash().split('/')[1];
//     if ((location.hash.indexOf('home/page')>0) || (!route)) {
//         navigate('home');
//         return;
//     }
//     navigate(route);
// }

doc.addEventListener('DOMContentLoaded', resolvePath);

// win.onpopstate = resolvePath;

win.onhashchange = init;

