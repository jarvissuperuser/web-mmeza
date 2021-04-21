/* Common Methods Class should not be instantiated */

export const Core = Base => class extends Base {
    generalDeclarations() {
        this.defaultConfig = {
            count: 4,
            linkPattern: '#home/page'
        }
        this.attributeList = [];
        this.slots = [];
        this.stylesFile = './styles.css';
        this.themeFile = './theme.css';
        this.mapper = {sum:'.summary',con:'.contracts', his:'.history'}
        this._disabled = false;
    }
    shadowDeclarations() {
        this.shadow = this.attachShadow({mode: "open"});
        this.generalDeclarations();
    }
    static get observedAttributes() {
        return this.attributeList;
    }

    connectedCallback() {
        this.authGuard();
        this.render();
        if (this.shadow){
            this.loadStyle();
        }
        this.loadSlots();
        this.loadAttributes();
        this.renderedCallback();
    }

    render() {
        this.shadow.innerHTML = this.HTMLTemplate();
    }

    renderedCallback() {
        this.afterInit();
    }

    afterInit() {
    }

    loadAttributes() {
        const {slots} = this;
        slots.forEach(slot => {
            if (this.getAttribute(slot['name'])){
                slot.innerText = this.getAttribute(slot['name'])
            }
        });
    }

    loadSlots() {
        this.slots = this.shadow.querySelectorAll('slot');
    }

    isAttrib(attrib) {
        return this.attributeList.find(a => a === attrib) !== undefined;
    }

    HTMLTemplate() {
        return ""
    }

    authGuard() {
        // if (!localStorage['user_data'] && !this.authRouterVerify()){
        //     location.hash = `#/login`;
        // }
    }

    authRouterVerify() {
        let route = location.hash.split('/')[1];
        const routes = ['recover', 'login', 'register', 'reset'];
        return routes.some(r => route === r);
    }

    navRender(route, slot) {
        // console.log('r', route, slot);
        // console.log('r', route, slot.innerHTML);
    }

    static _fetchToken() {
        const raw = localStorage['user_data'];
        if (raw){
            let data = JSON.parse(atob(raw));
            return data['token'];
        }
        return 0;
    }

    _fetchUserData(token) {
        const raw = localStorage['user_data'];
        if (raw){
            let data = JSON.parse(atob(raw));
            return data[token].toUpperCase();
        }
        return 0;
    }

    // async postInLine(data, path){
    //     const response = await fetch(`${Root.server}/${path}/`, Root.prepOptions(data));
    //     return await response.json();
    // }

    get getURLToken() {
        const url =location.hash.split('/');
        if (url[1] === 'reset'){
            try{
                return url[2];
            }
            catch (e) {
                return "no token";
            }
        }
    }

    getElements(tag) {
        return this.shadow.querySelectorAll(tag);
    }

    getAttrData(qualifiedName) {
        return JSON.parse(this.getAttribute(qualifiedName));
    }
}

export class Root extends Core(HTMLElement) {
    constructor() {
        super();
        this.shadowDeclarations();
    }
    loadStyle(styleFile = './styles.css') {
        this.setStyleFile(styleFile);
    }
    setStyleFile(styleFile = './styles.css') {
        let s = document.createElement('style')
        s.innerHTML = `@import "${styleFile}";`;
        if (this.shadow)
            this.shadow.appendChild(s);
    }
    setStyles(styles = '') {
        let s = document.createElement('style')
        s.innerHTML = `${styles}`;
        this.shadow.appendChild(s);
    }
}

export class Shadowless extends Core(HTMLElement){
    constructor() {
        super();
        this.generalDeclarations();
    }
    static get observedAttributes() {
        return this.attributeList;
    }

    connectedCallback() {
        this.render();
        this.loadSlots();
        this.loadAttributes();
        this.renderedCallback();
    }

    render() {
        this.innerHTML = this.HTMLTemplate();
    }

    loadAttributes() {
        const {slots} = this;
        slots.forEach(slot => {
            if (this.getAttribute(slot['name'])){
                slot.innerText = this.getAttribute(slot['name'])
            }
        });
    }

    loadSlots() {
        this.slots = this.querySelectorAll('slot');
    }

    isAttrib(attrib) {
        return this.attributeList.find(a => a === attrib) !== undefined;
    }

    HTMLTemplate() {
        return ""
    }

    static get server() {
        if (location.host.indexOf('localhost') >= 0 || location.host.indexOf('127.0.0.1') >= 0) {
            return "http://localhost:8000/api";
        }
    }


    static get appSecret() {
        return '';
    }

    static prepOptions(data) {
        const requestHeaders = Shadowless.requestHeadersMake();

        const raw = JSON.stringify(data);
        return {
            method: 'POST',
            headers: requestHeaders,
            body: raw,
            redirect: 'follow'
        };
    }

    static prepGet() {
        const requestHeaders = Shadowless.requestHeadersMake();
        return {
            method: 'GET',
            headers: requestHeaders,
            redirect: 'follow'
        };
    }

    static requestHeadersMake() {
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        if (!localStorage['user_data'])
            requestHeaders.append("Authorization", `Token ${Shadowless.appSecret}`);
        else
            requestHeaders.append("Authorization", `Token ${Shadowless._fetchToken()}`);
        return requestHeaders;
    }

    authGuard() {
        // if (!localStorage['user_data'] && !this.authRouterVerify()){
        //     location.hash = `#/login`;
        // }
    }

    authRouterVerify() {
        let route = location.hash.split('/')[1];
        const routes = ['recover', 'login', 'register', 'reset'];
        return routes.some(r => route === r);
    }

    navRender(route, slot) {
        // console.log('r', route, slot);
        // console.log('r', route, slot.innerHTML);
    }

    static _fetchToken() {
        const raw = localStorage['user_data'];
        if (raw){
            let data = JSON.parse(atob(raw));
            return data['token'];
        }
        return 0;
    }

    _fetchUserData(token) {
        const raw = localStorage['user_data'];
        if (raw){
            let data = JSON.parse(atob(raw));
            return data[token].toUpperCase();
        }
        return 0;
    }

    getElements(tag) {
        return this.querySelectorAll(tag);
    }

    getAttrData(qualifiedName) {
        return JSON.parse(this.getAttribute(qualifiedName));
    }

}


