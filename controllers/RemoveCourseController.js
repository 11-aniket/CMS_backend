import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/Constants.js";
import Course from "../models/courseModal.js";
import lecture from "../models/lectureModal.js";

export const removeCourse = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "course id is required",
        error.mapped()
      )
    );
  }

  const courseId = req.params.courseId;
  console.log(courseId);
  try {
    const deleteCourse = await Course.findOneAndDelete({ _id: courseId });
    if (!deleteCourse) {
      return res.json(jsonGenerate(StatusCode.NOT_FOUND, "Course not found"));
    }
    await lecture.deleteMany({ course_id: courseId });
    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Course and associated lectures deleted")
    );
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not process", error)
    );
  }
};
