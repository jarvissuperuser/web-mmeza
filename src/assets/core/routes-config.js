import {doc, hash, getRoutePath} from './index.js';
import {PageView} from './mix-ins/page-view.js';
import {setEnv} from '../env.js';

export const routes = [
/*    {path: '/home', view: {element: '<explore-page></explore-page>'},visible: true},
    {path: '/templates', view: {element: '<list-page></list-page>'},visible: true},
    {path: '/chat', view: {element: '<chat-page></chat-page>'},visible: true},
    {path: '/register', view: {element: '<register-page></register-page>'}, visible: true},
    {path: '/login', view: {element: '<login-page></login-page>'}, visible: true},
    {path: '/request-reset', view: {element: '<request-reset-page></request-reset-page>'}, visible: true},
    {path: '/reset', view: {element: '<reset-page></reset-page>'}, visible: true},
    {path: '/register-business', view: {element: '<register-business></register-business>'}, visible: true},
    {path: '/dash', view: {element: '<dash-page></dash-page>'}, visible: true},
    {path: '/room', view: {element: '<room-page></room-page>'}, visible: true},
    {path: '/proposals', view: {element: '<proposal-page></proposals-page>'}, visible: true},
    {path: '/create-quiz', view: {element: '<create-quiz></create-quiz>'}, visible: true},
    {path: '/screencast', view: {element: '<recorder-page></recorder-page>'}, visible: true},
    {path: '/thank-you', view: {element: '<capture-image></capture-image>'}, visible: true},
    {path: '/create', view: {element: '<create-page></create-page>'}, visible: true},
    {path: '/uploads', view: {element: '<upload-page></upload-page>'}, visible: true},
    {path: '/pdr-page', view:{element: '<pastors-deacon-registration></pastors-deacon-registration>'}},
    {path: '/access', view: {element: '<access-gate></access-gate>'}, visible: true},
    {path: '/shop-create', view: {element: '<shop-page></shop-page>'}, visible: true},
    {path: '/manage-home', view: {element: '<manage-home></manage-home>'}, visible: true},
    {path: '/quizes', view: {element: '<list-quiz></list-quiz>'}, visible: true},
    {path: '/link', view: {element: '<link-cell></link-cell>'}, visible: true},
    {path: '/responses', view: {element: '<responses-page></responses-page>'}, visible: true},
    {path: '/budget', view: {element: '<budget-page></budget-page>'}, visible: true},*/
    {path: '/landing', view: {element: '<home-page></home-page>'}, visible:true},
    {path: '/privacy-policy', view: {element: '<priv-page></priv-page>'}, visible:true},
    {path: '/popia', view: {element: '<popia-policy></popia-policy>'}, visible:true},


];
export const navigate = (route) => {
    doc.querySelector(PageView.is).setAttribute('page',route);
}
export const excludedPaths = () => {
    return ['home/page'];
}
export const excludedPathPattern = (path) => {
    return excludedPaths().filter(pattern => path.indexOf(pattern) > 0).length
}
export const init = _ => {
    let route = hash().split('/')[1];
    if (!(hash().indexOf('home/page')>0)) {
        location.hash = route;
    }
    setEnv();
}
export const singleton = {
    resolveSingleton: Symbol()
}

export const setupSingleton = () => {
    if (!window[singleton.resolveSingleton]) window[singleton.resolveSingleton] = () => { location.hash = '/landing'  }
} 
export const resolvePath = () => {
    const route = getRoutePath()[1];
    if (routes.map(m => m.path).includes(route)) {
        navigate(route);
        if (window.postNav) window.postNav();
        return;
    }
    
    navigate(routes[0].path);
}
