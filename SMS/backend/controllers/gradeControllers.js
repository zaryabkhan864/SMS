import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Grade from "../models/grade.js";

import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";


// Create get all Grade   =>  /api/v1/grades
export const getGrades = catchAsyncErrors(async (req, res, next) => {

    const grades = await Grade.find();
    res.status(200).json({
        grades,
    });
});

// Create new Grade   =>  /api/v1/admin/Grades
export const newGrade = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user._id;
    const grade = await Grade.create(req.body);

    res.status(200).json({
        grade,
    });
});

// Get single grade details   =>  /api/v1/grades/:id
export const getGradeDetails = catchAsyncErrors(async (req, res, next) => {

    const grade = await Grade.findById(req?.params?.id)

    if (!grade) {
        return next(new ErrorHandler("Grade not found", 404));
    }

    res.status(200).json({
        grade,
    });
});


// Update grade details   =>  /api/v1/grades/:id
export const updateGrade = catchAsyncErrors(async (req, res) => {
    let grade = await Grade.findById(req?.params?.id);

    if (!grade) {
        return next(new ErrorHandler("Grade not found", 404));
    }

    grade = await Grade.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true,
    });

    res.status(200).json({
        grade,
    });
});

// Delete grade   =>  /api/v1/grades/:id
export const deleteGrade = catchAsyncErrors(async (req, res) => {
    const grade = await Grade.findById(req?.params?.id);

    if (!grade) {
        return next(new ErrorHandler("Grade not found", 404));
    }

    await grade.deleteOne();

    res.status(200).json({
        message: "Grade Deleted",
    });
});




