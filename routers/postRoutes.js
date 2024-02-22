const express = require("express");
const { PostModel } = require("../model/postModel");
const { CategoryModel } = require("../model/categoryModel");
const { authenticateToken } = require("../middleware/tokenMiddleware");

const postRoutes = express.Router();

// @hardik Create new blog //@hasim updated
postRoutes.post("/create", authenticateToken, async (req, res) => {
  try {
    const authorId = req.user;
    req.body = {
      ...req.body,
      authorId
    }
    const newBlog = new PostModel(req.body);
    await newBlog.save();
    res.status(200).json({
      message: "Blog added successfully",
      blogDetails: newBlog,
      issue: false,
    });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

// @hardik get all blogs
postRoutes.get("/", async (req, res) => {
  try {
    let filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const blogs = await PostModel.find(filter);
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

// @hardik get all blogs of the perticuler user
postRoutes.get("/", authenticateToken, async (req, res) => {
  try {
    let id = req.user;
    const blogs = await PostModel.find({ author: id });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

//@hardik update perticuler blog based on id
postRoutes.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await PostModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ blog });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

//@hardik delete perticuler blog based on id
postRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await PostModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog delete " });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

module.exports = {
  postRoutes,
};
