const express = require("express");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/validators/generateToken");
const multer = require("multer");
const userRouter = express.Router();
const path = require("path");
const { validator } = require("../utils/validators/authValidator");
const { authenticateToken } = require("../middleware/tokenMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname.toLowerCase());
  },
});

const upload = multer({ storage: storage });

//@hardik add profile picture
userRouter.patch(
  "/profile/:id",
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      // Check if the file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Assuming you have a 'profilePicture' field in your user model
      const avatar = req.file.filename;
      const userId = req.params.id;

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.avatar = avatar;
      await user.save();

      res.status(200).json({
        message: "Profile picture added successfully",
        BearerToken: createToken(user._id),
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//@hardik Signup User
userRouter.post("/signup", validator, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ name, email, password: hash });
      await user.save();
      res.status(200).json({
        message: "User added successfully",
        BearerToken: createToken(user._id),
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//@hardik login User
userRouter.post("/login", async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new apiError("Invalid Password or Email", 401));
  }
  if (user.isBlocked) {
    return next(new apiError("Your Account has been disabled", 403));
  }
  const token = createToken(user._id);

  delete user._doc.password;

  res.status(200).json({ token, data: user });
});

// hardik get users profile
userRouter.get("/profile", authenticateToken, async (req, res) => {
  try {
    // console.log(req.user);
    let id = req.user;
    const users = await UserModel.findById({ _id: id });
    console.log(users);
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message, issue: true });
  }
});

// @hardik update users profile
userRouter.patch("/profile/update/:id", authenticateToken, async (req, res) => {
  const id = req.user;
  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message, issue: true });
  }
});

// @hardik delete users profile
userRouter.delete(
  "/profile/delete/:id",
  authenticateToken,
  async (req, res) => {
    const id = req.user;
    try {
      const user = await UserModel.findByIdAndDelete(id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message, issue: true });
    }
  }
);

// @hasim get User data
userRouter.get("/author/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const author = await UserModel.findById({ _id: id });
      res.status(200).json({ issue: false, author: author });
    } else {
      res.status(200).json({ issue: true, message: "Author Id not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message, issue: true });
  }
});

module.exports = {
  userRouter,
};
