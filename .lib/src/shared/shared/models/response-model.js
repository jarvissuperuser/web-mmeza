import {Step} from "./step-model.js";
export  class Response {
    constructor() {
        this.id = '';
        this.createId = ''
        this.modified = Date.now();
        this.created = Date.now();
        this.step = new Step();
        this.userId = '';
        this.info = '';

    }
}