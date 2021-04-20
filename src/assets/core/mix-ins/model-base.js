import {Root} from '../root.js';

export class ModelBase extends Root{
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
