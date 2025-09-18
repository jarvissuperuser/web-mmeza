import {registerComponents, pages, shared} from './assets/loader.js';
import {win,doc} from './assets/core/index.js';
import {init, resolvePath} from './assets/core/index.js';

// registerComponents
registerComponents(pages);
registerComponents(shared);



doc.addEventListener('DOMContentLoaded', resolvePath);

// win.onpopstate = resolvePath;

win.onhashchange = init;
