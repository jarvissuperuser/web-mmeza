import {Expense} from '../../shared/models/expense-model.js';
import {modelMixin} from "../modelling/abstractions.js";

export class ExpensesModel extends modelMixin(Expense){
    describe () {
        this.id = this.prop().p().string(60).nn();
        this.expense = this.prop().nn().string(36);
        this.description = this.prop().n().string(36);
        this.amount = this.prop().double();
        this.date = this.prop().date().n();
        return this;
    }
}