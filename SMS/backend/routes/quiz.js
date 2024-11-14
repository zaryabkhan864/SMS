import express from "express";
import { addQuizMarks, getCourseByGrade, getQuizResult, getStudentsByGrade, updateQuizMarks } from "../controllers/quizControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();
router
    .route("/update_quiz/:id")
    .put(updateQuizMarks);
router.route("/course_by_id/:id").get(getCourseByGrade);
router.route("/student_by_course/:id").get(getStudentsByGrade);
router.route("/getQuizResult").get(getQuizResult);


router.route("/addQuizMarks").post(addQuizMarks)
export default router;