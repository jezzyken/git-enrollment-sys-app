const express = require("express");
const departmentController = require("../../controllers/departmentController");
const { auth, authorize } = require("../../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(departmentController.getAllDepartments)
  .post(auth, departmentController.createDepartment);

router
  .route("/:id")
  .get(departmentController.getDepartment)
  .patch(auth, departmentController.updateDepartment)
  .delete(auth, departmentController.deleteDepartment);

module.exports = router;
