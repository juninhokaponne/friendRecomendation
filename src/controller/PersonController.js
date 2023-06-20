const AppError = require('../errors/error');

class PersonController {
  constructor() {
    this.people = [];
  }

  createPerson(cpf, name) {
    if (!cpf || cpf.toString().length !== 11) {
      throw new AppError('CPF must contain exactly 11 numeric digits.', 400);
    }

    if (isNaN(cpf)) {
      throw new AppError('CPF must contain 11 numeric digits.', 400);
    }

    if (this.people.find((person) => person.cpf === cpf)) {
      throw new AppError('User already exists.', 400);
    }

    const newPerson = { cpf, name };
    this.people.push(newPerson);

    return newPerson;
  }

  getPerson(cpf) {
    const person = this.people.find((person) => person.cpf === Number(cpf));

    if (!person) {
      throw new AppError('User not found.', 400);
    }

    return person;
  }

  cleanPeople() {
    this.people = [];
    return 'People cleaned successfully.';
  }
}

module.exports = PersonController;
