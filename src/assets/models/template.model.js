import {modelMixin} from "../modelling/abstractions.js";

export class Template {
    constructor() {
        this.id = '';
        this.title = '';
        this.business = '';
        this.customerContact = '';
        this.author = '';
        this.authorContact = '';
        this.docType = '';
        this.docNumber = 'TYEARNUMBR'
    }
}

export class TemplatesModel extends modelMixin(Template) {
    describe() {
        this.id = this.prop().string(60).nn().p();
        this.title = this.prop().string(100).n();
        this.business = this.prop().string(255).n();
        this.author = this.prop().string(255).n();
        this.authorContact = this.prop().string(127).n();
        this.docType = this.prop().string(15).nn();
        this.docNumber = this.prop().string(10).nn();
    }
}