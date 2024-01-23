const StudentModel = require("../model/StudentModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

// token generation
const generateToken = (id) => {
  let studentId = id.toString();
  let token = jwt.sign(studentId, "Apoorv");
  return token;
};

const getStudent = async (req, res) => {
  // console.log(req.params);
  let { token } = req.params;
  let id = jwt.verify(token, "Apoorv");
  // res.send(id);
  let studentDetails = await StudentModel.findOne({ _id: id }).select(
    "-password -__id -__v"
  );
  res.send(studentDetails);
};
const StudentSignup = async (req, res) => {
  // console.log(studentDetails.body);
  let data = req.body;
  let { fname, lname, password, email, sID, mobile, gender, age } = data;
  console.log(fname, lname, password, email, sID, mobile, gender, age);
  if (
    !fname ||
    !lname ||
    !password ||
    !email ||
    !sID ||
    !mobile ||
    !gender ||
    !age
  ) {
    return res.status(400).send({ msg: "Provide all required fields" });
  }

  let isEmailAvailable = await StudentModel.findOne({ email });
  if (isEmailAvailable) {
    return res.status(401).send({ msg: "student already registered" });
  } else {
    let hasPass = await bcrypt.hash(password, 10);
    let student = { ...data, password: hasPass };
    let studentUpload = new StudentModel(student);
    await studentUpload.save();
    return res.status(201).send({ token: generateToken(studentUpload._id) });
  }
};
const StudentLogin = async (req, res) => {
  let { password, email } = req.body;
  let student = await StudentModel.findOne({ email });
  if (student) {
    let matchedPassword = await bcrypt.compare(password, student.password);
    if (matchedPassword) {
      res.status(200).send({ token: generateToken(student._id) });
    } else {
      res.status(400).send("password not match");
    }
  } else {
    res.status(400).send({ msg: "Student not registered" });
  }
};
const StudentUpdate = async(req,res)=>{
    const {email ,sID,age,fname,lname,gender,number}=req.body
    let result = await StudentModel.updateOne({email},{$set:{sID,gender,fname,lname,number,age}})
    if(result.acknowledged){
      res.status(200).send({msg:"user data updated"})
    }else{
      res.status(500).send({msg:"something is wrong"})
    }
    }

module.exports = { getStudent, StudentSignup, StudentLogin ,StudentUpdate};
