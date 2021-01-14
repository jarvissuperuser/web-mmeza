import {Root} from "../root.js";

export class AppPips extends Root {
    static get is() {
        return 'app-pips';
    }
    HTMLTemplate() {
        return `
<div class="nav-pips center w3-hide-small">
    <ul class="center">
        <li><a></a></li>
        <li><a></a></li>
        <li><a></a></li>
        <li><a></a></li>
    </ul>
</div>
        `;
    }
    loadSlots() {
        super.loadSlots();
        this.list = this.getElements('ul')[0];
        this.listItems = this.getElements('li');
        this.autoConfig(this);
    }
    autoConfig() {
        const { list, listItems} = this;
        const newList = [];
        let activePip = parseInt(this.getAttribute('index'));
        const configStr = this.getAttrData('config');
        if (this.getAttribute('pips')) {
            list.innerHTML = "";
            const config = configStr ? configStr : this.defaultConfig;
            const inActiveItem = listItems[1];
            for (let p = 1; p <= config.count; p++) {
                const clone = inActiveItem.cloneNode(true);
                clone.querySelector('a').href = `${config.linkPattern}${p}`;
                newList.push(clone);
            }
            activePip = activePip? activePip : 1;
        }
        if (activePip) {
            newList.length ?
                newList[(activePip - 1)%listItems.length].classList.add('active') :
                listItems[(activePip - 1)%listItems.length].classList.add('active')
        }
        if(newList.length) newList.forEach(li => list.appendChild(li))
    }

    static get observedAttributes() {
        return ['index','pips', 'config'];
    }
    attributeChangedCallBack(prop, oldV, newV) {
        if(prop === 'pips' && oldV !== newV) this.connectedCallback();
        if(prop === 'index' && oldV !== newV) this.connectedCallback();
        if(prop === 'config' && oldV !== newV) this.connectedCallback();
    }
}
