import MentorCircle from "../models/mentorCircleModel.js";

export const findAllCircles = () => {
  return MentorCircle.find({});
};

export const findCircleById = (id) => {
  return MentorCircle.findById(id);
};

export const createCircleService = (newCircle) => {
  return MentorCircle.create(newCircle);
};

export const updateCircleService = (id, newCircle) => {
  return MentorCircle.findByIdAndUpdate(id, newCircle, { new: true });
};

export const deleteCircleService = (id) => {
  return MentorCircle.findByIdAndDelete(id);
};