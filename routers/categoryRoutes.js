const express = require("express");
const { PostModel } = require("../model/postModel");
const { CategoryModel } = require("../model/categoryModel");
// const { authenticateToken } = require("../middleware/tokenMiddleware");

const categoryRouter = express.Router();

// @hardik Create new blog
categoryRouter.post("/add", async (req, res) => {
  try {
    const newcategory = new CategoryModel(req.body);
    await newcategory.save();
    res.status(200).json({
      message: "Category added successfully",
      blogDetails: newcategory,
      issue: false,
    });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

// @hardik get all blogs
categoryRouter.get("/", async (req, res) => {
  try {
    const category = await CategoryModel.find();
    res.status(200).json({ category });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

//@hardik update perticuler blog based on id
categoryRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await CategoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ blog });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

//@hardik delete perticuler blog based on id
categoryRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await CategoryModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog delete " });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

module.exports = {
  categoryRouter,
};
