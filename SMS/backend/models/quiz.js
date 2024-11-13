        import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {

        grade: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Grade",
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Course",
        },
        quizNumber: {
            type: Number,
            required: true,
        },
        marks: [{
            student: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Student",
            },
            question1: {
                type: Number,
                required: true,
            },
            question2: {
                type: Number,
                required: true,
            },
            question3: {
                type: Number,
                required: true,
            },
            question4: {
                type: Number,
                required: true,
            },
            question5: {
                type: Number,
                required: true,
            },
        }],
    },
    { timestamps: false }
);

export default mongoose.model("Quiz", quizSchema);