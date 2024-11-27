const express = require("express");
const teacherLoadController = require("../../controllers/teacherLoadController");
const router = express.Router();

router
  .route("/")
  .get(teacherLoadController.getAllTeacherLoads)
  .post(teacherLoadController.createTeacherLoad);

router.post("/check-conflicts", teacherLoadController.checkScheduleConflicts);

router.get("/available-subjects", teacherLoadController.getAvailableSubjects);

router.patch("/:id/students", teacherLoadController.updateTeacherLoadStudents);

router
  .route("/:id")
  .get(teacherLoadController.getTeacherLoad)
  .patch(teacherLoadController.updateTeacherLoad)
  .delete(teacherLoadController.deleteTeacherLoad);

router.route("/professor/:id").get(teacherLoadController.getTeacherLoads);

module.exports = router;