import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: [true, "Please enter course name"],
            maxLength: [200, "Course name cannot exceed 200 characters"],
        },
        description: {
            type: String,
            required: [true, "Please enter description of course"],
            maxLength: [200, "Course description cannot exceed 200 characters"],
        },
        code: {
            type: String,
            required: [true, "Please enter the code of course"],
        },
        year: {
            type: String,
            required: [true, "Please enter the year of course offer"],
        },

    },
    { timestamps: false }
);

export default mongoose.model("Course", courseSchema);