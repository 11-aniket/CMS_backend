import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/Constants.js";
import Course from "../models/courseModal.js";

export const getCourseDetails = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.json(jsonGenerate(StatusCode.NOT_FOUND, "Course not found"));
    }

    return res.json(jsonGenerate(StatusCode.SUCCESS, "Course details", course));
  } catch (error) {
    console.error("Error fetching course details:", error);
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not process", error)
    );
  }
};
