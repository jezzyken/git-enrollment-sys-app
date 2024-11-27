const teacherLoadService = require("../services/teacherLoadService");
const catchAsync = require("../utils/catchAsync");
const TeacherLoad = require("../models/TeacherLoad");

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

exports.getAvailableSubjects = catchAsync(async (req, res) => {
  const { academicYear, semester } = req.query;

  const teacherLoads = await teacherLoadService.getAllTeacherLoads({
    academicYear,
    semester,
  });
  console.log(teacherLoads)

  const availableSubjects = teacherLoads.flatMap((load) =>
    load.subjects.map((subject) => ({
      _id: subject._id,
      subject: subject.subject,
      section: subject.section,
      schedule: subject.schedule,
      currentEnrollment: subject.students.length,
      teacherLoadId: load._id
    }))
  );

  res.status(200).json({
    status: "success",
    data: { subjects: availableSubjects },
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

exports.updateTeacherLoadStudents = async (req, res) => {
  try {
    const { subjectId, studentId, action } = req.body;
    const teacherLoadResults = await TeacherLoad.findById(req.params.id);

    if (!teacherLoadResults) {
      return res.status(404).json({
        success: false,
        message: "Teacher load not found",
      });
    }

    const subjectIndex = teacherLoadResults.subjects.findIndex(
      (s) => s.subject.toString() === subjectId
    );

    if (subjectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Subject not found in teacher load",
      });
    }

    if (action === "add") {
      if (
        !teacherLoadResults.subjects[subjectIndex].students.includes(studentId)
      ) {
        teacherLoadResults.subjects[subjectIndex].students.push(studentId);
      }
    } else if (action === "remove") {
      teacherLoadResults.subjects[subjectIndex].students =
        teacherLoadResults.subjects[subjectIndex].students.filter(
          (id) => id.toString() !== studentId.toString()
        );
    }

    await teacherLoadResults.save();

    res.json({
      success: true,
      message: `Student ${
        action === "add" ? "added to" : "removed from"
      } teacher load`,
      teaherLoad: teacherLoadResults,
    });
  } catch (error) {
    console.error("Error updating teacher load students:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteTeacherLoad = catchAsync(async (req, res) => {
  await teacherLoadService.deleteTeacherLoad(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.checkScheduleConflicts = catchAsync(async (req, res) => {
  const { schedule, skipSubjectId, professorId } = req.body;

  const teacherLoads = await teacherLoadService.getAllTeacherLoads({
    status: "active",
    populate: "professor",
  });

  if (!professorId) {
    throw new Error("Professor ID is required");
  }

  for (const teacherLoad of teacherLoads) {
    if (!teacherLoad?.professor?._id) continue;

    const isSameProfessor =
      teacherLoad.professor._id.toString() === professorId.toString();

    if (!Array.isArray(teacherLoad.subjects)) continue;

    for (const subject of teacherLoad.subjects) {
      if (!subject?._id) continue;
      if (
        skipSubjectId &&
        subject._id.toString() === skipSubjectId.toString()
      ) {
        continue;
      }

      if (!Array.isArray(subject.schedule)) continue;

      for (const existingSchedule of subject.schedule) {
        if (
          !existingSchedule?.day ||
          !existingSchedule?.timeStart ||
          !existingSchedule?.timeEnd
        )
          continue;

        for (const newTime of schedule) {
          if (!newTime?.day || !newTime?.timeStart || !newTime?.timeEnd)
            continue;

          if (
            existingSchedule.day === newTime.day &&
            (isSameProfessor ||
              (!isSameProfessor && existingSchedule.room === newTime.room))
          ) {
            const existingStart = new Date(
              `1970-01-01T${existingSchedule.timeStart}`
            );
            const existingEnd = new Date(
              `1970-01-01T${existingSchedule.timeEnd}`
            );
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
                    isSameProfessor,
                  },
                },
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
      hasConflict: false,
    },
  });
});
