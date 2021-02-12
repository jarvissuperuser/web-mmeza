/* Common Methods Class should not be instantiated */

export class Root extends HTMLElement{
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
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
    static get observedAttributes() {
        return this.attributeList;
    }

    connectedCallback() {
        this.authGuard();
        this.render();
        this.loadStyle();
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

    loadStyle(styleFile = './styles.css') {
        this.setStyleFile(styleFile);
    }
    setStyleFile(styleFile = './styles.css') {
        let s = document.createElement('style')
        s.innerHTML = `@import "${styleFile}";`;
        this.shadow.appendChild(s);
    }
    setStyles(styles = '') {
        let s = document.createElement('style')
        s.innerHTML = `${styles}`;
        this.shadow.appendChild(s);
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
        return '511819c1134587985bb9eff1802a0996a5d85d0e';
    }

    static prepOptions(data) {
        const requestHeaders = Root.requestHeadersMake();

        const raw = JSON.stringify(data);
        return {
            method: 'POST',
            headers: requestHeaders,
            body: raw,
            redirect: 'follow'
        };
    }

    static prepGet() {
        const requestHeaders = Root.requestHeadersMake();
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
            requestHeaders.append("Authorization", `Token ${Root.appSecret}`);
        else
            requestHeaders.append("Authorization", `Token ${Root._fetchToken()}`);
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

    post(data, path, callback) {
        fetch(`${Root.server}/${path}/`, Root.prepOptions(data))
            .then(response => response.json())
            .then(callback)
            .catch(error => console.log('error', error));
    }

    get(path, callback) {
        fetch(`${Root.server}/${path}/`, Root.prepGet())
            .then(response => response.json())
            .then(callback)
            .catch(error => console.log('error', error));
    }

    async postInLine(data, path){
        const response = await fetch(`${Root.server}/${path}/`, Root.prepOptions(data));
        return await response.json();
    }

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


