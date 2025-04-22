const studentService = require('../services/student.service');

exports.createStudent = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    student ? res.status(200).json(student) : res.status(404).json({ message: "Student not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const result = await studentService.updateStudent(req.params.id, req.body);
    result[0] ? res.status(200).json({ message: "Student updated successfully" }) : res.status(404).json({ message: "Student not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const result = await studentService.deleteStudent(req.params.id);
    result ? res.status(200).json({ message: "Student deleted successfully" }) : res.status(404).json({ message: "Student not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
