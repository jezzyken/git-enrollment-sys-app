const Department = require("../models/Department");
const AppError = require("../utils/appError");

const createDepartment = async (data) => {
  try {
    return await Department.create(data);
  } catch (error) {
    if (error.code === 11000)
      throw new AppError("Department name already exists", 400);
    throw error;
  }
};

const getAllDepartments = async () => {
  return await Department.find({
    $or: [{ active: true }, { active: { $exists: false } }],
  }).sort({ _id: -1 });
};

const getDepartmentById = async (id) => {
  const department = await Department.findOne({
    _id: id,
    $or: [{ active: true }, { active: { $exists: false } }],
  });
  if (!department) throw new AppError("Department not found", 404);
  return department;
};

const updateDepartment = async (id, data) => {
  try {
    const department = await Department.findOneAndUpdate(
      { _id: id, $or: [{ active: true }, { active: { $exists: false } }] },
      data,
      { new: true, runValidators: true }
    );
    if (!department) throw new AppError("Department not found", 404);
    return department;
  } catch (error) {
    if (error.code === 11000)
      throw new AppError("Department name already exists", 400);
    throw error;
  }
};

const deleteDepartment = async (id) => {
  return await Department.softDelete(id);
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
