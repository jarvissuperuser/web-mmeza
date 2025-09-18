export const win = window;
export const doc = document;
export const declarer = (components) => {
    for (const component of components){
        if(component.is){
            customElements.define(component.is, component);
        }
    }
}

export const dataToEl = (element,attribute, data = {}) => {
    element.setAttribute(attribute, JSON.stringify(data));
    return element;
}
export const configData = () => {}


/**
 * @return {Object}
 * */
export const addEl = (tag = '') => {
    return doc.createElement(tag);
}
export const addDepScript = (path) => {
    const script = addEl('script');
    script.src = path;
    doc.body.appendChild(script);
}
export const goto = (href = '/') => {
    const anchor = addEl('a');
    anchor.href = href;
    anchor.target = '_blank';
    anchor.click();
}
export const cleanObj = (obj) => {
    return Object.assign({}, obj);
}

export const messagesTypes = {
    info: {class:'w3-blue'},
    warning: {class: 'w3-yellow'},
    danger:{class: 'w3-red'},
    error: {class: 'w3-red'}
}
export const declareMessageBus = (data) => {
    win.globalMessages = new CustomEvent('msg', {detail: data});
    win.dispatchEvent(win.globalMessages);
}
export const processMessages =(callBack) => {
    win.addEventListener('msg', callBack);
}

// function post(data, path, callback) {
//     fetch(`${Root.server}/${path}/`, Root.prepOptions(data))
//         .then(response => response.json())
//         .then(callback)
//         .catch(error => console.log('error', error));
// }

// function get(path, callback) {
//     fetch(`${Root.server}/${path}/`, Root.prepGet())
//         .then(response => response.json())
//         .then(callback)
//         .catch(error => console.log('error', error));
// }

// static get server() {
//     if (location.host.indexOf('localhost') >= 0 || location.host.indexOf('127.0.0.1') >= 0) {
//         return "http://localhost:8000/api";
//     }
// }
//
//
// static get appSecret() {
//     return '511819c1134587985bb9eff1802a0996a5d85d0e';
// }
//
// static prepOptions(data) {
//     const requestHeaders = Root.requestHeadersMake();
//
//     const raw = JSON.stringify(data);
//     return {
//         method: 'POST',
//         headers: requestHeaders,
//         body: raw,
//         redirect: 'follow'
//     };
// }
//
// static prepGet() {
//     const requestHeaders = Root.requestHeadersMake();
//     return {
//         method: 'GET',
//         headers: requestHeaders,
//         redirect: 'follow'
//     };
// }
//
// static requestHeadersMake() {
//     const requestHeaders = new Headers();
//     requestHeaders.append("Content-Type", "application/json");
//     if (!localStorage['user_data'])
//         requestHeaders.append("Authorization", `Token ${Root.appSecret}`);
//     else
//         requestHeaders.append("Authorization", `Token ${Root._fetchToken()}`);
//     return requestHeaders;
// }
