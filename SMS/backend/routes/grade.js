import express from 'express';
import { deleteGrade, getGradeDetails, getGrades, newGrade, updateGrade } from "../controllers/gradeControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js"

const router = express.Router();


router.route("/grades").get(getGrades);
router.route("/admin/grades")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newGrade)
router.route("/admin/grades/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteGrade);
router.route("/admin/grades/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getGradeDetails)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateGrade);


export default router;