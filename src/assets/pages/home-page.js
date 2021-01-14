import {Root} from '../common/root.js';

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
    }

    loadAttributes() {
        super.loadAttributes();
    }
}
