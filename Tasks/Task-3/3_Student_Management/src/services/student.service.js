const { Student } = require('../models');

const createStudent = async (data) => await Student.create(data);
const getAllStudents = async () => await Student.findAll();
const getStudentById = async (id) => await Student.findByPk(id);
const updateStudent = async (id, data) => await Student.update(data, { where: { id } });
const deleteStudent = async (id) => await Student.destroy({ where: { id } });

module.exports = { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };
