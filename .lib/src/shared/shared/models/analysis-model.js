export class Analysis {
    /**
     * @property {string} project
     * @property {string} summary
     * @property {string} src for image path
     * @property {string[]} features
     * @property {string[]} objectives
     * @property {object[]} implementation
     * @property {string} implementation.summary
     * @property {string[]} implementation.details
     * @property {string} outcomes
     */
    constructor() {
        this.id = '';
        this.project = '';
        this.src = '';
        this.summary = '';
        this.features = [];
        this.objectives = [];
        this.implementation = [];
        this.valueProposition = [];
        this.outcomes = '';
    }
}

export class Imp {
    /**
    * @property {string} summary 
    * @property {string[]} details
    */
    constructor() {
        this.summary = '';
        this.details = [];
    }
}
