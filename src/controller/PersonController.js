const AppError = require("../errors/error");

class PersonController {
  constructor() {
    this.people = [];
  }

  createPerson(cpf, name) {
    if (!cpf || cpf.toString().length !== 11) {
      throw new AppError("CPF must contain exactly 11 numeric digits.", 400);
    }

    if (isNaN(cpf)) {
      throw new AppError("CPF must contain 11 numeric digits.", 400);
    }

    if (this.people.find((person) => person.cpf === cpf)) {
      throw new AppError("User already exists.", 400);
    }

    const newPerson = { cpf, name };
    this.people.push(newPerson);

    return newPerson;
  }

  getPerson(cpf) {
    const person = this.people.find((person) => person.cpf === Number(cpf));

    if (!person) {
      throw new AppError("User not found.", 400);
    }

    return person;
  }

  cleanPeople() {
    this.people = [];
    return "People cleaned successfully.";
  }

  createPersonRoute = (req, res) => {
    const { cpf, name } = req.body;
    const result = this.createPerson(cpf, name);
    res.status(result.error ? 400 : 200).send(result);
  };

  getPersonRoute = (req, res) => {
    const { cpf } = req.params;
    const person = this.getPerson(cpf);
    res.status(person.error ? 404 : 200).json(person);
  };

  cleanPeopleRoute = (req, res) => {
    const result = this.cleanPeople();
    res.status(200).json(result);
  };
}

module.exports = PersonController;
