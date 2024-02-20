const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"], trim: true },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("category", categorySchema);
module.exports = { CategoryModel };
