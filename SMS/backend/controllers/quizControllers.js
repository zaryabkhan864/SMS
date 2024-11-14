import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Course from "../models/course.js";
import Quiz from "../models/quiz.js";
import Student from "../models/student.js";
import Grade from "../models/grade.js";

export const updateQuizMarks = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    console.log("What data is in api update", id, data);
    try {
        // Assuming Quiz is your mongoose model
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Update the quiz properties based on your requirements
        quiz.grade = data.grade;
        quiz.course = data.course;
        quiz.semester = data.semester;
        quiz.term = data.term;
        quiz.quizNumber = data.quizNumber;
        quiz.marks = data.marks;

        // Save the updated quiz
        await quiz.save();

        // Send the updated quiz in the response
        res.status(200).json({
            quiz,
        });
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export const addQuizMarks = catchAsyncErrors(async (req, res) => {
    const { grade, course, semester, term, quizNumber } = req.body.variables;

    // Check if a quiz record with the given fields already exists
    const existingQuiz = await Quiz.findOne({
        grade,
        course,
        semester,
        term,
        quizNumber,
    }).populate({
        path: 'marks.student',
        select: 'studentName',
    }).populate({
        path: 'grade',
        select: 'gradeName',
    }).populate({
        path: 'course',
        select: 'courseName',
    });

    // If an existing quiz is found, return it without creating a new one
    if (existingQuiz) {
        return res.status(200).json({ success: true, data: existingQuiz });
    }

    // Fetch students for the given grade
    const gradeStudents = await Student.find({ grade });

    // Create a new quiz record with default marks
    const newQuiz = await Quiz.create({
        grade,
        course,
        semester,
        term,
        quizNumber,
        marks: gradeStudents.map(student => ({
            student: student._id,
            question1: 0,
            question2: 0,
            question3: 0,
            question4: 0,
            question5: 0,
        })),
    });

    // Populate student names, grade name, and course name in the newQuiz object
    const populatedQuiz = await Quiz.populate(newQuiz, {
        path: 'marks.student',
        select: 'studentName',
    }).populate({
        path: 'grade',
        select: 'gradeName',
    }).populate({
        path: 'course',
        select: 'courseName',
    });

    // Return the created quiz record with populated student names, grade name, and course name in the response
    res.status(201).json({ success: true, data: populatedQuiz });
});

// when i give grade id so it should return all the course of the grade
export const getCourseByGrade = catchAsyncErrors(async (req, res) => {
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
    console.log("what are courses I am receiving...", courses);

    res.status(200).json({
        success: true,
        courses,
    });
});

export const getStudentsByGrade = catchAsyncErrors(async (req, res) => {
    try {
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
    const { gradeId, semester, term, quizNumber } = req.query;
    console.log("what is inside parameters", req.query);

    // Validate input parameters
    if (!gradeId || !semester || !term || !quizNumber) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    try {
        // Query the Quiz collection using Mongoose to find quiz results
        const quizResults = await Quiz.find({
            grade: gradeId,
            semester: semester,
            term: term,
            quizNumber: quizNumber,
        })
            .populate('grade', 'name') // Populating the grade field to get the name
            .populate('course', 'name') // Populating the course field to get the name
            .populate('marks.student', 'name'); // Populating the student field in marks to get the name

        res.status(200).json({ quizResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// export const getQuizResult = catchAsyncErrors(async (req, res) => {

//     const { gradeId, courseId, quizNumber } = req.params;

//     // Validate input parameters (you may need to adjust this based on your requirements)
//     if (!gradeId || !courseId || !quizNumber) {
//         return res.status(400).json({ error: 'Invalid parameters' });
//     }

//     try {
//         // Query the Quiz collection using Mongoose to find quiz results
//         const quizResults = await Quiz.find({
//             grade: gradeId,
//             course: courseId,
//             quizNumber: quizNumber,
//         })
//             .populate('grade', 'name') // Populate the "grade" field with its name property (adjust as needed)
//             .populate('course', 'name') // Populate the "course" field with its name property (adjust as needed)
//             .populate('marks.student', 'name'); // Populate the "student" field within the "marks" array with the student's name (adjust as needed)

//         res.status(200).json({ quizResults });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });