import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/Constants.js";

import Course from "../models/courseModal.js";

export const createCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "Course Validation Failed",
          errors.array()
        )
      );
    }

    const { name, level, description, image_url, lectures } = req.body;

    const newCourse = await Course.create({
      name,
      level,
      description,
      image_url,
      lectures,
    });

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Course created Successfully", newCourse)
    );
  } catch (error) {
    console.error("Error creating course: ", error);
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "Something went wrong",
        error
      )
    );
  }
};
