export class Envelope{
    constructor() {
        this.name = '';
        this.budget = 0;
        this.group = group().expense;
        this.frequency = frequency().monthly;
        this.tags = [];
    }
}

export const frequency = () => {
    return {
        monthly: 'mon',
        quarterly: 'qua',
        biMonthly: 'biM',
        yearly: 'annual',
        weekily: 'weekly'
    }
}

export const group = () => ({
    expense: 'exp',
    saving: 'sav',
    credit: 'crd',
    auto: 'car',
    medical: 'med',
})


export const envelopeNames = () => ({
    car: 'car', 
    mortgage: 'mort', 
    medical: 'med',
    entertainment: 'ent',
    fuel: 'fuel',
    cell: 'cell',
    utilities: 'util',
    rent: 'rent',
    internet:'int',
    loans: 'crd',
    groceries: 'groc',
    insurance: 'ins',
})
