import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Student from "../models/student.js";
import Grade from "../models/grade.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

// get all Students  =>  /api/v1/students
export const getStudents = catchAsyncErrors(async (req, res, next) => {
  const students = await Student.find().populate('grade');
  res.status(200).json({
    students,
  });
});
// Create new Student   =>  /api/v1/admin/products
export const newStudent = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;

  const student = await Student.create(req.body);

  res.status(200).json({
    student,
  });
});

// Get single student details   =>  /api/v1/students/:id
export const getStudentDetails = catchAsyncErrors(async (req, res, next) => {

  const student = await Student.findById(req?.params?.id).populate('courses').populate('grade');


  if (!student) {
    return next(new ErrorHandler("Student not found", 404));
  }

  res.status(200).json({
    student,
  });
});

// Get students - ADMIN   =>  /api/v1/admin/students
export const getAdminStudents = catchAsyncErrors(async (req, res, next) => {
  const students = await Student.find();

  res.status(200).json({
    students,
  });
});

// Update student details   =>  /api/v1/students/:id
export const updateStudent = catchAsyncErrors(async (req, res) => {
  let student = await Student.findById(req?.params?.id);

  if (!student) {
    return next(new ErrorHandler("Student not found", 404));
  }

  student = await Student.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    student,
  });
});

// Upload product images   =>  /api/v1/admin/products/:id/upload_images
// export const uploadProductImages = catchAsyncErrors(async (req, res) => {
//   let product = await Product.findById(req?.params?.id);

//   if (!product) {
//     return next(new ErrorHandler("Product not found", 404));
//   }

//   const uploader = async (image) => upload_file(image, "shopit/products");

//   const urls = await Promise.all((req?.body?.images).map(uploader));

//   product?.images?.push(...urls);
//   await product?.save();

//   res.status(200).json({
//     product,
//   });
// });

// Delete product image   =>  /api/v1/admin/products/:id/delete_image
// export const deleteProductImage = catchAsyncErrors(async (req, res) => {
//   let product = await Product.findById(req?.params?.id);

//   if (!product) {
//     return next(new ErrorHandler("Product not found", 404));
//   }

//   const isDeleted = await delete_file(req.body.imgId);

//   if (isDeleted) {
//     product.images = product?.images?.filter(
//       (img) => img.public_id !== req.body.imgId
//     );

//     await product?.save();
//   }

//   res.status(200).json({
//     product,
//   });
// });

// Delete student   =>  /api/v1/students/:id
export const deleteStudent = catchAsyncErrors(async (req, res) => {
  const student = await Student.findById(req?.params?.id);

  if (!student) {
    return next(new ErrorHandler("Student not found", 404));
  }

  // Deleting image associated with product
  for (let i = 0; i < student?.images?.length; i++) {
    await delete_file(student?.images[i].public_id);
  }

  await student.deleteOne();

  res.status(200).json({
    message: "Student Deleted",
  });
});

// Create/Update product review   =>  /api/v1/reviews
// export const createProductReview = catchAsyncErrors(async (req, res, next) => {
//   const { rating, comment, productId } = req.body;

//   const review = {
//     user: req?.user?._id,
//     rating: Number(rating),
//     comment,
//   };

//   const product = await Product.findById(productId);

//   if (!product) {
//     return next(new ErrorHandler("Product not found", 404));
//   }

//   const isReviewed = product?.reviews?.find(
//     (r) => r.user.toString() === req?.user?._id.toString()
//   );

//   if (isReviewed) {
//     product.reviews.forEach((review) => {
//       if (review?.user?.toString() === req?.user?._id.toString()) {
//         review.comment = comment;
//         review.rating = rating;
//       }
//     });
//   } else {
//     product.reviews.push(review);
//     product.numOfReviews = product.reviews.length;
//   }

//   product.ratings =
//     product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//     product.reviews.length;

//   await product.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });

// Get product reviews   =>  /api/v1/reviews
// export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
//   const product = await Product.findById(req.query.id).populate("reviews.user");

//   if (!product) {
//     return next(new ErrorHandler("Product not found", 404));
//   }

//   res.status(200).json({
//     reviews: product.reviews,
//   });
// });

// Delete product review   =>  /api/v1/admin/reviews
// export const deleteReview = catchAsyncErrors(async (req, res, next) => {
//   let product = await Product.findById(req.query.productId);

//   if (!product) {
//     return next(new ErrorHandler("Product not found", 404));
//   }

//   const reviews = product?.reviews?.filter(
//     (review) => review._id.toString() !== req?.query?.id.toString()
//   );

//   const numOfReviews = reviews.length;

//   const ratings =
//     numOfReviews === 0
//       ? 0
//       : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       numOfReviews;

//   product = await Product.findByIdAndUpdate(
//     req.query.productId,
//     { reviews, numOfReviews, ratings },
//     { new: true }
//   );

//   res.status(200).json({
//     success: true,
//     product,
//   });
// });


