
export class UserResponses {
    constructor() {
        this.fullName = "";
        this.phoneNumber = "";
        this.voucher = "";
        this.answerList = [];
        this.voucherEntity = undefined;
    }
}

export class Response {
    constructor({customerId, questionIndex, response, id}) {
        this.customerId = customerId;
        this.questionIndex = questionIndex;
        this.question = '';
        this.response = response;
        this.id = id;
    }
}

export class Lead {
    constructor() {
        this.id = '';
        this.givenName = '';
        this.familyName = '';
        this.email = '';
        this.phone = '';
        this.voucherId = '';
    }
}
