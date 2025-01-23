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
      default: "#b22222",
    },
    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.index({ courseName: 1 });

courseSchema.statics.softDelete = async function (id) {
  return await this.findByIdAndUpdate(id, { active: false }, { new: true });
};

module.exports = mongoose.model("Course", courseSchema);
