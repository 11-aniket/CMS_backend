import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/Constants.js";
import Lecture from "../models/lectureModal.js";

export const removeLecture = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Lecture ID is required",
        errors.mapped()
      )
    );
  }

  const lectureId = req.params.lectureId;

  try {
    const deletedLecture = await Lecture.findOneAndDelete({ _id: lectureId });

    if (!deletedLecture) {
      return res.json(jsonGenerate(StatusCode.NOT_FOUND, "Lecture not found"));
    }

    return res.json(jsonGenerate(StatusCode.SUCCESS, "Lecture deleted"));
  } catch (error) {
    console.error("Error deleting lecture:", error);
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not process", error)
    );
  }
};
