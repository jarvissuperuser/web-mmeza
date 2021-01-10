import {hash, navigate} from "./abstraction.js";

export const routes = [
    {path: 'home', view: {element: '<home-page></home-page>'},visible: true},
    {path: 'slide', view: {element: '<slide-page></slide-page>'},visible: true},
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
    switch (location.pathname) {
        case `/${routes[0].path}`:
        case `/${routes[1].path}`:
            navigate(location.pathname.split('/').join(''))
            break;
        default:
            navigate(routes[0].path)
    }
}
