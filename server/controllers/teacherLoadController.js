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
  const teacherLoad = await teacherLoadService.updateTeacherLoad(
    req.params.id,
    req.body
  );
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

exports.checkScheduleConflicts = catchAsync(async (req, res) => {
  const { schedule, skipSubjectId, professorId } = req.body;

  // Get all active teacher loads with populated professor field
  const teacherLoads = await teacherLoadService.getAllTeacherLoads({
    status: 'active',
    populate: 'professor'
  });

  if (!professorId) {
    throw new Error('Professor ID is required');
  }

  // Check for conflicts
  for (const teacherLoad of teacherLoads) {
    // Skip if teacherLoad or professor is undefined
    if (!teacherLoad?.professor?._id) continue;

    const isSameProfessor = teacherLoad.professor._id.toString() === professorId.toString();

    if (!Array.isArray(teacherLoad.subjects)) continue;

    for (const subject of teacherLoad.subjects) {
      // Skip invalid subjects or the subject being edited
      if (!subject?._id) continue;
      if (skipSubjectId && subject._id.toString() === skipSubjectId.toString()) {
        continue;
      }

      if (!Array.isArray(subject.schedule)) continue;

      for (const existingSchedule of subject.schedule) {
        if (!existingSchedule?.day || !existingSchedule?.timeStart || !existingSchedule?.timeEnd) continue;

        for (const newTime of schedule) {
          if (!newTime?.day || !newTime?.timeStart || !newTime?.timeEnd) continue;

          // Check time conflict only if:
          // 1. Same professor (regardless of room) OR
          // 2. Different professor but same room
          if (existingSchedule.day === newTime.day &&
            (isSameProfessor || (!isSameProfessor && existingSchedule.room === newTime.room))) {

            const existingStart = new Date(`1970-01-01T${existingSchedule.timeStart}`);
            const existingEnd = new Date(`1970-01-01T${existingSchedule.timeEnd}`);
            const newStart = new Date(`1970-01-01T${newTime.timeStart}`);
            const newEnd = new Date(`1970-01-01T${newTime.timeEnd}`);

            if (
              (newStart >= existingStart && newStart < existingEnd) ||
              (newEnd > existingStart && newEnd <= existingEnd) ||
              (newStart <= existingStart && newEnd >= existingEnd)
            ) {
              return res.status(200).json({
                status: "success",
                data: {
                  hasConflict: true,
                  conflictDetails: {
                    day: existingSchedule.day,
                    existingTime: `${existingSchedule.timeStart}-${existingSchedule.timeEnd}`,
                    room: existingSchedule.room,
                    professor: teacherLoad.professor,
                    isSameProfessor
                  }
                }
              });
            }
          }
        }
      }
    }
  }

  res.status(200).json({
    status: "success",
    data: {
      hasConflict: false
    }
  });
});
