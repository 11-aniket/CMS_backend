import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  lectures: [
    {
      course_id: {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
      instructor_id: {
        type: Schema.Types.ObjectId,
        ref: "Instructor",
      },
      date: Date,
      description: String,
      thumbnail: String,
    },
  ],
});

export default mongoose.model("Course", courseSchema);
