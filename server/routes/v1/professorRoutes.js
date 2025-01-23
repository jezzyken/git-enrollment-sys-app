const express = require("express");
const professorController = require("../../controllers/professorController.js");
const { auth, authorize } = require("../../middleware/authMiddleware.js");
const router = express.Router();

router
  .route("/")
  .get(auth, professorController.getAllProfessors)
  .post(auth, professorController.createProfessor);

router
  .route("/:id")
  .get(auth, professorController.getProfessor)
  .patch(auth, professorController.updateProfessor)
  .delete(auth, professorController.deleteProfessor);

router
  .route("/:id/teaching-load")
  .get(auth, professorController.getProfessorTeachingLoad);

module.exports = router;
