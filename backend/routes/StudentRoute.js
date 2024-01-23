let express = require("express");
const {
  getStudent,
  StudentSignup,
  StudentLogin,
  StudentUpdate
} = require("../controllers/studentController");
const studentRouter = express.Router();

studentRouter.get("/:token", getStudent);
studentRouter.post("/signup", StudentSignup);

studentRouter.post("/login", StudentLogin);
studentRouter.put("/update", StudentUpdate);

module.exports = studentRouter;
