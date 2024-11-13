import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Please enter student name"],
      maxLength: [200, "Student name cannot exceed 200 characters"],
    },
    age: {
      type: Number,
      required: [true, "Please enter age of student"],
      maxLength: [2, "Student age cannot exceed 2 digits"],
    },
    gender: {
      type: String,
      required: [true, "Please enter the gender of the student"],
    },
    nationality: {
      type: String,
      required: [true, "Please enter the Nationality of the student"],
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
    classTeacher: {
      type: String,
      required: [true, "Please enter class teacher"],
    },
    studentPhoneNumber: {
      type: Number,
      required: [true, "Please Enter the student number"],
      maxLength: [10, "contact number should be 10 digits"],
    },
    parentOnePhoneNumber: {
      type: Number,
      required: [true, "Please Enter the student number"],
      maxLength: [10, "contact number should be 10 digits"],
    },
    parentTwoPhoneNumber: {
      type: Number,
      maxLength: [10, "contact number should be 10 digits"],
    },
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Grade",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: false }
);

export default mongoose.model("Student", studentSchema);