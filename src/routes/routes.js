const express = require("express");
const router = express.Router();
const PersonController = require("../controller/PersonController");
const RelationshipController = require("../controller/RelationshipController");

const personController = new PersonController();
const relationshipController = new RelationshipController();

const validateCPF = require("../middleware/validateCPF");
router.use(express.json());

router.post("/person", validateCPF, personController.createPersonRoute);
router.get("/person/:cpf", personController.getPersonRoute);
router.delete("/clean", personController.cleanPeopleRoute);

router.post("/relationship", (req, res) => {
  const { cpf1, cpf2 } = req.body;
  relationshipController.setPeople(personController.people);
  const result = relationshipController.createRelationship(cpf1, cpf2);
  res.status(result.error ? 400 : 200).json(result);
});

router.get("/recommendations/:cpf", validateCPF, (req, res) => {
  const { cpf } = req.params;
  relationshipController.setPeople(personController.people);
  const recommendations = relationshipController.getRecommendations(cpf);
  res.status(recommendations.error ? 400 : 200).json(recommendations);
});

module.exports = router;
