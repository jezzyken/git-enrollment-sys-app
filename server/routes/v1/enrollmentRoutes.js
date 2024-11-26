const express = require("express");
const enrollmentController = require("../../controllers/enrollmentController");
const router = express.Router();

router.post("/new-student", enrollmentController.enrollNewStudent);

router.post(
  "/continuing-student/:studentId",
  enrollmentController.enrollContinuingStudent
);

router.post("/:enrollmentId/subjects", enrollmentController.addSubjects);

router.patch(
  "/:enrollmentId/subjects/:subjectId/drop",
  enrollmentController.dropSubject
);

router.get("/student/:studentId", enrollmentController.getStudentEnrollments);

router.get("/:enrollmentId", enrollmentController.getEnrollmentDetails);

router.post("/:enrollmentId/payment", enrollmentController.updatePayment);

module.exports = router;
