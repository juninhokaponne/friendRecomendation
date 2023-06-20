const express = require('express');

const router = express.Router();

const PersonController = require('../controller/PersonController');
const RelationshipController = require('../controller/RelationshipController');

const personController = new PersonController();
const relationshipController = new RelationshipController();

const validateCPF = require('../middleware/validateCPF');

router.use(express.json());

router.post('/person', validateCPF, (req, res) => {
  const { cpf, name } = req.body;
  const result = personController.createPerson(cpf, name);
  res.status(result.error ? 400 : 200).send(result);
});

router.get('/person/:cpf', (req, res) => {
  const { cpf } = req.params;
  const person = personController.getPerson(cpf);
  res.status(person.error ? 404 : 200).json(person);
});

router.delete('/clean', (req, res) => {
  const result = personController.cleanPeople();
  res.status(200).send(result);
});

router.post('/relationship', (req, res) => {
  const { cpf1, cpf2 } = req.body;
  relationshipController.setPeople(personController.people);
  const result = relationshipController.createRelationship(cpf1, cpf2);
  res.status(result.error ? 400 : 200).json(result);
});

router.get('/recommendations/:cpf', validateCPF, (req, res) => {
  const { cpf } = req.params;
  relationshipController.setPeople(personController.people);
  const recommendations = relationshipController.getRecommendations(cpf);
  res.status(recommendations.error ? 400 : 200).json(recommendations);
});

module.exports = router;
