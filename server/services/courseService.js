const Course = require('../models/Course');
const AppError = require('../utils/appError');

exports.createCourse = async (data) => {
  return await Course.create(data);
};

exports.getAllCourse = async (query) => {
  return await Course.find(query).populate('departments');
};

exports.getCourse = async (id) => {
  const course = await Course.findById(id);
  if (!course) {
    throw new AppError('No course found with that ID', 404);
  }
  return course;
};

exports.getCoursesByDepartment = async (departmentId) => {
  const courses = await Course.find({
    departments: { $in: [departmentId] }
  }).populate('departments');
  
  if (!courses) {
    throw new AppError('No courses found for this department', 404);
  }
  return courses;
};

exports.updateCourse = async (id, data) => {
  const course = await Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!course) {
    throw new AppError('No course found with that ID', 404);
  }
  return course;
};

exports.deleteCourse = async (id) => {
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    throw new AppError('No course found with that ID', 404);
  }
  return course;
};