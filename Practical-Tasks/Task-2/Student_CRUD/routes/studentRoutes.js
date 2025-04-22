const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  enrollInCourse,
} = require("../controllers/studentController");

router.route("/").get(getAllStudents).post(createStudent);

router.route("/:id").get(getStudent).put(updateStudent).delete(deleteStudent);

router.post("/:id/enroll", enrollInCourse);

module.exports = router;
