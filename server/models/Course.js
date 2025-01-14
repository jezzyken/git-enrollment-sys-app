const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    courseColor: {
      type: String,
      default: '#b22222'
    },
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],
  },
  {
    timestamps: true,
  }
);

courseSchema.index({ courseName: 1 });

module.exports = mongoose.model("Course", courseSchema);
