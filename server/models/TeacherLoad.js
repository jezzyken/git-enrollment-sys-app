const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherLoadSchema = new Schema(
  {
    professor: {
      type: Schema.Types.ObjectId,
      ref: "Professor",
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      enum: ["First", "Second"],
      required: true,
    },
    subjects: [
      {
        subject: {
          type: Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },
        schedule: [
          {
            day: {
              type: String,
              enum: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              required: true,
            },
            timeStart: {
              type: String,
              required: true,
            },
            timeEnd: {
              type: String,
              required: true,
            },
            room: {
              type: String,
              required: true,
            },
          },
        ],
        section: {
          type: String,
          required: true,
        },
        students: [
          {
            type: Schema.Types.ObjectId,
            ref: "StudentProfile",
          },
        ],
      },
    ],
    totalUnits: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

TeacherLoadSchema.pre("save", async function (next) {
  if (this.isModified("subjects")) {
    try {
      let total = 0;
      for (const subjectLoad of this.subjects) {
        const subject = await mongoose
          .model("Subject")
          .findById(subjectLoad.subject);
        if (subject) {
          total += subject.units;
        }
      }
      this.totalUnits = total;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

TeacherLoadSchema.methods.hasScheduleConflict = function (newSchedule) {
  for (const subject of this.subjects) {
    for (const existingSchedule of subject.schedule) {
      for (const newTime of newSchedule) {
        if (existingSchedule.day === newTime.day) {
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
            return true;
          }
        }
      }
    }
  }
  return false;
};

TeacherLoadSchema.methods.getCurrentEnrollment = function (subjectId) {
  const subject = this.subjects.find(
    (s) => s.subject.toString() === subjectId.toString()
  );
  return subject ? subject.students.length : 0;
};

TeacherLoadSchema.index({ professor: 1, academicYear: 1, semester: 1 });
TeacherLoadSchema.index({ "subjects.subject": 1 });
TeacherLoadSchema.index({ status: 1 });

const TeacherLoad = mongoose.model("TeacherLoad", TeacherLoadSchema);

module.exports = TeacherLoad;
