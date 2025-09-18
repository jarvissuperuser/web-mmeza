export class Proposal {
    constructor() {
        const today = new Date(Date.now());
        this.id = '';
        this.title = '';
        this.open = new Date(today);
        this.close = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
        this.isPublished = false;
    }
}
