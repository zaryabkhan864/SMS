import express from "express";
import {

  // createProductReview,
  deleteStudent,
  getAdminStudents,
  // deleteProductImage,
  // deleteReview,
  // getAdminProducts,
  getStudentDetails,
  // getProductReviews,
  getStudents,
  newStudent,
  updateStudent,
  // uploadProductImages,
} from "../controllers/studentControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/students").get(getStudents);
router
  .route("/admin/students")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newStudent)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminStudents);
// router
//   .route("/admin/products")
//   .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct)
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
// router
//   .route("/admin/products")
//   .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct)
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/students/:id").get(getStudentDetails);

// router
//   .route("/admin/products/:id/upload_images")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), uploadProductImages);

// router
//   .route("/admin/products/:id/delete_image")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), deleteProductImage);

router
  .route("/admin/students/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateStudent);
router
  .route("/admin/students/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteStudent);

// router
//   .route("/reviews")
//   .get(isAuthenticatedUser, getProductReviews)
//   .put(isAuthenticatedUser, createProductReview);

// router
//   .route("/admin/reviews")
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);



export default router;
