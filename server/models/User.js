const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const Role = require("./Roles");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        if (this.isNew) {
          return !this.role.some(async (roleId) => {
            const role = await Role.findById(roleId);
            return role && role.name === "professor";
          });
        }
        return (
          this.role && !this.role.some((role) => role.name === "professor")
        );
      },
    },
    name: {
      surname: { type: String },
      firstName: { type: String },
      middleName: String,
      nameExtension: String,
    },
    username: {
      type: String,
      sparse: true,
      unique: true,
    },
    role: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    employeeId: {
      type: String,
      sparse: true,
      unique: true,
    },
    academicInfo: {
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
      employmentStatus: {
        type: String,
        enum: ["full-time", "part-time"],
      },
      dateHired: Date,
    },
    accountStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.password) {
    return next();
  }

  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.virtual("fullName").get(function () {
  if (!this.name) return "";
  return `${
    this.name.firstName
  } ${this.name.middleName ? this.name.middleName + " " : ""}${this.name.surname}${this.name.nameExtension ? " " + this.name.nameExtension : ""}`;
});

userSchema.index({ "name.surname": 1, "name.firstName": 1 });
userSchema.index({ "academicInfo.department": 1 });
userSchema.index({ employeeId: 1 }, { sparse: true });

module.exports = mongoose.model("User", userSchema);
