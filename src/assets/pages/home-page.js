import {Root} from '../common/root.js';
import {doc} from "../common/abstraction.js";
import {pages} from "../js/data/page-data.js";

export class HomePage extends Root {
    static get is() {
        return 'home-page';
    }
    HTMLTemplate() {
        return `
<div class="">
</div>
`;
    }
    loadSlots() {
        super.loadSlots();
        this.content = this.getElements('div')[0];
        this.fullPageScroll = doc.createElement('app-fullpage');
    }

    loadAttributes() {
        super.loadAttributes();
        this.fullPageScroll.pages = pages;
        this.content.append(this.fullPageScroll);
    }
}
