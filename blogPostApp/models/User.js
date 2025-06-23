import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  fName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  lName: {
    type: String,
    required: true,
    unique: false,
    trim: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  blog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export default mongoose.model("User", userSchema);
