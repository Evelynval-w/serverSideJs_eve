import mongoose from "mongoose";

const mentorCircleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    focus: {
      type: String,
      required: true,
    },
    chief: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    codenames: [
      {
        type: String,
      },
    ],
    foundedYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("MentorCircle", mentorCircleSchema);