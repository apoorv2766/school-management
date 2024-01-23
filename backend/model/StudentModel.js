let mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    age: {
      type: "String",
      required: true,
    },
    gender: {
      type: "String",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      lowercase: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    sID: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("/student", StudentSchema);
module.exports = StudentModel;
