import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Course from "../models/course.js";
import Quiz from "../models/quiz.js";
import Student from "../models/student.js";
import Grade from "../models/grade.js";

export const newQuiz = catchAsyncErrors(async (req, res) => {
    console.log("yes data is with me ", req.body)
    const quiz = await Quiz.create(req.body);

    res.status(200).json({
        quiz,
    });
});
// when i give grade id so it should return all the course of the grade
export const getCourseByGrade = catchAsyncErrors(async (req, res) => {
    console.log("i am here")
    const gradeId = req.params.id;

    // Find the grade by ID and populate the courses
    const grade = await Grade.findById(gradeId).populate('courses.course');

    if (!grade) {
        return res.status(404).json({
            success: false,
            message: 'Grade not found',
        });
    }

    const courses = grade.courses.map(courseObj => courseObj.course);

    res.status(200).json({
        success: true,
        courses,
    });
});

export const getStudentsByGrade = catchAsyncErrors(async (req, res) => {
    try {
        console.log('what is the id', req.params.id);
        const gradeId = req.params.id;

        // Find students by grade ID
        const students = await Student.find({ grade: gradeId }).populate('grade');

        if (!students || students.length === 0) {
            return res.status(404).json({ message: 'No students found for this grade' });
        }

        res.status(200).json({ students });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
export const getQuizResult = catchAsyncErrors(async (req, res) => {
    console.log("yes i am hit")
    console.log("what is params ", req.params)
    const { gradeId, courseId, quizNumber } = req.params;

    // Validate input parameters (you may need to adjust this based on your requirements)
    if (!gradeId || !courseId || !quizNumber) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    try {
        // Query the Quiz collection using Mongoose to find quiz results
        const quizResults = await Quiz.find({
            grade: gradeId,
            course: courseId,
            quizNumber: quizNumber,
        })
            .populate('grade', 'name') // Populate the "grade" field with its name property (adjust as needed)
            .populate('course', 'name') // Populate the "course" field with its name property (adjust as needed)
            .populate('marks.student', 'name'); // Populate the "student" field within the "marks" array with the student's name (adjust as needed)

        res.status(200).json({ quizResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});