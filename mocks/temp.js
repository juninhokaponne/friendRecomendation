const express = require('express');
const app = express();
app.use(express.json());

let people = [
  { cpf: 11145153620, name: 'Jhon Duo' },
  { cpf: 32145153513, name: 'Bob Busquet' },
  { cpf: 56345103684, name: 'Cloe Spencer' },
  { cpf: 96245193472, name: 'Harper Oliver' },
  { cpf: 45745173411, name: "Noah M'carem" },
];
let relationships = [];
console.log('people -> ', people);
console.log('relationships -> ', relationships);

// Rota: Create Person
app.post('/person', (req, res) => {
  const { cpf, name } = req.body;
  if (isNaN(cpf)) {
    return res.status(400).send('CPF must contain 11 numeric digits.');
  }
  if (people.find((person) => person.cpf === cpf)) {
    return res.status(400).send('User already exists.');
  }
  const newPerson = { cpf, name };
  people.push(newPerson);
  console.log(people);
  res.sendStatus(200);
});

// Rota: Get Person
app.get('/person/:cpf', (req, res) => {
  const { cpf } = req.params;
  const person = people.find((person) => {
    return person.cpf === Number(cpf);
  });
  if (!person) {
    return res.status(404).send('User not found.');
  }
  res.json(person);
});

// Rota: Clean
app.delete('/clean', (req, res) => {
  people = [];
  relationships = [];
  res.sendStatus(200);
});

// Rota: Create Relationship
app.post('/relationship', (req, res) => {
  const { cpf1, cpf2 } = req.body;
  const person1 = people.find((person) => person.cpf === Number(cpf1));
  const person2 = people.find((person) => person.cpf === Number(cpf2));

  if (!person1 || !person2) {
    return res.status(404).send('One or both users not found.');
  }
  relationships.push({ cpf1, cpf2 });

  console.log('relationships -> ', relationships);
  res.sendStatus(200);
});

app.get('/recommendations/:cpf', (req, res) => {
  const { cpf } = req.params;
  if (isNaN(cpf)) {
    return res.status(400).send('CPF must contain 11 numeric digits.');
  }
  const person = people.find((person) => person.cpf === Number(cpf));
  console.log('person -> ', person);

  if (!person) {
    return res.status(404).send('User not found.');
  }

  const friendOfFriends = {};
  for (const relationship of relationships) {
    if (relationship.cpf1 === Number(cpf)) {
      const friend = people.find((person) => person.cpf === relationship.cpf2);

      if (friend) {
        for (const relationship of relationships) {
          if (relationship.cpf1 === Number(cpf)) {
            const friend = people.find(
              (person) => person.cpf === relationship.cpf2,
            );
            if (friend) {
              for (const relationship2 of relationships) {
                if (
                  relationship2.cpf1 === friend.cpf &&
                  relationship2.cpf2 !== Number(cpf) &&
                  !relationships.find(
                    (rel) =>
                      rel.cpf1 === Number(cpf) &&
                      rel.cpf2 === relationship2.cpf2,
                  )
                ) {
                  const friendOfFriend = people.find(
                    (person) => person.cpf === relationship2.cpf2,
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
      }
    }
  }

  const recommendations = Object.keys(friendOfFriends).sort(
    (a, b) => friendOfFriends[b] - friendOfFriends[a],
  );
  res.json(recommendations);
});

// Inicialização do servidor
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

function isDuplicateRelationship(userCpf, friendOfFriendCpf) {
  return relationships.some(
    ({ cpf1, cpf2 }) => cpf1 === Number(userCpf) && cpf2 === friendOfFriendCpf,
  );
}
