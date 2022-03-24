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
            console.log(filtered.view.element);
        } else if ((location.hash.indexOf('home/page')>0)) {
            slot.innerHTML = routes[0].view.element;
        }
        console.log(filtered);
    }

    attachAttributesNLogic() {
        const {slots, navRender} = this;
        slots.forEach(slot => {
            console.log('found', slot,slot.getAttribute('name') );
            console.log(this.getAttribute(slot.getAttribute('name')), slot.getAttribute('name'));
            if (this.getAttribute(slot.getAttribute('name'))){
                console.log('next');
                navRender(this.getAttribute(slot.getAttribute('name')), slot);
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
