const express = require("express");
const router = express.Router();
const Enrollment = require("../../models/Enrollment");
const TeacherLoad = require("../../models/TeacherLoad");
const Professor = require("../../models/User");
const Subject = require("../../models/Subject");
const Course = require("../../models/Course");

router.get("/stats", async (req, res) => {
  try {
    const currentAcademicYear = req.query.academicYear;
    const currentSemester = req.query.semester;

    console.log(currentAcademicYear, currentSemester);

    const stats = {
      totalEnrollments: await Enrollment.countDocuments({
         enrollmentStatus: "enrolled"
      }),
      totalProfessors: await Professor.countDocuments({
        accountStatus: "active",
      }),
      totalSubjects: await Subject.countDocuments(),
      totalCourses: await Course.countDocuments(),
      enrollmentStatus: await Enrollment.aggregate([
        // {
        //     $match: {
        //         academicYear: currentAcademicYear,
        //         semester: currentSemester
        //     }
        // },
        {
          $group: {
            _id: "$enrollmentStatus",
            count: { $sum: 1 },
          },
        },
      ]),
      // enrolledCount: await Enrollment.countDocuments({
      //   enrollmentStatus: "enrolled"
      // })
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/enrollments/by-course", async (req, res) => {
  try {
    const enrollmentsByCourse = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      {
        $unwind: "$courseInfo",
      },
      {
        $group: {
          _id: "$courseInfo.courseCode",
          courseColor: { $first: "$courseInfo.courseColor" },
          totalStudents: { $sum: 1 },
          byYearLevel: {
            $push: {
              yearLevel: "$yearLevel",
              count: 1,
            },
          },
        },
      },
    ]);

    console.log(enrollmentsByCourse);

    res.json(enrollmentsByCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/teacher-loads", async (req, res) => {
  try {
    const { academicYear, semester } = req.query;

    const teacherLoadStats = await TeacherLoad.aggregate([
      {
        $match: {
          academicYear,
          semester,
          status: "active",
        },
      },
      {
        $lookup: {
          from: "users",
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
          professorName: "$professorInfo.name",
          totalUnits: 1,
          totalSubjects: { $size: "$subjects" },
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

    res.json(teacherLoadStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/subjects/distribution", async (req, res) => {
  try {
    const subjectDistribution = await Subject.aggregate([
      {
        $group: {
          _id: {
            yearLevel: "$yearLevel",
            semester: "$semester",
          },
          subjects: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.yearLevel": 1,
          "_id.semester": 1,
        },
      },
    ]);

    res.json(subjectDistribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/professors/by-department", async (req, res) => {
  try {
    const professorStats = await Professor.aggregate([
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
          _id: "$departmentInfo.name",
          totalProfessors: { $sum: 1 },
          byEmploymentStatus: {
            $push: {
              status: "$academicInfo.employmentStatus",
              count: 1,
            },
          },
        },
      },
    ]);

    res.json(professorStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/recent-enrollments", async (req, res) => {
  try {
    const recentEnrollments = await Enrollment.find()
      .sort({ registrationDate: -1 })
      .limit(5)
      .populate("student")
      .populate("course");

    res.json(recentEnrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
