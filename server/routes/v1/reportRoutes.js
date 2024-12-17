const express = require("express");
const router = express.Router();
const TeacherLoad = require("../../models/TeacherLoad");
const Enrollment = require("../../models/Enrollment");
const StudentProfile = require("../../models/StudentProfile");
const Professor = require("../../models/Professor");
const Subject = require("../../models/Subject");

// Get enrollment statistics for current academic year and semester
router.get("/enrollment-statistics", async (req, res) => {
  try {
    const { academicYear, semester } = req.query;

    const enrollmentStats = await Enrollment.aggregate([
      {
        $match: {
          academicYear,
          semester,
        },
      },
      {
        $group: {
          _id: {
            yearLevel: "$yearLevel",
            enrollmentStatus: "$enrollmentStatus",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(enrollmentStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get teacher load summary
router.get("/teacher-loads", async (req, res) => {
  try {
    const { academicYear, semester } = req.query;

    const teacherLoads = await TeacherLoad.aggregate([
      {
        $match: {
          academicYear,
          semester,
          status: "active",
        },
      },
      {
        $lookup: {
          from: "professors",
          localField: "professor",
          foreignField: "_id",
          as: "professorInfo",
        },
      },
      {
        $unwind: "$professorInfo",
      },
      {
        $project: {
          professorName: {
            $concat: [
              "$professorInfo.name.firstName",
              " ",
              "$professorInfo.name.surname",
            ],
          },
          totalUnits: 1,
          subjectCount: { $size: "$subjects" },
          totalStudents: {
            $reduce: {
              input: "$subjects",
              initialValue: 0,
              in: {
                $add: ["$$value", { $size: "$$this.students" }],
              },
            },
          },
        },
      },
    ]);

    res.json(teacherLoads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get student grade report
router.get("/student-grades/:studentId", async (req, res) => {
  try {
    const { academicYear, semester } = req.query;
    const { studentId } = req.params;

    const student = await StudentProfile.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const teacherLoads = await TeacherLoad.find({
      academicYear,
      semester,
      "subjects.students.student": student._id,
    })
      .populate("professor", "name")
      .populate("subjects.subject");

    const grades = [];
    teacherLoads.forEach((load) => {
      load.subjects.forEach((subject) => {
        const studentGrade = subject.students.find(
          (s) => s.student.toString() === student._id.toString()
        );
        if (studentGrade) {
          grades.push({
            subject: subject.subject.DescriptiveTitle,
            units: subject.subject.units,
            professor: `${load.professor.name.firstName} ${load.professor.name.surname}`,
            grade: studentGrade.grades.final,
            remarks: studentGrade.grades.remarks,
          });
        }
      });
    });

    res.json({
      studentInfo: {
        studentId: student.studentId,
        name: `${student.name.firstName} ${student.name.surname}`,
        course: student.course,
      },
      grades,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get subject enrollment statistics
router.get("/subject-statistics", async (req, res) => {
  try {
    const { academicYear, semester } = req.query;

    const subjectStats = await TeacherLoad.aggregate([
      {
        $match: {
          academicYear,
          semester,
          status: "active",
        },
      },
      {
        $unwind: "$subjects",
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subjects.subject",
          foreignField: "_id",
          as: "subjectInfo",
        },
      },
      {
        $unwind: "$subjectInfo",
      },
      {
        $group: {
          _id: "$subjects.subject",
          subjectName: { $first: "$subjectInfo.DescriptiveTitle" },
          totalSections: { $sum: 1 },
          totalStudents: {
            $sum: { $size: "$subjects.students" },
          },
        },
      },
    ]);

    res.json(subjectStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get department faculty summary
router.get("/department-faculty", async (req, res) => {
  try {
    const facultyStats = await Professor.aggregate([
      {
        $lookup: {
          from: "departments",
          localField: "academicInfo.department",
          foreignField: "_id",
          as: "departmentInfo",
        },
      },
      {
        $unwind: "$departmentInfo",
      },
      {
        $group: {
          _id: "$academicInfo.department",
          departmentName: { $first: "$departmentInfo.name" },
          totalFaculty: { $sum: 1 },
          byEmploymentStatus: {
            $push: {
              status: "$academicInfo.employmentStatus",
              count: 1,
            },
          },
        },
      },
    ]);

    res.json(facultyStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
