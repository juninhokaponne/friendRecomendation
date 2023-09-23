const AppError = require("../errors/error");
class RelationshipController {
  constructor() {
    this.relationships = [];
    this.people = [];
  }

  setPeople(people) {
    this.people = people;
  }

  createRelationship(cpf1, cpf2) {
    const person1 = this.people.find((person) => person.cpf === Number(cpf1));
    const person2 = this.people.find((person) => person.cpf === Number(cpf2));

    if (!person1 || !person2) {
      throw new AppError("One or both users not found.", 404);
    }

    this.relationships.push({ cpf1, cpf2 });

    return "Relationship created successfully.";
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

    for (const { cpf1, cpf2 } of this.relationships) {
      if (cpf1 === Number(userCpf)) {
        const friend = this.people.find(({ cpf }) => cpf === Number(cpf2));

        if (friend) {
          for (const { cpf1, cpf2 } of this.relationships) {
            if (
              cpf1 === friend.cpf &&
              cpf2 !== Number(userCpf) &&
              !this.isDuplicateRelationship(userCpf, Number(cpf2))
            ) {
              const friendOfFriend = this.people.find(
                ({ cpf }) => cpf === cpf2,
              );

              if (friendOfFriend) {
                friendOfFriends[friendOfFriend.cpf] =
                  (friendOfFriends[friendOfFriend.cpf] || 0) + 1;
              }
            }
          }
        }
      }
    }

    return friendOfFriends;
  }

  isDuplicateRelationship(userCpf, friendOfFriendCpf) {
    return this.relationships.some(
      ({ cpf1, cpf2 }) =>
        cpf1 === Number(userCpf) && cpf2 === friendOfFriendCpf,
    );
  }
}

module.exports = RelationshipController;
