/* Common Methods Class should not be instantiated */
export const doc = document;
export const win = window;
export const store = localStorage;
export function hash() {
    return location.hash
}
export const addEl = (tag = '') => {
    return doc.createElement(tag);
}
/**
 * @class Core
 * @description Mixin For Core And DomElement
 * */
const CoreBase = Base => class extends Base {
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
        this.authGuard();
        this.render();
    }
    shadowDeclarations() {
        this.shadow = this.attachShadow({mode: "open"});
        this.generalDeclarations();
    }
    static get observedAttributes() {
        return this.attributeList;
    }

    connectedCallback() {
        if (this.shadow){
            this.loadStyle();
        }
        this.loadTargetElements();
        this.attachAttributesNLogic();
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

    attachAttributesNLogic() {
        const {slots} = this;
        slots.forEach(slot => {
            if (this.getAttribute(slot['name'])){
                slot.innerText = this.getAttribute(slot['name'])
            }
        });
        this.interpolate();
    }

    loadTargetElements() {
        this.slots = this.shadow.querySelectorAll('slot');
        this.textPockets = this.shadow.querySelectorAll('span');
    }
    _tokens() {
        return ['{{', '}}'];
    }
    hasInterpolationTokens(element) {
        return element.innerText.indexOf(this._tokens()[0]) > -1 &&
            element.innerText.indexOf(this._tokens()[1]) > -1;
    }
    interpolate() {
        try {
            let {_tokens, hasInterpolationTokens} = this;
            hasInterpolationTokens = hasInterpolationTokens.bind(this);
            Array.from(this.textPockets).forEach((item, i) => {
                while (hasInterpolationTokens(item)) {
                    const prop = item.innerText.substring(
                        item.innerText.indexOf(_tokens()[0])
                        + _tokens()[0].length,
                        item.innerText.indexOf(_tokens()[1])
                    );
                    if (this.hasOwnProperty('model') && !!this[`model`][prop]) {
                        item.innerText = item
                            .innerText.replace(`${_tokens()[0]}${prop}${_tokens()[1]}`, this[`model`][prop]);
                    }else if (!!this[prop]){
                        item.innerText = item
                            .innerText.replace(`${_tokens()[0]}${prop}${_tokens()[1]}`, this[prop]);
                    } else {
                        throw new Error(`Prop: ${prop} not property`);
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
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

export class Core extends CoreBase(HTMLElement) {
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

export class DOMElement extends CoreBase(HTMLElement){
    constructor() {
        super();
        this.generalDeclarations();
    }
    static get observedAttributes() {
        return this.attributeList;
    }

    connectedCallback() {
        this.loadTargetElements();
        this.attachAttributesNLogic();
        this.renderedCallback();
    }

    render() {
        this.innerHTML = this.HTMLTemplate();
    }

    attachAttributesNLogic() {
        const {slots} = this;
        slots.forEach(slot => {
            if (this.getAttribute(slot['name'])){
                slot.innerText = this.getAttribute(slot['name'])
            }
        });
    }

    loadTargetElements() {
        this.slots = this.querySelectorAll('slot');
        this.textPockets = this.getElements('span');
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
        const requestHeaders = DOMElement.requestHeadersMake();

        const raw = JSON.stringify(data);
        return {
            method: 'POST',
            headers: requestHeaders,
            body: raw,
            redirect: 'follow'
        };
    }

    static prepGet() {
        const requestHeaders = DOMElement.requestHeadersMake();
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
            requestHeaders.append("Authorization", `Token ${DOMElement.appSecret}`);
        else
            requestHeaders.append("Authorization", `Token ${DOMElement._fetchToken()}`);
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
