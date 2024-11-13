import express from 'express';
import { deleteCourse, getCourses, newCourse, updateCourse } from "../controllers/courseContollers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js"

const router = express.Router();


router.route("/courses").get(getCourses);
router.route("/admin/courses")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newCourse)
router.route("/admin/courses/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCourse);
router.route("/admin/courses/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateCourse);


export default router;