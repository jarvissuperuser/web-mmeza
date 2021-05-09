import {Core} from '../core.js';

export class ModelBase extends Core{
    get model() {
        return this._model ;
    }
    set model(mdl) {
        this._model = mdl;
    }
    attributeChangedCallBack(prop, oldV, newV) {}
}

// mixin pattern

export const modelMixIn = Base => class extends Base {
    get model() {
        return this._model ;
    }
    set model(mdl) {
        this._model = mdl;
    }
    attributeChangedCallBack(prop, oldV, newV) {}
}
