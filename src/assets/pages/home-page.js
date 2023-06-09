import {Core, doc} from '../core/index.js';
import {pages} from '../js/data/page-data.js';

export class HomePage extends Core {
    static get is() {
        return 'home-page';
    }
    HTMLTemplate() {
        return `
<div class="">
</div>
`;
    }
    loadTargetElements() {
        // super.loadTargetElements();
        this.content = this.getElements('div')[0];
        this.fullPageScroll = doc.createElement('app-fullpage');
    }

    attachAttributesNLogic() {
        // super.attachAttributesNLogic();
        this.fullPageScroll.pages = pages;
        this.content.append(this.fullPageScroll);
    }
}
