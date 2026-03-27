const service = require("../services/studentsService");

const getAll = (req, res) => res.json(service.getAllStudents());

const getOne = (req, res) => {
  const student = service.getStudentById(req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

const create = (req, res) =>
  res.status(201).json(service.createStudent(req.body));

const update = (req, res) => {
  const student = service.updateStudent(req.params.id, req.body);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

const remove = (req, res) => {
  const student = service.deleteStudent(req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

module.exports = { getAll, getOne, create, update, remove };
