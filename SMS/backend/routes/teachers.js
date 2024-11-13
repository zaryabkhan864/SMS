import express from "express";
import {
  deleteTeacher,
  getAdminTeachers,
  getTeacherDetails,
  getTeachers,
  newTeacher,
  updateTeacher,
} from "../controllers/teacherControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/teachers").get(getTeachers);
router
  .route("/admin/teachers")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newTeacher)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminTeachers);

router.route("/teachers/:id").get(getTeacherDetails);


router
  .route("/admin/teachers/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateTeacher);
router
  .route("/admin/teachers/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTeacher);

export default router;
