/* Common Methods Class should not be instantiated */
import { uuid } from "./util.js";

export const doc = document;
export const win = window;
export const store = localStorage;

export const dateFormatter = (dateStyle = 'short', timeStyle = 'short', region = 'en-ZA') => {
        const style = {};
        if (dateStyle) style.dateStyle = dateStyle;
        if (timeStyle) style.timeStyle = timeStyle;
        return Intl.DateTimeFormat(region, style);
}
export function hash() {
        return location.hash
}

export const getRoutePath = () => {
        return hash().split('#');
}

export const getPathSegments = () => {
        return getRoutePath()[1].split('/')
}
export const addEl = (tag = '') => {
        return doc.createElement(tag);
}
export const addElSVG = (tag) => {
        return doc.createElementNS("http://www.w3.org/2000/svg", tag)
}
/**
 * @class Core
 * @description Mixin For Core And DomElement
 * */
const CoreBase = Base => class extends Base {
        generalDeclarations() {
                this.slots = [];
                this.stylesFile = './styles.css';
                this._disabled = false;
                this.parser = new DOMParser();
                this.authGuard();
        }
        shadowDeclarations() {
                //this.shadowRoot = this.attachShadow({mode: "open"});
                this.generalDeclarations();
        }

        static get observedAttributes() {
                return this.attributeList;
        }

        byId(tag) {
                return this.querySelector(tag);
        }

        connectedCallback() {
                this.render();
                if (this.shadowRoot) {
                        this.loadStyle();
                }
                this.loadTargetElements();
                this.attachAttributesNLogic();
                this.renderedCallback();
        }

        render() {
                if (!this.shadowRoot)
                        this.innerHTML = this.HTML();
        }


        simulatePlaceholder() {
                this.cin = this.getElements("[contenteditable]");
                //this.cin.forEach(input => {
                for (let x = 0; x < this.cin.length; x++) {
                        const input = this.cin[x];
                        input.onfocus = (e) => this.cinOnFocus(input);
                        input.onblur = () => this.cinOnBlur(input)
                }
                //})
        }

        cinOnFocus(input) {
                if (input.textContent === input.getAttribute('placeholder')) {
                        input.textContent = '';
                        input.classList.remove('w3-text-gray');
                        input.focus()
                }
        }
        cinOnBlur(input) {
                if (!input.textContent.trim()) {
                        input.textContent = input.getAttribute('placeholder')
                        input.classList.add('w3-text-gray')
                }
        }


        renderTemplate() {
                const template = doc.createElement('template');
                template.innerHTML = this.HTMLTemplate();
                this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        renderedCallback() {
                this.afterInit();
        }

        afterInit() {
        }

        attachAttributesNLogic() {
                const { slots } = this;
                slots.forEach(slot => {
                        if (this.getAttribute(slot['name'])) {
                                slot.innerText = this.getAttribute(slot['name'])
                        }
                });
                this.interpolate();
        }

        loadTargetElements() {
                this.slots = this.shadowRoot.querySelectorAll('slot');
                this.textPockets = this.shadowRoot.querySelectorAll('span');
        }
        _tokens() {
                return ['{{', '}}'];
        }
        hasInterpolationTokens(element) {
                return element.innerText.indexOf(this._tokens()[0]) > -1 &&
                        element.innerText.indexOf(this._tokens()[1]) > -1;
        }
        interpolate(safe = true) {
                try {
                        let { _tokens, hasInterpolationTokens, getInnerProp, replacePropSafe, replaceProp } = this;
                        hasInterpolationTokens = hasInterpolationTokens.bind(this);
                        if (!this.textPockets) return;
                        this.textPockets.forEach((item, i) => {
                                while (hasInterpolationTokens(item)) {
                                        const prop = getInnerProp(item, _tokens);
                                        if (!!this.model && !!this.model[prop]) {
                                                if (safe) {
                                                        item.innerText = replacePropSafe(item, _tokens(), prop, this[`model`][prop]);
                                                        continue;
                                                }
                                                item.innerHTML = replaceProp(item, _tokens(), prop, this[`model`][prop]);
                                        } else if (!!this[prop]) {
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

        getInnerProp(item, _tokens) {
                return item.innerText.substring(
                        item.innerText.indexOf(_tokens()[0])
                        + _tokens()[0].length,
                        item.innerText.indexOf(_tokens()[1])
                );
        }
        replacePropSafe(item, _tokens, propertyKey, value) {
                return item
                        .innerText.replace(`${_tokens[0]}${propertyKey}${_tokens[1]}`, value);
        }
        replaceProp(item, _tokens, propertyKey, value) {
                return item
                        .innerHTML.replace(`${_tokens[0]}${propertyKey}${_tokens[1]}`, value);
        }
        isAttrib(attrib) {
                return this.attributeList.find(a => a === attrib) !== undefined;
        }

        HTMLTemplate() {
                return ""
        }
        HTML() {
                return ''
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
                if (raw) {
                        let data = JSON.parse(atob(raw));
                        return data['token'];
                }
                return 0;
        }

        _fetchUserData(token) {
                const raw = localStorage['user_data'];
                if (raw) {
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
                const url = location.hash.split('/');
                if (url[1] === 'reset') {
                        try {
                                return url[2];
                        }
                        catch (e) {
                                return "no token";
                        }
                }
        }

        getElements(tag) {
                return this.shadowRoot.querySelectorAll(tag);
        }

        getAttrData(qualifiedName) {
                return JSON.parse(this.getAttribute(qualifiedName));
        }
        setStyles(styles = '') {
                let s = document.createElement('style')
                s.textContent = `${styles}`;
                if (this.shadowRoot) {
                        return this.shadowRoot.appendChild(s);
                }
                if (!this.getElements('style').length)
                        this.appendChild(s)
        }
}

export class Core extends CoreBase(HTMLElement) {
        constructor() {
                super();
                this.shadowDeclarations();
                const p = this.parser;
                const template = p.parseFromString(`<template>${this.HTMLTemplate()}</template>`, 'text/html').head.childNodes[0];
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.appendChild(template.content.cloneNode(true));
        }
        loadStyle(styleFile = 'styles.css') {
                this.setStyleFile(styleFile);
        }
        setStyleFile(styleFile = 'styles.css') {
                const frag = document.createDocumentFragment();
                const s = document.createElement('style')
                s.textContent = `@import url("${styleFile}");`;
                frag.append(s)
                if (this.shadowRoot && !this.shadowRoot.querySelectorAll('style')[0])
                        this.shadowRoot.append(frag);
        }

}

export class DOMElement extends CoreBase(HTMLElement) {
        constructor() {
                super();
                this.generalDeclarations();
                //this.addEventListener('slot change', (slotev) => {console.log({slotev})})

        }
        static get observedAttributes() {
                return this.attributeList;
        }

        connectedCallback() {
                if (!this.HTMLTemplate())
                        this.render();
                this.loadTargetElements();
                this.attachAttributesNLogic();
                this.renderedCallback();
        }

        render() {
                const nodes = this.parser.parseFromString(this.HTML(), 'text/html').body.childNodes;
                for (let a = 0; a < nodes.length; a++)
                        this.append(nodes[a]);
        }
        renderTemplate() {
                const parser = new DOMParser();
                const template = parser.parseFromString(`<template>${this.HTMLTemplate()}</template>`, 'text/html').head.children[0]
                // template.innerHTML = this.HTMLTemplate();
                this.childNodes;
        }

        attachAttributesNLogic() {
                const { slots } = this;
                slots.forEach(slot => {
                        if (this.getAttribute(slot['name'])) {
                                slot.innerText = this.getAttribute(slot['name'])
                        }
                });
        }

        loadTargetElements() {
                this.slots = this.querySelectorAll('slot');
                this.textPockets = this.getElements('span');
                this.simulatePlaceholder();
                this.cin.forEach(super.cinOnBlur);
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
                if (raw) {
                        let data = JSON.parse(atob(raw));
                        return data['token'];
                }
                return 0;
        }

        _fetchUserData(token) {
                const raw = localStorage['user_data'];
                if (raw) {
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

/***
 *
 * @mixin
 *
 * */
export const inputMixin = Base => class extends Base {
        loadInputs() {
                this.inputs = this.getElements('input');
                if (!Array.from(this.inputs).length) {
                        this.inputs = this.getElements('app-input');
                }
        }
        inputListener() {
                if (this.inputs.length) {
                        this.inputs.forEach(input =>
                                input.addEventListener('blur', () => {
                                        this.model[input.getAttribute('name')] = input.value;
                                        const display = this.getElements(`span.${input.getAttribute('name')}`)[0];
                                        if (display) display.innerText = input.value;
                                })
                        );
                }
        }
        reset() {
                this.inputs.forEach(input => input.value = '');
        }
        /***
         *  @method {HTMLElements} getElements
         * */
}

export const dropZoneMixin = Base => class extends Base {

        attachDropZone(listFile) {
                Array.from(this.dropZone).forEach(zone => {
                        zone.ondragover = _ => _.preventDefault();
                        zone.ondrop = z => {
                                z.preventDefault();
                                const file = z.dataTransfer.files;
                                listFile(file);
                        };
                });
        }
}
export const stepMixin = Base => class extends Base {
        set model(value) {
                this._model = value;
        }
        get model() {
                return this._model;
        }
        loadIndex() {
                this.stepNum = this.getElements('span#idx')[0];
                if (!this.model) {
                        this.model = new Step();
                        this.model.id = uuid();
                }
                this.stepIdx = this.model.index;
        }
        set stepIdx(value) {
                if (!!this.stepNum) this.stepNum.textContent = value + 1;
                if (!!this.model) this.model.index = value;
                if (!!this.stepNum && !!this.model) this.stepNum.textContent = this.model.index + 1;
        }
}

export class StepBase extends DOMElement {
        set model(value) {
                this._model = value;
        }
        get model() {
                return this._model;
        }
        loadIndex() {
                this.stepNum = this.getElements('span#idx')[0];
                if (!this._model) {
                        this._model = new Step();
                        this._model.id = uuid();
                }
                this.stepIdx = this._model.index;
        }
        set stepIdx(value) {
                if (!!this.stepNum) this.stepNum.textContent = value + 1;
                if (!!this._model) this._model.index = value;
                if (!!this.stepNum && !!this._model) this.stepNum.textContent = this._model.index + 1;
        }
}

class Step {
        constructor() {
                this.id = '';
                this.stepType = '';
                this.createId = '';
                this.created = new Date(Date.now());
                this.modified = new Date(Date.now());
                this.userId = '';
                this.data = {};
                this.index = 0;
        }
}
