const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"], trim: true },
    description: {
      type: String,
      required: [true, "post description is required"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: [true, "post category is required"],
    },
    heading: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "Author is required"],
    },
    summary: {
      type: String,
      required: [true, "summury is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);
module.exports = { PostModel };
