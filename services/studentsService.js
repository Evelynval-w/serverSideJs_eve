const students = require("../students.json");

const getAllStudents = () => students;

const getStudentById = (id) => students.find((s) => s.id === parseInt(id));

const createStudent = (data) => {
  const newStudent = { id: students.length + 1, ...data };
  students.push(newStudent);
  return newStudent;
};

const updateStudent = (id, data) => {
  const index = students.findIndex((s) => s.id === parseInt(id));
  if (index === -1) return null;
  students[index] = { ...students[index], ...data };
  return students[index];
};

const deleteStudent = (id) => {
  const index = students.findIndex((s) => s.id === parseInt(id));
  if (index === -1) return null;
  return students.splice(index, 1)[0];
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
