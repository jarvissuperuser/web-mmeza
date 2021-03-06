import {Root} from "./root.js"
import {routes} from "./routes-config.js"

export class PageView extends Root{
    static get attributeList() { return ['page']; }
    static get is() {
        return 'page-view';
    }

    HTMLTemplate() {
        return `<div class="w3-grid"><slot name="page" class="w3-grid"></slot></div>`
    }
    navRender(route, slot) {
        const filtered = routes.filter(r => r.path === route)[0];

        if (filtered) {
            slot.innerHTML = filtered.view.element;
        } else if ((location.hash.indexOf('home/page')>0)) {
            slot.innerHTML = routes[0].view.element;
        }
    }

    loadAttributes() {
        const {slots, navRender} = this;
        slots.forEach(slot => {
            if (this.getAttribute(slot['name'])){
                navRender(this.getAttribute(slot['name']), slot);
            }
        });
    }

    static get observedAttributes() {
        return PageView.attributeList;
    }

    attributeChangedCallback(prop, newVal, oldValue) {
        if (prop==='page')this.connectedCallback();
    }


}
