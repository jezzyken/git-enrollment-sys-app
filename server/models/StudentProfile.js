const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = require("./Roles");

const StudentProfileSchema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      surname: { type: String, required: true },
      firstName: { type: String, required: true },
      middleName: String,
      nameExtension: String,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    homeAddress: String,
    religion: String,
    dateOfBirth: Date,
    placeOfBirth: String,
    personalInfo: {
      gender: String,
      height: Number,
      weight: Number,
      citizenship: String,
      maritalStatus: String,
      bloodType: String,
    },
    familyInfo: {
      mothersName: String,
      fathersName: String,
    },
    contactInfo: {
      contactNumber: String,
      emailAddress: { type: String, lowercase: true },
    },
    pwd: {
      isPWD: { type: Boolean, default: false },
      disability: String,
    },
    emergencyContact: {
      contactPerson: String,
      contactNumber: String,
    },
    educationHistory: {
      elementary: {
        schoolName: String,
        schoolAddress: String,
        yearGraduated: Number,
      },
      juniorHigh: {
        schoolName: String,
        schoolAddress: String,
        yearGraduated: Number,
      },
      seniorHigh: {
        schoolName: String,
        schoolAddress: String,
        yearGraduated: Number,
      },
    },
    lastSchoolAttended: {
      academicLevel: String,
      schoolName: String,
      schoolAddress: String,
      yearGraduated: String,
    },
    accountStatus: {
      type: String,
      enum: ["active", "inactive", "suspended", "graduated"],
      default: "active",
    },
    role: {
      type: String,
      default: "student",
      enum: ["student"],
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

StudentProfileSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      let studentRole = await Role.findOne({ name: "student" });
      if (!studentRole) {
        studentRole = await Role.create({
          name: "student",
          permissions: ["read"],
          description: "Regular student access",
        });
      }
      this.role = "student";
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const StudentProfile = mongoose.model("StudentProfile", StudentProfileSchema);

module.exports = StudentProfile;
