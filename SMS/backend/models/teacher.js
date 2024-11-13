import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        teacherName: {
            type: String,
            required: [true, "Please enter teacher name"],
            maxLength: [200, "Teacher name cannot exceed 200 characters"],
        },
        age: {
            type: Number,
            required: [true, "Please enter age of Teacher"],
            maxLength: [2, "Teacher age cannot exceed 2 digits"],
        },
        gender: {
            type: String,
            required: [true, "Please enter the gender of the teacher"],
        },
        nationality: {
            type: String,
            required: [true, "Please enter the Nationality of the teacher"],
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: false,
                },
                url: {
                    type: String,
                    required: false,
                },
            },
        ],


        teacherPhoneNumber: {
            type: Number,
            required: [true, "Please Enter the teacher number"],
            maxLength: [10, "contact number should be 10 digits"],
        },
        teacherSecondPhoneNumber: {
            type: Number,
            required: [true, "Please Enter the teacher Whatsapp number"],
            maxLength: [10, "contact number should be 10 digits"],
        },
        courses: [
            {
                course: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "course",
                },

            }
        ],

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: false }
);

export default mongoose.model("Teacher", teacherSchema);
