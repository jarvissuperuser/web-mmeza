import {Root, doc, addEl, routes} from '../core/index.js';

export class AppNav extends Root {
    constructor() {
        super();
        this.mobileLinksContainer = {};
        this.desktopLinksContainer = {};
        this.mobileLinksContent = {};
        this.mobileLink = {};
        this.desktopLink ={};
    }
    static get is() {
        return 'app-nav';
    }
    HTMLTemplate() {
        return `
<nav class="w3-top w3-fixed w3-bar w3-text-white nav-text ">
  <a class="w3-bar-item" href="/">
    <div class="w3-center">
        <img src="${this.getAttribute('src')}" alt="" class="img-desk w3-image w3-bar-item w3-hide-small w3-hide-medium">
        <img src="${this.getAttribute('srcMobile')}" alt="" class="img-cell w3-image w3-bar-item w3-hide-large">
        </div>
  </a>
  <div class="w3-bar-item w3-right w3-padding-right">
    <div class="w3-dropdown-click w3-mobile w3-black" >
      <div class="w3-btn w3-nav-btn w3-grey w3-hide-large w3-hide-medium" >
        <span class="close state-icon">&equiv;</span>
        <span class="open state-icon w3-hide">&times;</span></div>
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
`;
    }
    loadStyle(styleFile = './styles.css') {
        super.loadStyle(styleFile);
        const stylesheet = `
        a b, a.w3-button {text-transform: capitalize;font-weight: bold;}
        .w3-image {height: 5rem;}
        .nav-text {font-size: 1.25rem;}
        .w3-nav-btn {font-size: 2rem;}
        a, a:hover {text-decoration-line: none;}
        .w3-dropdown-hover button span:after {content: ' \\25B6\\00A0';}
        .w3-dropdown-hover button:hover span:after {content: '\\25BC\\00A0'}
        .w3-padding-right{padding-right:24px}
        `;
        this.setStyles(stylesheet);
    }

    loadSlots() {
        const link = '.w3-dropdown-content a.w3-hide';
        this.mobileLinksContainer = this.getElements('.w3-dropdown-click')[0];
        this.mobileLinksContent = this.getElements('.w3-dropdown-click .w3-dropdown-content')[0];
        this.desktopLinksContainer = this.getElements('.desktop')[0];
        this.stateIcons = this.getElements('.state-icon');
        this.mobileLink = addEl('a')
        this.desktopLink = addEl('a');
        this.mobileLink.classList.add('w3-bar-item', 'w3-button', 'w3-hover-yellow');
        this.desktopLink.classList.add('w3-bar-item', 'w3-button', 'w3-hover-yellow');
    }

    loadAttributes() {
        const { mobileLinksContainer, mobileLinksContent } = this;
        mobileLinksContainer.onclick = () => {
            if (mobileLinksContent.classList.contains('w3-show'))
                mobileLinksContent.classList.remove('w3-show');
            else
                mobileLinksContent.classList.add('w3-show');
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
                link.href = `/${route.path}`;
                self.mobileLinksContent.appendChild(link);
                const dLink = self.desktopLink.cloneNode(true);
                dLink.innerHTML = processText(route.path).bold();
                dLink.href = `/${route.path}`;
                self.desktopLinksContainer.appendChild(dLink);
            }
        })
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
