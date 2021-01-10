export const win = window;
export const doc = document;
export const store = localStorage;
export function hash() {
    return location.hash
}
export const navigate = (route) => {
    console.log('route', route);
    doc.querySelector('page-view').setAttribute('page',route);
}
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

export const addEl = (tag = 'div') => {
    return doc.createElement(tag);
}

export const goto = (href = '/') => {
    const anchor = addEl('a');
    anchor.href = href;
    anchor.target = '_blank';
    anchor.click();
}
