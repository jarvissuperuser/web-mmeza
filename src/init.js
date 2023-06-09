import {registerPages} from './assets/loader.js';
import {registerCommon} from './assets/shared/components.js';
import {win,doc} from './assets/core/index.js';
import {init, resolvePath} from './assets/core/index.js';
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
//import {env} from './assets/config/env.js'

// registerComponents
registerCommon();
registerPages();

//const app = initializeApp(env)

doc.addEventListener('DOMContentLoaded', resolvePath);

// win.onpopstate = resolvePath

win.onhashchange = init;
