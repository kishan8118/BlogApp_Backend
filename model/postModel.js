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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
  },
  { timestamps: true }
);
postSchema.virtual('populatedAuthor', {
  ref: 'user',
  localField: 'author',
  foreignField: '_id',
  justOne: true,
});
postSchema.set('toJSON', { virtuals: true });

const PostModel = mongoose.model("post", postSchema);
module.exports = { PostModel };
