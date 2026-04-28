// TODO 1: Import the functions you need from ../services/studentServiceMongoDB.js
import {
  findAllStudents,
  findByIDStudents,
  createStudentService,
  updateStudentService,
  deleteStudentService,
} from "../services/studentServiceMongoDB.js";

// TODO 2: Implement each controller below
// Each controller must:
//   - be async
//   - call the matching service function and await the result
//   - respond with the correct status code and JSON
//   - catch errors and respond with an error status code + message

export const getAllStudents = async (req, res) => {
  // TODO: call findAllStudents(), return 200 + the array
  // on error: return 404 + error message
  try {
    const students = await findAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getStudentById = async (req, res) => {
  // TODO: get the id from req.params
  // call findStudentById(id), return 200 + the student
  // on error: return 404 + "Student not found"
  try {
    const student = await findStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: "Student not found" });
  }
};

export const createStudent = async (req, res) => {
  // TODO: destructure name, email, password from req.body
  // call createStudentService({ name, email, password }), return 201 + success message
  // on error: return 500 + error message
  try {
    const { name, email, password, gpa, major } = req.body;
    const student = await createStudentService({ name, email, password, gpa, major });
    res.status(201).json({ message: "Student created", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  // TODO: get the id from req.params
  // call updateStudentService(id, req.body), return 200 + the updated student
  // on error: return 500 + error message
   try {
    const updated = await updateStudentService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  // TODO: get the id from req.params
  // call deleteStudentService(id), return 200 + success message
  // on error: return 500 + error message
  try {
    const deleted = await deleteStudentService(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
