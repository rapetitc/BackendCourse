import { Schema, model } from "mongoose"

const studentSchema = new Schema({

}, {
  timestamps: true
});

const studentModel = model("students", studentSchema)

export default studentModel