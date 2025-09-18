export class Step {
    constructor() {
        this.id = '';
        this.stepType = '';
        this.createId = '';
        this.created = new Date(Date.now());
        this.modified = new Date(Date.now());
        this.userId = '';
        this.data = {};
        this.index = 0;
    }
}
