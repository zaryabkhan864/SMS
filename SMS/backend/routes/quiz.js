import express from "express";
import { getCourseByGrade, getQuizResult, getStudentsByGrade, newQuiz } from "../controllers/quizControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();
router
    .route("/quiz")
    .post(newQuiz);
router.route("/course_by_id/:id").get(getCourseByGrade);
router.route("/student_by_course/:id").get(getStudentsByGrade);
router.route("/getQuizResult/:id").get(getQuizResult);
export default router;