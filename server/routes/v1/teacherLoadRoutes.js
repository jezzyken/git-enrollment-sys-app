const express = require('express');
const teacherLoadController = require('../../controllers/teacherLoadController');
const router = express.Router();

router
  .route('/')
  .get(teacherLoadController.getAllTeacherLoads)
  .post(teacherLoadController.createTeacherLoad);

router
  .route('/:id')
  .get(teacherLoadController.getTeacherLoad)
  .patch(teacherLoadController.updateTeacherLoad)
  .delete(teacherLoadController.deleteTeacherLoad);

  router
  .route('/professor/:id')
  .get(teacherLoadController.getTeacherLoads)

module.exports = router;