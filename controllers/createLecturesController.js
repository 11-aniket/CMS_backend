import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/Constants.js";

import lecture from "../models/lectureModal.js";

export const createLecture = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "Lecture validation failed",
          errors.array()
        )
      );
    }

    const { course_id, instructor_id, date, description, thumbnail } = req.body;

    const existingLecture = await lecture.findOne({ instructor_id, date });
    if (existingLecture) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Some other lecture is already assigned to Instructor on same day",
          existingLecture
        )
      );
    }
    const newLecture = new lecture({
      course_id,
      instructor_id,
      date,
      description,
      thumbnail,
    });

    await newLecture.save();

    return res.json(
      jsonGenerate(
        StatusCode.SUCCESS,
        "Lecture created Successfully",
        newLecture
      )
    );
  } catch (error) {
    console.error("Error creating lecture", error);
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Something went wrong",
        error
      )
    );
  }
};
