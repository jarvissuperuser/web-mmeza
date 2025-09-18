export class ChosenModel {
    constructor({id, firstname, lastname, email, phone, department, picGs}) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.department = department;
        this.picSrc = picGs;
        this.fullName = `${firstname} ${lastname}`;
    }
}