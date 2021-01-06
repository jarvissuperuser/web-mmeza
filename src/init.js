import {registerPages} from "./assets/loader.js";
import {registerCommon} from "./assets/common/components.js";
import {win, navigate, hash} from "./assets/common/abstraction.js";

// registerComponents
registerCommon();
registerPages();

win.onload = () => {
    let route = hash().split('/')[1];
    if ((location.hash.indexOf('home/page')>0) || (!route)) {
        navigate('home');
        return;
    }
    navigate(route);
}

win.onhashchange = _ => {
    let route = hash().split('/')[1];
    if (!(hash().indexOf('home/page')>0)) {
        navigate(route);
    }
}

