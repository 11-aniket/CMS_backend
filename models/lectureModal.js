import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  instructor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  date: Date,
  description: String,
  thumbnail: String,
});

export default mongoose.model("Lecture", lectureSchema);
