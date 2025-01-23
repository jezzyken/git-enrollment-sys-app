const Course = require("../models/Course");
const AppError = require("../utils/appError");

exports.createCourse = async (data) => {
  return await Course.create(data);
};

exports.getAllCourse = async (query) => {
  const baseQuery = { $or: [{ active: true }, { active: { $exists: false } }] };
  const finalQuery = { ...baseQuery, ...query };
  return await Course.find(finalQuery)
    .populate("departments")
    .sort({ _id: -1 });
};

exports.getCourse = async (id) => {
  const course = await Course.findOne({
    _id: id,
    $or: [{ active: true }, { active: { $exists: false } }],
  });
  if (!course) throw new AppError("No course found with that ID", 404);
  return course;
};

exports.getCoursesByDepartment = async (departmentId) => {
  const courses = await Course.find({
    departments: { $in: [departmentId] },
    $or: [{ active: true }, { active: { $exists: false } }],
  }).populate("departments");

  if (!courses) throw new AppError("No courses found for this department", 404);
  return courses;
};

exports.updateCourse = async (id, data) => {
  const course = await Course.findOneAndUpdate(
    { _id: id, $or: [{ active: true }, { active: { $exists: false } }] },
    data,
    { new: true, runValidators: true }
  );
  if (!course) throw new AppError("No course found with that ID", 404);
  return course;
};

exports.deleteCourse = async (id) => {
  return await Course.softDelete(id);
};
