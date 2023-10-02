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

router.post("/relationship", relationshipController.createRelationshipRoute);
router.get(
  "/recommendations/:cpf",
  relationshipController.getRelationshipRoute,
);

module.exports = router;
