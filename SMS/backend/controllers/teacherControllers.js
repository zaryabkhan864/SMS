import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Teacher from "../models/teacher.js";

import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

export const getTeachers = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 8;
    const apiFilters = new APIFilters(Teacher, req.query).search().filters();
   
    let teachers = await apiFilters.query;
    let filteredTeachersCount = teachers.length;

    apiFilters.pagination(resPerPage);
    teachers = await apiFilters.query.clone();

    res.status(200).json({
        resPerPage,
        filteredTeachersCount,
        teachers
    });
});
// Create new Teacher   =>  /api/v1/admin/teachers
export const newTeacher = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user._id;

    const teacher = await Teacher.create(req.body);

    res.status(200).json({
        teacher,
    });
});
// Get single teacher details   =>  /api/v1/students/:id
export const getTeacherDetails = catchAsyncErrors(async (req, res, next) => {

    const teacher = await Teacher.findById(req?.params?.id)

    if (!teacher) {
        return next(new ErrorHandler("Teacher not found", 404));
    }

    res.status(200).json({
        teacher,
    });
});

// Get teachers - ADMIN   =>  /api/v1/admin/teachers
export const getAdminTeachers = catchAsyncErrors(async (req, res, next) => {
    const teachers = await Teacher.find();

    res.status(200).json({
        teachers,
    });
});

// Update teacher details   =>  /api/v1/teachers/:id
export const updateTeacher = catchAsyncErrors(async (req, res) => {
    let teacher = await Teacher.findById(req?.params?.id);

    if (!teacher) {
        return next(new ErrorHandler("Teacher not found", 404));
    }

    teacher = await Teacher.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true,
    });

    res.status(200).json({
        teacher,
    });
});
// Delete teacher   =>  /api/v1/teachers/:id
export const deleteTeacher = catchAsyncErrors(async (req, res) => {
    const teacher = await Teacher.findById(req?.params?.id);

    if (!teacher) {
        return next(new ErrorHandler("teacher not found", 404));
    }

    // Deleting image associated with product
    for (let i = 0; i < teacher?.images?.length; i++) {
        await delete_file(teacher?.images[i].public_id);
    }

    await teacher.deleteOne();

    res.status(200).json({
        message: "Teacher Deleted",
    });
});

