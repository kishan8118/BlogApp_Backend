const express = require("express");
const { PostModel } = require("../model/postModel");
const { CategoryModel } = require("../model/categoryModel");
const { authenticateToken } = require("../middleware/tokenMiddleware");
const { UserModel } = require("../model/userModel");

const postRoutes = express.Router();

// @hardik Create new blog //@hasim updated
postRoutes.post("/create", authenticateToken, async (req, res) => {
  try {
    const authorId = req.user;
    const author = await UserModel.findById(authorId);
    req.body = {
      ...req.body,
      author,
    };
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

// @hardik get all blogs and filter by category
postRoutes.get("/", async (req, res) => {
  try {
    let filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const blogs = await PostModel.find(filter).populate('populatedAuthor');
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
postRoutes.patch("/update/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await PostModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ blog, issue: false });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

//@hardik delete perticuler blog based on id
postRoutes.delete("/delete/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await PostModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog delete ", issue: false });
  } catch (error) {
    res.status(200).json({ message: error.message, issue: true });
  }
});

// @hardik other user can see the other all user blog after visiting user name on singleblog page
postRoutes.get("/author/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const author = await PostModel.find({ authorId: id });
      res.status(200).json({ issue: false, author: author });
    } else {
      res.status(200).json({ issue: true, message: "Author Id not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message, issue: true });
  }
});

postRoutes.get("/categories", async (req, res) => {
  try {
    const categories = await PostModel.aggregate([
      { $group: { _id: "$category" } },
      { $project: { _id: 0, category: "$_id" } }
    ]);
    res.status(200).json({ issue: false, categories: categories })
  } catch (error) {
    res.status(400).json({ error: error.message, issue: true });

  }
})


module.exports = {
  postRoutes,
};
