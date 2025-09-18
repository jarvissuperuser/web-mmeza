import {Core, routes, addEl, DOMElement} from "../core/index.js";

export class AppNav extends DOMElement {
    constructor() {
        super();
        this.mobileLinksContainer = {};
        this.desktopLinksContainer = {};
        this.mobileLinksContent = {};
        this.mobileLink = {};
        this.desktopLink ={};
    }

    static get observedAttributes() {
        return ['bottomnav', 'topnav', 'backnav']
    }
    static get is() {
        return 'app-nav';
    }

    attributeChangedCallback (name, ov,nv){
        this.changeNavState(this, nv, name);
    }

    changeNavState (self, newVal, selectNav) {
        return self[selectNav] && newVal === 'hide' ?
            self[selectNav].classList.add('w3-hide') :
            self[selectNav].classList.remove('w3-hide')
    }

    HTML() {
        return `
<nav class="w3-top w3-fixed w3-bar w3-text-white nav-text ">
  <a class="w3-bar-item w3-left back" title="back">
    <div class="w3-text-large" ><span>&leftarrow;</span></div>
  </a>
  <a class="w3-bar-item" href="/">
    <div class="w3-center">
        <img src="${this.getAttribute('src')}" alt="" class="img-desk w3-image w3-bar-item w3-hide-small w3-hide-medium">
        <img src="${this.getAttribute('srcMobile')}" alt="" class="img-cell w3-image w3-bar-item w3-hide-large">
    </div>
  </a>
  <div class="w3-bar-item w3-right w3-padding-right top-nav">
    <div class="w3-dropdown-click w3-mobile w3-red" >
      <div class="w3-btn w3-nav-btn w3-red w3-hide-large w3-hide-medium" >
        <span class="close state-icon w3-animate-left">&equiv;</span>
        <span class="open state-icon w3-hide w3-animate-right">&times;</span></div>
      <div class="w3-dropdown-content w3-bar-block w3-black w3-animate-right">
        <a class="w3-bar-item w3-button w3-hover-red w3-hide"></a>
<!--        <div class="w3-dropdown-hover w3-black w3-hide-large w3-hide-medium">-->
<!--          <button class="w3-button w3-hover-green"><span></span>GALLERY</button>-->
<!--          <div class="w3-dropdown-content w3-black w3-bar-block">-->
<!--            <a class="w3-bar-item w3-button w3-hover-orange" href="#videos" >&nbsp; VIDEOS</a>-->
<!--            <a class="w3-bar-item w3-button w3-hover-red" href="#videos" >&nbsp; IMAGES</a>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>

    <div class="desktop w3-bar w3-hide-small w3-text-big-nav w3-padding-16 w3-padding-right">
      <a class="w3-bar-item w3-button w3-hover-blue w3-hide" ><b></b>
     </a>
    </div>
  </div>
</nav>
<nav class="w3-bottom w3-bar w3-fixed w3-padding">
    <div class="w3-col s12 w3-round w3-red w3-round-large w3-round w3-dark-gray w3-padding">
        <div class="w3-col s3 w3-padding w3-center w3-button w3-round"><a href="#home" class="w3-text-big">&#x27f0;</a></div>
        <div class="w3-col s3 w3-padding w3-center w3-button w3-round"><a href="#templates" class="w3-text-big">&#x2713;</a></div>
        <div class="w3-col s3 w3-padding w3-center w3-button w3-round"><a href="#add" class="w3-text-big bold">&#x2606;</a></div>
        <div class="w3-col s3 w3-padding w3-center w3-button w3-round"><a href="#report" class="w3-text-big">&#x2699;</a></div>
    </div>
</nav>
`;
    }
    loadStyle(styleFile = './styles.css') {
        super.loadStyle(styleFile);

    // .nav-text {font-size: 1.25rem;}
    // .w3-nav-btn {font-size: 2rem;}
        const stylesheet = `
        a b, a.w3-button {text-transform: capitalize;font-weight: bold;}
        .w3-image {height: 5rem;}
        a, a:hover {text-decoration-line: none;}
        .w3-dropdown-hover button span:after {content: ' \\25B6\\00A0';}
        .w3-dropdown-hover button:hover span:after {content: '\\25BC\\00A0'}
        .w3-padding-right{padding-right:24px}
        `;
        this.setStyles(stylesheet);
    }

    loadTargetElements() {
        const link = '.w3-dropdown-content a.w3-hide';
        this.mobileLinksContainer = this.getElements('.w3-dropdown-click')[0];
        this.mobileLinksContent = this.getElements('.w3-dropdown-click .w3-dropdown-content')[0];
        this.desktopLinksContainer = this.getElements('.desktop')[0];
        this.stateIcons = this.getElements('.state-icon');
        this.mobileLink = addEl('a');
        this.desktopLink = addEl('a');
        this.mobileLink.classList.add('w3-bar-item', 'w3-button', 'w3-hover-yellow', 'w3-col', 's12');
        this.desktopLink.classList.add('w3-bar-item', 'w3-button', 'w3-hover-yellow', 'w3-col', 's12');
        this.bottomnav = this.getElements('nav.w3-bottom')[0];
        this.topnav = this.getElements('.top-nav')[0];
        this.backnav = this.getElements('[title=back]')[0];
    }

    attachAttributesNLogic() {
        const { mobileLinksContainer, mobileLinksContent, backnav } = this;
        mobileLinksContainer.onclick = () => {
            if (mobileLinksContent.classList.contains('w3-show'))
                mobileLinksContent.classList.remove('w3-show');
            else
                mobileLinksContent.classList.add('w3-show');
            this.stateIcon(this);
        }
        backnav.onclick = () => {
            try {
                history.back()
            }catch (e) {
                location.pathname = '/';
            }
        }
        this.loadLinks(this);
    }
    loadLinks(self) {
        function processText (link) {
            return link.replace('-', ' ');
        }
        routes.forEach(route => {
            if (route.visible) {
                // console.log(route.visible, route.path);
                const link = self.mobileLink.cloneNode(true);
                link.innerText = processText(route.path);
                link.href = `#${route.path}`;
                self.mobileLinksContent.appendChild(link);
                const dLink = self.desktopLink.cloneNode(true);
                dLink.innerHTML = processText(route.path).bold();
                dLink.href = `#${route.path}`;
                self.desktopLinksContainer.appendChild(dLink);
            }
        });

        this.backnav.classList.add('w3-hide');
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

}
