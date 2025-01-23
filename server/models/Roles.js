const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

RoleSchema.statics.softDelete = async function (id) {
  return await this.findByIdAndUpdate(id, { active: false }, { new: true });
};

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
