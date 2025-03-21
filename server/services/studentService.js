const StudentProfile = require("../models/StudentProfile");
const Subject = require("../models/Subject");
const Enrollment = require("../models/Enrollment");
const AppError = require("../utils/appError");

const bufferToStream = (buffer) => {
  if (!Buffer.isBuffer(buffer)) {
    buffer = Buffer.from(buffer);
  }
  return Readable.from(buffer);
};

const uploadImageToCloudinary = async (imageBuffer) => {
  if (!imageBuffer || !imageBuffer.buffer) return null;

  try {
    const stream = bufferToStream(imageBuffer.buffer);
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "student-profiles" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.pipe(uploadStream);
    });
    return result;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};

const deleteImageFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
    await cloudinary.uploader.destroy("student-profiles/" + publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};

exports.createStudent = async (studentData, imageBuffer) => {
  try {
    let imageUrl;

    if (imageBuffer) {
      const result = await uploadImageToCloudinary(imageBuffer);
      imageUrl = result?.secure_url;
    }

    const studentProfile = await StudentProfile.create({
      ...studentData,
      image: imageUrl || undefined,
    });

    return studentProfile;
  } catch (error) {
    console.log(error);
    throw new AppError(error.message, 400);
  }
};

exports.getAllStudents = async (query) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const academicYear = `${currentYear}-${currentYear + 1}`;
    const semester =
      currentMonth >= 6 && currentMonth <= 12 ? "First" : "Second";

    const students = await StudentProfile.find(query)
      .sort({ _id: -1 })
      .populate({
        path: "course",
        populate: {
          path: "departments",
        },
      })
      .populate({
        path: "enrollments",
        populate: {
          path: "subjects",
          select: "catNo DescriptiveTitle units yearLevel semester",
        },
        // match: {
        //   academicYear: academicYear,
        //   semester: semester,
        // },
        options: { sort: { createdAt: -1 } },
      });


    const enrichedStudents = await Promise.all(
      students.map(async (student) => {
        const studentObj = student.toObject();

        if (studentObj.enrollments && studentObj.enrollments.length > 0) {
          const currentEnrollment = studentObj.enrollments[0];

          const requiredSubjects = await Subject.find({
            course: student.course._id,
            yearLevel: currentEnrollment.yearLevel,
            semester: semester,
            active: true,
          });

          const requiredSubjectIds = new Set(
            requiredSubjects.map((sub) => sub._id.toString())
          );
          const enrolledSubjectIds = new Set(
            currentEnrollment.subjects.map((sub) => sub._id.toString())
          );

          let isIrregular = false;
          for (const requiredId of requiredSubjectIds) {
            if (!enrolledSubjectIds.has(requiredId)) {
              isIrregular = true;
              break;
            }
          }

          const newStatus = isIrregular ? "irregular" : "regular";
          await Enrollment.findByIdAndUpdate(currentEnrollment._id, {
            studentStatus: newStatus,
          });
          currentEnrollment.studentStatus = newStatus;
        }

        return studentObj;
      })
    );

    return enrichedStudents;
  } catch (error) {
    throw new AppError("Error fetching students: " + error.message, 500);
  }
};

exports.getStudent = async (id) => {
  const student = await StudentProfile.findById(id)
    .sort({ _id: -1 })
    .populate("course");
  if (!student) {
    throw new AppError("No student found with that ID", 404);
  }
  return student;
};

exports.updateStudent = async (id, updateData, imageBuffer) => {
  try {
    const currentStudent = await StudentProfile.findById(id);
    if (!currentStudent) {
      throw new AppError("No student found with that ID", 404);
    }

    let imageUrl = currentStudent.image;

    if (imageBuffer) {
      if (currentStudent.image) {
        await deleteImageFromCloudinary(currentStudent.image);
      }

      const result = await uploadImageToCloudinary(imageBuffer);
      imageUrl = result.secure_url;
    }

    const student = await StudentProfile.findByIdAndUpdate(
      id,
      {
        ...updateData,
        image: imageUrl,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return student;
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

exports.deleteStudent = async (id) => {
  const student = await StudentProfile.findById(id);
  if (!student) {
    throw new AppError("No student found with that ID", 404);
  }

  if (student.image) {
    await deleteImageFromCloudinary(student.image);
  }

  await StudentProfile.findByIdAndDelete(id);
  return student;
};
