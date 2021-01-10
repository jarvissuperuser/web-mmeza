import {Root} from '../common/root.js';
import {hash, win} from "../common/abstraction.js";
import {init} from "../common/routes-config.js";

export class HomePage extends Root {
    static get is() {
        return 'home-page';
    }
    HTMLTemplate() {
        return `
<div class="">
    <app-fullpage></app-fullpage>
</div>
`;
    }
    loadSlots() {
        super.loadSlots();
        this.sections = this.getElements('.pg-page');
        this.pips = this.getElements(".nav-pips li a");
        this.appSlider = this.getElements('app-slider')[0];
    }

    loadAttributes() {
        super.loadAttributes();
        const {pips, sections} = this;
        const sects = Array.from(sections);

        win.onhashchange = _ => {
            if ((hash().indexOf('home/page')>0)) {
                const section = sects.filter(section => section.id === `${location.hash}`.split('#')[1])[0];
                section.scrollIntoView({behavior: "smooth"});
            } else {
                init();
            }
        };
    }
}
