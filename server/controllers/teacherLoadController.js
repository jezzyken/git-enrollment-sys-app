const teacherLoadService = require("../services/teacherLoadService");
const catchAsync = require("../utils/catchAsync");

exports.createTeacherLoad = catchAsync(async (req, res) => {
  const teacherLoad = await teacherLoadService.createTeacherLoad(req.body);
  res.status(201).json({
    status: "success",
    data: { teacherLoad },
  });
});

exports.getAllTeacherLoads = catchAsync(async (req, res) => {
  const teacherLoads = await teacherLoadService.getAllTeacherLoads(req.query);
  res.status(200).json({
    status: "success",
    results: teacherLoads.length,
    data: { teacherLoads },
  });
});

exports.getTeacherLoad = catchAsync(async (req, res) => {
  const teacherLoad = await teacherLoadService.getTeacherLoad(req.params.id);
  res.status(200).json({
    status: "success",
    data: { teacherLoad },
  });
});

exports.getTeacherLoads = catchAsync(async (req, res) => {
  const teacherLoads = await teacherLoadService.getTeacherLoads(req.params.id);
  res.status(200).json({
    status: "success",
    data: { teacherLoads },
  });
});

exports.updateTeacherLoad = catchAsync(async (req, res) => {
  const teacherLoad = await teacherLoadService.updateTeacherLoad(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: { teacherLoad },
  });
});

exports.deleteTeacherLoad = catchAsync(async (req, res) => {
  await teacherLoadService.deleteTeacherLoad(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});