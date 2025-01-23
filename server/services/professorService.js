const Professor = require("../models/User");
const TeacherLoad = require("../models/TeacherLoad");
const AppError = require("../utils/appError");
const Role = require("../models/Roles");
const bcrypt = require("bcryptjs");

const getProfessorRoleId = async () => {
  const professorRole = await Role.findOne({ name: "professor" });
  if (!professorRole) {
    throw new AppError("Professor role not found in the system", 404);
  }
  return professorRole._id;
};

exports.createProfessor = async (req, data) => {
  if (!req.user.role.some((r) => r.name === "admin")) {
    const professorRoleId = await getProfessorRoleId();
    if (!data.role) {
      data.role = [professorRoleId];
    } else {
      const roleSet = new Set(data.role.map((id) => id.toString()));
      roleSet.add(professorRoleId.toString());
      data.role = Array.from(roleSet).map((id) =>
        id.toString() === professorRoleId.toString() ? professorRoleId : id
      );
    }
  }

  if (!data.password) delete data.password;

  const professor = await Professor.create(data);
  return professor.populate(["academicInfo.department", "role"]);
};

exports.getAllProfessors = async (req, query) => {
  if (!req.user.role.some((r) => r.name === "admin")) {
    const professorRoleId = await getProfessorRoleId();
    query = {
      ...query,
      role: { $in: [professorRoleId] },
      accountStatus: "active",
    };
  }

  return Professor.find(query)
    .populate(["academicInfo.department", "role"])
    .sort({ _id: -1 });
};

exports.getProfessor = async (req, id) => {
  const query = { _id: id };
  if (!req.user.role.some((r) => r.name === "admin")) {
    const professorRoleId = await getProfessorRoleId();
    query.role = { $in: [professorRoleId] };
  }

  const professor = await Professor.findOne(query).populate([
    "academicInfo.department",
    "role",
  ]);

  if (!professor) throw new AppError("Professor not found", 404);
  return professor;
};

exports.updateProfessor = async (req, id, data) => {
  if (!req.user.role.some((r) => r.name === "admin")) {
    const professorRoleId = await getProfessorRoleId();
    if (data.role) {
      const roleSet = new Set(data.role.map((id) => id.toString()));
      roleSet.add(professorRoleId.toString());
      data.role = Array.from(roleSet).map((id) =>
        id.toString() === professorRoleId.toString() ? professorRoleId : id
      );
    }
  }

  if (data.password === "") {
    delete data.password;
  } else if (data.password) {
    data.password = await bcrypt.hash(data.password, 12);
  }

  const query = { _id: id };
  if (!req.user.role.some((r) => r.name === "admin")) {
    const professorRoleId = await getProfessorRoleId();
    query.role = { $in: [professorRoleId] };
  }

  const professor = await Professor.findOneAndUpdate(query, data, {
    new: true,
    runValidators: true,
  }).populate(["academicInfo.department", "role"]);

  if (!professor) throw new AppError("Professor not found", 404);
  return professor;
};

exports.deleteProfessor = async (req, id) => {
  const query = { _id: id };
  if (!req.user.role.some((r) => r.name === "admin")) {
    const professorRoleId = await getProfessorRoleId();
    query.role = { $in: [professorRoleId] };
  }

  const professor = await Professor.softDelete(id);
  if (!professor) throw new AppError("Professor not found", 404);
  return professor;
};

exports.getProfessorTeachingLoad = async (
  req,
  professorId,
  academicYear,
  semester
) => {
  const query = { _id: professorId };
  if (!req.user.role.some((r) => r.name === "admin")) {
    const professorRoleId = await getProfessorRoleId();
    query.role = { $in: [professorRoleId] };
  }

  const professor = await Professor.findOne(query);
  if (!professor) throw new AppError("Professor not found", 404);

  const teachingLoad = await TeacherLoad.findOne({
    professor: professorId,
    academicYear,
    semester,
    status: "active",
  }).populate("subjects.subject");

  if (!teachingLoad) throw new AppError("No teaching load found", 404);
  return teachingLoad;
};
