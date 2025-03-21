const Subject = require("../models/Subject");
const AppError = require("../utils/appError");

exports.createSubject = async (data) => {
  return await Subject.create(data);
};

exports.getAllSubjects = async (req) => {
  const { semester, yearLevel, course } = req.query;
  const query = { $or: [{ active: true }, { active: { $exists: false } }] };

  if (semester) query.semester = semester;
  if (yearLevel) query.yearLevel = Number(yearLevel);
  if (course) query.course = { $in: [course] };

  return await Subject.find(query)
    .populate("course")
    .sort({ _id: -1 });
};

exports.getSubject = async (id) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new AppError("No subject found with that ID", 404);
  }
  return subject;
};

exports.updateSubject = async (id, data) => {
  const subject = await Subject.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!subject) {
    throw new AppError("No subject found with that ID", 404);
  }
  return subject;
};

exports.deleteSubject = async (id) => {
  return await Subject.softDelete(id);
};

exports.getSubjectsByYearAndSemester = async (yearLevel, semester) => {
  return await Subject.find({
    yearLevel: parseInt(yearLevel),
    semester,
  });
};
