const TeacherLoad = require("../models/TeacherLoad");
const AppError = require("../utils/appError");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createTeacherLoad = async (data) => {

  console.log(data)
  const newTeacherLoad = await TeacherLoad.create(data);
  return await newTeacherLoad.populate([
    "professor",
    "subjects.subject",
    "subjects.students",
  ]);
};

exports.getAllTeacherLoads = async (query) => {
  return await TeacherLoad.find(query).populate([
    "professor",
    "subjects.subject",
    "subjects.students",
  ]);
};

exports.getTeacherLoads = async (id) => {

  const teacherLoad = await TeacherLoad.find({
    professor: new ObjectId(id),
  }).populate(["professor", "subjects.subject", "subjects.students"]);

  if (!teacherLoad) {
    throw new AppError("No teacher load found with that ID", 404);
  }
  return teacherLoad;
};

exports.getTeacherLoad = async (id) => {
  const teacherLoad = await TeacherLoad.findById(id).populate([
    "professor",
    "subjects.subject",
    "subjects.students",
  ]);

  if (!teacherLoad) {
    throw new AppError("No teacher load found with that ID", 404);
  }
  return teacherLoad;
};

exports.updateTeacherLoad = async (id, data) => {
  const teacherLoad = await TeacherLoad.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate(["professor", "subjects.subject", "subjects.students"]);

  if (!teacherLoad) {
    throw new AppError("No teacher load found with that ID", 404);
  }
  return teacherLoad;
};

exports.deleteTeacherLoad = async (id) => {
  const teacherLoad = await TeacherLoad.findByIdAndDelete(id);
  if (!teacherLoad) {
    throw new AppError("No teacher load found with that ID", 404);
  }
  return teacherLoad;
};
