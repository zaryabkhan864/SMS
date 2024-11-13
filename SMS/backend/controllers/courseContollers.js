import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Course from "../models/course.js";

import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";


// Create get all Course   =>  /api/v1/courses
export const getCourses = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 8;
    const apiFilters = new APIFilters(Course, req.query).search().filters();

    let courses = await apiFilters.query;
    let filteredCoursesCount = courses.length;

    apiFilters.pagination(resPerPage);
    courses = await apiFilters.query.clone();

    res.status(200).json({
        resPerPage,
        filteredCoursesCount,
        courses,
    });
});

// Create new Course   =>  /api/v1/admin/Courses
export const newCourse = catchAsyncErrors(async (req, res) => {
    console.log("helllo world....")
    req.body.user = req.user._id;
    console.log("what is here", req.body);
    const course = await Course.create(req.body);

    res.status(200).json({
        course,
    });
});

// Get single course details   =>  /api/v1/courses/:id
export const getCourseDetails = catchAsyncErrors(async (req, res, next) => {

    const course = await Course.findById(req?.params?.id)

    if (!course) {
        return next(new ErrorHandler("Course not found", 404));
    }

    res.status(200).json({
        course,
    });
});


// Update course details   =>  /api/v1/courses/:id
export const updateCourse = catchAsyncErrors(async (req, res) => {
    let course = await Course.findById(req?.params?.id);

    if (!course) {
        return next(new ErrorHandler("Course not found", 404));
    }

    course = await Course.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true,
    });

    res.status(200).json({
        course,
    });
});

// Delete course   =>  /api/v1/courses/:id
export const deleteCourse = catchAsyncErrors(async (req, res) => {
    const course = await Course.findById(req?.params?.id);

    if (!course) {
        return next(new ErrorHandler("Course not found", 404));
    }

    await course.deleteOne();

    res.status(200).json({
        message: "Course Deleted",
    });
});




