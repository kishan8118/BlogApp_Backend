const mongoose = require("mongoose");
const { PostModel } = require("./postModel");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);


const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
