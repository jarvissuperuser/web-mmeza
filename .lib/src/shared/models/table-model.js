export class TableModel {
    constructor() {
        this.id = ''
        this.date = Date.now();
        this.docNumber = 'I202100001';
        this.docType = 'Invoice'
        this.title = '';
        this.customerName = 'Customer Name';
        this.customerContact = '+27 00 000 000';
        this.tableRows = []
        this.tableHead = {}
        this.total = 0.001;
        this.terms = ['Regards'];
        this.author = 'Timothy Mu'
        this.authorContact = 'timothym@mukuwemoyoengineering.co.za'
    }
}
