const AppError = require("../errors/error");
const PersonController = require("./PersonController");

class RelationshipController {
  constructor() {
    this.relationships = [];
    this.people = [];
    this.personController = new PersonController();
    this.relationshipIndex = {};
  }

  setPeople(people) {
    this.people = people;
  }

  createRelationship(cpf1, cpf2) {
    const person1 = this.personController.people.find(
      (person) => person.cpf === Number(cpf1),
    );
    const person2 = this.personController.people.find(
      (person) => person.cpf === Number(cpf2),
    );

    if (!person1 || !person2) {
      throw new AppError("One or both users not found.", 404);
    }

    if (!this.isDuplicateRelationship(person1, person2))
      this.relationships.push({ cpf1, cpf2 });
    else return "Relationship Alredy Exists";

    return "Relationship created successfully.";
  }

  isDuplicateRelationship(person1, person2) {
    return this.relationships?.some(
      ({ cpf1, cpf2 }) => cpf1 === person1.cpf && cpf2 === person2.cpf,
    );
  }

  getRecommendations(userCpf) {
    if (isNaN(userCpf)) {
      throw new AppError("CPF must contain 11 numeric digits.", 404);
    }

    const person = this.people.find(({ cpf }) => cpf === Number(userCpf));

    if (!person) {
      throw new AppError("User not found.", 404);
    }

    const friendOfFriends = this.findFriendOfFriends(userCpf);

    const recommendations = Object.keys(friendOfFriends).sort(
      (a, b) => friendOfFriends[b] - friendOfFriends[a],
    );

    return recommendations;
  }

  findFriendOfFriends(userCpf) {
    const friendOfFriends = {};

    // Build the relationship index
    for (const { cpf1, cpf2 } of this.relationships) {
      if (!this.relationshipIndex[cpf1]) {
        this.relationshipIndex[cpf1] = [];
      }

      if (!this.relationshipIndex[cpf2]) {
        this.relationshipIndex[cpf2] = [];
      }

      this.relationshipIndex[cpf1].push(cpf2);

      this.relationshipIndex[cpf2].push(cpf1);
    }

    // Find FoFs efficiently using the index
    const userFriends = this.relationshipIndex[userCpf] || [];

    for (const friendCpf of userFriends) {
      const friendRelationships = this.relationshipIndex[friendCpf] || [];

      for (const fofCpf of friendRelationships) {
        if (fofCpf !== Number(userCpf) && !userFriends.includes(fofCpf)) {
          friendOfFriends[fofCpf] = (friendOfFriends[fofCpf] || 0) + 1;
        }
      }
    }

    return friendOfFriends;
  }

  createRelationshipRoute = (req, res) => {
    const { cpf1, cpf2 } = req.body;
    this.setPeople(this.people);
    const result = this.createRelationship(cpf1, cpf2);
    res.status(result.error ? 400 : 200).json(result);
  };

  getRelationshipRoute = (req, res) => {
    const { cpf } = req.params;
    this.setPeople(this.people);
    const recommendations = this.getRecommendations(cpf);
    res.status(recommendations.error ? 400 : 200).json(recommendations);
  };
}

module.exports = RelationshipController;
