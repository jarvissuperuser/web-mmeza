import {registerPages} from './assets/loader.js';
import {registerCommon} from './assets/shared/components.js';
import {win,doc} from './assets/core/index.js';
import {init, resolvePath} from './assets/core/index.js';

// registerComponents
registerCommon();
registerPages();



doc.addEventListener('DOMContentLoaded', resolvePath);

// win.onpopstate = resolvePath;

win.onhashchange = init;
