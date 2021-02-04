import {hash, navigate} from "./abstraction.js";

export const routes = [
    {path: 'home', view: {element: '<home-page></home-page>'},visible: true},
    {path: 'slide', view: {element: '<slide-page></slide-page>'},visible: true},
    {path: 'editor', view: {element: '<editor-page></editor-page>'},visible: true},
    {path: 'composer', view: {element: '<compose-page></compose-page>'},visible: true},
];
export const excludedPaths = () => {
    return ['home/page'];
}
export const excludedPathPattern = (path) => {
    return excludedPaths().filter(pattern => path.indexOf(pattern) > 0).length
}
export const init = _ => {
    let route = hash().split('/')[1];
    console.log(excludedPathPattern(hash()), 'excluded');
    if (!(hash().indexOf('home/page')>0)) {
        location.pathname = route;
    }
}

export const resolvePath = () => {
    routes.some(loc => {
        if ( `/${loc.path}` === location.pathname) {
            navigate(location.pathname.split('/').join(''));
            return true;
        }
        navigate(routes[0].path);
    });
}
