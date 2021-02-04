import {Root} from "../root.js";
import {dataToEl, doc} from "../abstraction.js";

export class AppLayout extends Root {
    static get is() {
        return `app-layout`;
    }
    HTMLTemplate() {
        return `
<div class="pg-page w3-black vh-100">
    <slot name="content">
      <div class="content-home w3-col s12 w3-grid w3-g-contain">
        
            <div class="w3-g-third w3-padding">
                <a class="w3-center" href="#/about">
                    <img src="assets/images/logo.png" class="w3-image w3-theme-accent-1" />
                </a>
               
            </div>
            <div class="w3-padding w3-g-twothird">
          <h1 class="w3-theme-gold w3-col s12"><span class="font-1">EFFICIENT, RELIABLE & TRANSPARENT</span></h1>
          <h5 class="w3-row w3-hide-small mt-0"><span class="font-1 w3-col s12">E&T Minerals is a South African based
            commodity brokerage and trading house
            founded in 2013. The trading house,
            specializing in coal products.
          </span></h5>
          <br>
          <a class="w3-card w3-button w3-transparent w3-text-white w3-round-xlarge font-1 w3-border w3-theme-border " href="#/contact-us"> <span class="w3-text-medium w3-margin-small ">CONTACT US</span></a>
          
        </div>
        
      </div>
            
      <div class="w3-grid w3-social w3-hide-small">
        <a class="icon-small self-center w3-text-white" href="https://www.facebook.com/ET-Minerals-113613910380724/" target="_blank">
            <i class="fb-icon w3-text-blue"></i>
        </a>
        <a class="icon-small-2 self-center w3-text-white" href="https://www.linkedin.com/organization-guest/company/e-t-minerals" target="_blank">
            <i class="linked-in "></i>
        </a>
      </div>
    </slot>  
</div>
        `;
    }
    static get observedAttributes() {
        return ['index', 'config'];
    }
    loadSlots() {
        super.loadSlots();
        this.slots.forEach(slot => {
            if (this.getAttribute(slot['name'])){
                slot.innerHTML = this.getAttribute(slot['name']);
            }
        });
        this.pips = doc.createElement('app-pips');
        this.wrapper = doc.createElement('div');
    }
    loadAttributes() {
        super.loadAttributes();

        this.index = this.getAttribute('index') ? parseInt(this.getAttribute('index')) : 1;
        this.configData = this.getAttrData('config');
        this.wrapper.classList.add("pips-container", "center");
        this.config = this.configData ? this.configData : this.defaultConfig;
        this.setAttribute('id', `${this.config.linkPattern.split('#').join('')}${this.index}` )
        this.getElements('slot[name=content]')[0].addEventListener('slotchange', this._onSlotChange.bind(this));
    }
    attributeChangedCallback(prop, oldV, newV) {
    }

    afterInit() {
        super.afterInit();
        this.content = this.getElements('div[slot=content]');
        if ( this.pips ) {
            dataToEl(this.pips, 'config', this.config);
            this.wrapper.appendChild(this.pips);
            this.slots[0].prepend(this.wrapper);
        }
    }

    _onSlotChange(event) {
        console.log('slotted');
        if ( this.pips ) {
            dataToEl(this.pips, 'config', this.config);
            this.pips.setAttribute('index', this.index.toString());
            this.pips.setAttribute('pips', this.index.toString());
            this.wrapper.appendChild(this.pips);
            event.target.assignedElements()[0].prepend(this.wrapper);
        }
    }
}
