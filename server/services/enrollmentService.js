const Enrollment = require("../models/Enrollment");
const StudentProfile = require("../models/StudentProfile");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

exports.enrollNewStudent = async (studentData, enrollmentData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const student = await StudentProfile.create([studentData], { session });

    const enrollment = await Enrollment.create(
      [
        {
          ...enrollmentData,
          student: student[0]._id,
          enrollmentType: "new",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    return { student: student[0], enrollment: enrollment[0] };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

exports.enrollContinuingStudent = async (studentId, enrollmentData) => {
  console.log(studentId, enrollmentData);
  const student = await StudentProfile.findById(studentId);
  if (!student) {
    throw new AppError("Student not found", 404);
  }

  const existingEnrollment = await Enrollment.findOne({
    student: studentId,
    academicYear: enrollmentData.academicYear,
    semester: enrollmentData.semester,
  });

  if (existingEnrollment) {
    throw new AppError("Student already enrolled for this semester", 400);
  }

  const enrollment = await Enrollment.create({
    ...enrollmentData,
    student: studentId,
    enrollmentType: "old",
  });

  return { student, enrollment };
};

exports.validatePrerequisites = async (studentId, subjects) => {
  const student = await StudentProfile.findById(studentId);
  const previousEnrollments = await Enrollment.find({
    student: studentId,
    enrollmentStatus: "completed",
  });

  const passedSubjects = new Set(
    previousEnrollments.flatMap((enrollment) =>
      enrollment.subjects
        .filter((subject) => subject.grade.finalGrade >= 75)
        .map((subject) => subject.subject.toString())
    )
  );

  const subjectsToTake = await Subject.find({
    _id: { $in: subjects },
  }).populate("prerequisites");

  const missingPrerequisites = subjectsToTake
    .filter((subject) =>
      subject.prerequisites.some(
        (prereq) => !passedSubjects.has(prereq._id.toString())
      )
    )
    .map((subject) => ({
      subject: subject.catNo,
      missingPrerequisites: subject.prerequisites
        .filter((prereq) => !passedSubjects.has(prereq._id.toString()))
        .map((prereq) => prereq.catNo),
    }));

  return missingPrerequisites;
};

exports.addSubjectsToEnrollment = async (enrollmentId, subjects) => {
  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) {
    throw new AppError("Enrollment not found", 404);
  }

  const missingPrerequisites = await this.validatePrerequisites(
    enrollment.student,
    subjects.map((s) => s.subject)
  );

  if (missingPrerequisites.length > 0) {
    throw new AppError(
      "Missing prerequisites: " + JSON.stringify(missingPrerequisites),
      400
    );
  }

  for (const subject of subjects) {
    const teacherLoad = await TeacherLoad.findById(subject.teacherLoad);
    if (teacherLoad.isSectionFull(subject.section)) {
      throw new AppError(
        `Section ${subject.section} is full for subject ${subject.subject}`,
        400
      );
    }
  }

  enrollment.subjects.push(...subjects);
  await enrollment.save();

  return enrollment;
};

exports.dropSubject = async (enrollmentId, subjectId) => {
  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) {
    throw new AppError("Enrollment not found", 404);
  }

  const subjectIndex = enrollment.subjects.findIndex(
    (s) => s._id.toString() === subjectId
  );

  if (subjectIndex === -1) {
    throw new AppError("Subject not found in enrollment", 404);
  }

  enrollment.subjects[subjectIndex].status = "dropped";
  await enrollment.save();

  return enrollment;
};

exports.getEnrollmentsByStudent = async (studentId) => {
  return await Enrollment.find({ student: studentId })
    .populate("subjects.subject")
    .populate("subjects.teacherLoad")
    .sort({ academicYear: -1, semester: -1 });
};

exports.getEnrollmentDetails = async (enrollmentId) => {
  return await Enrollment.findById(enrollmentId)
    .populate("student")
    .populate("curriculum")
    .populate("subjects.subject")
    .populate("subjects.teacherLoad");
};

exports.updatePayment = async (enrollmentId, paymentData) => {
  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) {
    throw new AppError("Enrollment not found", 404);
  }

  enrollment.payments.push(paymentData);
  enrollment.balance = enrollment.remainingBalance;
  await enrollment.save();

  return enrollment;
};
