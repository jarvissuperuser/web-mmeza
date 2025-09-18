export class Quiz{
    constructor() {
        this.id = '';
        this.createId = '';
        this.quizId = '';
        this.created = new Date(Date.now());
        this.modified = new Date(Date.now());
        this.title = '';
        this.description = '';
    }
}