const StudentProfile = require("../models/StudentProfile");
const AppError = require("../utils/appError");
const { Readable } = require("stream");

const bufferToStream = (buffer) => {
  return Readable.from(buffer);
};

const uploadImageToCloudinary = async (imageBuffer) => {
  if (!imageBuffer) return null;

  const stream = bufferToStream(imageBuffer);
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "student-profiles",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.pipe(uploadStream);
  });
};

const deleteImageFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    // Extract public_id from the Cloudinary URL
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
      imageUrl = result.secure_url;
    }

    const studentProfile = await StudentProfile.create({
      ...studentData,
      image: imageUrl || undefined,
    });

    return studentProfile;
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

exports.getAllStudents = async (query) => {
  return await StudentProfile.find(query)
    .populate("course")
    .populate({
      path: "enrollments",
      select: "enrollmentStatus academicYear semester",
      options: { sort: { createdAt: -1 } },
    });
};

exports.getStudent = async (id) => {
  const student = await StudentProfile.findById(id);
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
