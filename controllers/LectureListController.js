import lecture from "../models/lectureModal.js";
import { StatusCode } from "../utils/Constants.js";
import { jsonGenerate } from "../utils/helper.js";

export const getallLectures = async (req, res) => {
  try {
    const allLectures = await lecture.find();
    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "List of all Lectures", allLectures)
    );
  } catch (error) {
    console.error("Error fetching courses: ", error);
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Errors", error)
    );
  }
};
