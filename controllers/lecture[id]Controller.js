import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/Constants.js";
import Lecture from "../models/lectureModal.js";

export const getLectureDetails = async (req, res) => {
  const lectureId = req.params.lectureId;

  try {
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.json(jsonGenerate(StatusCode.NOT_FOUND, "Lecture not found"));
    }

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Lecture details", lecture)
    );
  } catch (error) {
    console.error("Error fetching lecture details:", error);
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not process", error)
    );
  }
};
