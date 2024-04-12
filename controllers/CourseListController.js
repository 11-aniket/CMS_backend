import Course from "../models/courseModal.js";
import { StatusCode } from "../utils/Constants.js";
import { jsonGenerate } from "../utils/helper.js";

export const getallCourse = async (req, res) => {
  try {
    const courses = await Course.find();

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "List of all courses", courses)
    );
  } catch (error) {
    console.error("Error fetching courses: ", error);
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Errors", error)
    );
  }
};
