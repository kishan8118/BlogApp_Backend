const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: [true, "Category ID is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    heading: [String],
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "Author ID is required"],
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);
module.exports = { PostModel };
