const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema(
  {
    catNo: {
      type: String,
      required: true,
    },
    DescriptiveTitle: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    prerequisites: [
      {
        type: String,
        default: "None",
      },
    ],
    yearLevel: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
    semester: {
      type: String,
      required: true,
      enum: ["First", "Second"],
    },
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
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

subjectSchema.pre("save", function (next) {
  if (this.course && !Array.isArray(this.course)) {
    this.course = [this.course];
  }
  next();
});

subjectSchema.statics.softDelete = async function (id) {
  return await this.findByIdAndUpdate(id, { active: false }, { new: true });
};

module.exports = mongoose.model("Subject", subjectSchema);
