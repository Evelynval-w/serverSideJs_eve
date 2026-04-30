import {
  findAllCircles,
  findCircleById,
  createCircleService,
  updateCircleService,
  deleteCircleService,
} from "../services/mentorCircleService.js";

export const getAllCircles = async (req, res) => {
  try {
    const circles = await findAllCircles();
    res.status(200).json(circles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCircleById = async (req, res) => {
  try {
    const circle = await findCircleById(req.params.id);
    if (!circle) return res.status(404).json({ message: "Mentor circle not found" });
    res.status(200).json(circle);
  } catch (error) {
    res.status(404).json({ message: "Mentor circle not found" });
  }
};

export const createCircle = async (req, res) => {
  try {
    const circle = await createCircleService(req.body);
    res.status(201).json({ message: "Mentor circle created", circle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCircle = async (req, res) => {
  try {
    const updated = await updateCircleService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Mentor circle not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCircle = async (req, res) => {
  try {
    const deleted = await deleteCircleService(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Mentor circle not found" });
    res.status(200).json({ message: "Mentor circle deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
