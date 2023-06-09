import {DOMElement, routes} from '../core/index.js';

export class PageView extends DOMElement{
    static get attributeList() { return ['page']; }
    static get is() {
        return 'page-view';
    }

    HTMLTemplate() {
        return `<div class="w3-grid"><div name="page" class="w3-grid"></div></div>`;
    }
    navRender(route, slot) {
        const filtered = routes.filter(r => r.path === route)[0];
        if (filtered) {
            slot.innerHTML = filtered.view.element;
        } else if ((location.hash.indexOf('home/page')>0)) {
            slot.innerHTML = routes[0].view.element;
        }
    }

    attachAttributesNLogic() {
        const {slots, navRender} = this;
        try {
            slots.forEach(slot => {
                if (this.getAttribute(slot.getAttribute('name'))) {

                    navRender(this.getAttribute(slot.getAttribute('name')), slot);
                }
            });
        }
        catch {

        }
    }

    static get observedAttributes() {
        return PageView.attributeList;
    }

    attributeChangedCallback(prop, newVal, oldValue) {
        if (prop==='page')this.connectedCallback();
    }


}
