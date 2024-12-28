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

exports.createProfessor = async (data) => {
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

  if (!data.password) {
    delete data.password;
  }

  const professor = await Professor.create(data);

  return await Professor.findById(professor._id)
    .populate({
      path: "academicInfo.department",
    })
    .populate({
      path: "role",
    });
};

exports.getAllProfessors = async (query) => {
  const professorRoleId = await getProfessorRoleId();

  const professorQuery = {
    ...query,
    role: { $in: [professorRoleId] },
    accountStatus: "active",
  };

  return await Professor.find(professorQuery)
    .populate({
      path: "academicInfo.department",
    })
    .populate({
      path: "role",
    })
    .sort({ "name.surname": 1, "name.firstName": 1 });
};

exports.getProfessor = async (id) => {
  const professorRoleId = await getProfessorRoleId();

  const professor = await Professor.findOne({
    _id: id,
    role: { $in: [professorRoleId] },
  })
    .populate({
      path: "academicInfo.department",
    })
    .populate({
      path: "role",
    });

  if (!professor) {
    throw new AppError("No professor found with that ID", 404);
  }
  return professor;
};

exports.updateProfessor = async (id, data) => {
  const professorRoleId = await getProfessorRoleId();

  if (data.role) {
    const roleSet = new Set(data.role.map((id) => id.toString()));
    roleSet.add(professorRoleId.toString());
    data.role = Array.from(roleSet).map((id) =>
      id.toString() === professorRoleId.toString() ? professorRoleId : id
    );
  }

  if (data.password === "") {
    delete data.password;
  } else if (data.password) {
    data.password = await bcrypt.hash(data.password, 12);
  }

  const professor = await Professor.findOneAndUpdate(
    {
      _id: id,
      role: { $in: [professorRoleId] },
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate({
      path: "academicInfo.department",
    })
    .populate({
      path: "role",
    });

  if (!professor) {
    throw new AppError("No professor found with that ID", 404);
  }
  return professor;
};

exports.deleteProfessor = async (id) => {
  const professorRoleId = await getProfessorRoleId();

  const professor = await Professor.findOneAndDelete({
    _id: id,
    role: { $in: [professorRoleId] },
  });

  if (!professor) {
    throw new AppError("No professor found with that ID", 404);
  }

  await TeacherLoad.deleteMany({ professor: id });

  return professor;
};

exports.getProfessorTeachingLoad = async (
  professorId,
  academicYear,
  semester
) => {
  const professorRoleId = await getProfessorRoleId();

  const professor = await Professor.findOne({
    _id: professorId,
    role: { $in: [professorRoleId] },
  });

  if (!professor) {
    throw new AppError("No professor found with that ID", 404);
  }

  const teachingLoad = await TeacherLoad.findOne({
    professor: professorId,
    academicYear,
    semester,
    status: "active",
  }).populate({
    path: "subjects.subject",
  });

  if (!teachingLoad) {
    throw new AppError("No teaching load found for this professor", 404);
  }
  return teachingLoad;
};
