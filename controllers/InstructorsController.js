import User from "../models/userModal.js";
import { StatusCode } from "../utils/Constants.js";
import { jsonGenerate } from "../utils/helper.js";

export const getallInstructors = async (req, res) => {
  try {
    const Instructors = await User.find({ role: "instructor" });

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "List of all Instructors", Instructors)
    );
  } catch (error) {
    console.error("Error fetching courses: ", error);
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Errors", error)
    );
  }
};
