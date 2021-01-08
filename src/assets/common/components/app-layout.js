import {Root} from "../root.js";
import {dataToEl} from "../abstraction.js";

export class AppLayout extends Root {
    static get is() {
        return `app-layout`;
    }
    HTMLTemplate() {
        return `
<div class="pg-page w3-black vh-100 bg-1 w3-grid grid-container">
            <div class="pips-container center">
                <app-pips></app-pips>
            </div>
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
        this.pips = this.getElements('app-pips')[0]
    }
    loadAttributes() {
        super.loadAttributes();
        dataToEl(this.pips, 'config', this.defaultConfig);
        this.index = this.getAttribute('index') ? parseInt(this.getAttribute('index')) : 1;
        this.configData = this.getAttrData('config');
        this.config = this.configData ? this.configData : this.defaultConfig;
        this.setAttribute('id', `${this.config.linkPattern}${this.index}` )
    }
    attributeChangedCallback(prop, oldV, newV) {

    }
}
