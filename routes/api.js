import express from "express";
import { check } from "express-validator";
import Register from "../controllers/RegisterController.js";
import Login from "../controllers/LoginController.js";

import { RegisterSchema } from "../Validation Schema/RegisterSchema.js";
import { LoginSchema } from "../Validation Schema/LoginSchema.js";

import { createCourse } from "../controllers/createCourseController.js";
import { getallCourse } from "../controllers/CourseListController.js";
import { removeCourse } from "../controllers/RemoveCourseController.js";
import { getCourseDetails } from "../controllers/course[id]Controller.js";

import { getallInstructors } from "../controllers/InstructorsController.js";

import { getallLectures } from "../controllers/LectureListController.js";
import { createLecture } from "../controllers/createLecturesController.js";
import { removeLecture } from "../controllers/RemoveLectureController.js";
import { getLectureDetails } from "../controllers/lecture[id]Controller.js";
import { getProfile } from "../controllers/UserProfileController.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/login", LoginSchema, Login);

apiProtected.post(
  "/createCourse",
  [
    check("name", "Course name is required").exists(),
    check("level", "Course level is required").notEmpty(),
    check("description", "Course description is required").notEmpty(),
    check("image_url", "Course image URL is required").notEmpty().isURL(),
  ],
  createCourse
);

apiProtected.post(
  "/createLecture",
  [
    check("course_id", "Course_id is required").exists(),
    check("instructor_id", "Instructor_id is required").exists(),
    check("date", "Date is required").exists(),
    check("description", "description is required").exists(),
    check("image_url", "Image is required").exists(),
  ],
  createLecture
);

apiProtected.get("/getallCourse", getallCourse);
apiProtected.get("/getCourseDetails/:courseId", getCourseDetails);
apiProtected.get("/getallInstructors", getallInstructors);
apiProtected.get("/getallLectures", getallLectures);
apiProtected.get("/getLectureDetails/:lectureId", getLectureDetails);

apiProtected.delete("/removeCourse/:courseId", removeCourse);
apiProtected.delete("/removeLectures/:lectureId", removeLecture);

apiProtected.get("/profile", getProfile);

export default apiRoute;
