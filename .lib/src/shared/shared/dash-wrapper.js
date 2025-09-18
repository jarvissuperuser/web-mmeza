import {Core, DOMElement, doc} from "../core/index.js";

export class DashWrapper extends Core{

    static get is() {return 'dash-wrapper' }
    HTMLTemplate() {
        return `<div class="bg-theme vh-100 w3-padding">
        <div class="offset-3 w3-col s9 vh-25 w3-hide-small text-deco-none">
        <a href="#access" class="offset-8 w3-col s2 w3-padding">
            <h5>Authorised List</h5>
        </a>
        <a href="#pdr-page" class="w3-col s2 w3-padding">
            <h5>Add new Identity</h5>
        </a>
<!--        <a href="#screencast" class="w3-col s2 w3-padding">-->
<!--            <h5>Tools</h5>-->
<!--        </a>-->
<!--        <a href="#tasks" class="w3-col s2 w3-padding">-->
<!--            <h5>Tasks</h5>-->
<!--        </a>-->
    </div>
    
  <div class="w3-bar-item w3-right w3-padding-right top-nav">
    <div class="w3-dropdown-click w3-mobile w3-yellow" >
      <div class="w3-btn w3-nav-btn w3-yellow w3-hide-large w3-hide-medium" >
        <span class="close state-icon w3-animate-left">&equiv;</span>
        <span class="open state-icon w3-hide w3-animate-right">&times;</span></div>
      <div class="w3-dropdown-content w3-bar-block w3-black w3-animate-right">
        <a class="w3-bar-item w3-button w3-hover-red w3-hide"></a>
        
        <a class="w3-bar-item w3-button w3-hover-red"  href="#pdr-page">Add Identity</a>
        
        <a class="w3-bar-item w3-button w3-hover-red" href="#access">Access List</a>
<!--        <div class="w3-dropdown-hover w3-black w3-hide-large w3-hide-medium">-->
<!--          <button class="w3-button w3-hover-green"><span></span>GALLERY</button>-->
<!--          <div class="w3-dropdown-content w3-black w3-bar-block">-->
<!--            <a class="w3-bar-item w3-button w3-hover-orange" href="#videos" >&nbsp; VIDEOS</a>-->
<!--            <a class="w3-bar-item w3-button w3-hover-red" href="#videos" >&nbsp; IMAGES</a>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
    </div>
        
        <slot>
            <p>Default Text</p>
        </slot>
        </div class="bg-theme vh-100 w3-padding">`;
    }
    loadTargetElements() {
        this.mobileNav = this.getElements('.w3-dropdown-click')[0];
        this.mobileNavLinks =  this.getElements('.w3-dropdown-click .w3-dropdown-content')[0];
        this.stateIcons = this.getElements('.state-icon');
        //super.loadTargetElements();
        //this.slotcontent = this.getElements('[slot=default]');
        //console.log(this.slotcontent);
        /*this.slots.forEach(slot => {
            if (this.slotcontent && this.slotcontent[0]) {
                slot.innerHTML = this.slotcontent[0].innerHTML;
                this.slotcontent[0].remove();
                //console.log(this.slotcontent);
            }
        } );*/
        //console.log(this.innerHTML)
    }
    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        this.attachNav();
    }

    attachNav() {

        this.mobileNav.onclick = () => {
            if (this.mobileNavLinks.classList.contains('w3-show'))
                this.mobileNavLinks.classList.remove('w3-show');
            else
                this.mobileNavLinks.classList.add('w3-show');
            this.stateIcon(this);
        }
    }

    stateIcon(self) {
        self.stateIcons.forEach(icon =>{
            if (icon.classList.contains('w3-hide')){
                icon.classList.remove('w3-hide');
            } else {
                icon.classList.add('w3-hide');
            }
        });
    }
    renderSlot() {

    }
}
