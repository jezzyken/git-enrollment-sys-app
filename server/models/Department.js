const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
 name: {
   type: String,
   required: true,
   unique: true
 },
 active: {
   type: Boolean,
   default: true
 }
}, {
 timestamps: true
});

departmentSchema.statics.softDelete = async function(id) {
 return await this.findByIdAndUpdate(id, { active: false }, { new: true });
};

module.exports = mongoose.model('Department', departmentSchema);