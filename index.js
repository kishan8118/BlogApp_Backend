const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./db");
const { postRoutes } = require("./routers/postRoutes");
const { userRouter } = require("./routers/usersRouters");
const { categoryRouter } = require("./routers/categoryRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "welcome" });
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", userRouter);
app.use("/api/category", categoryRouter);

app.listen(8080, async () => {
  try {
    await connectToDB;
    console.log("server is running on 8080...");
  } catch (err) {
    console.error(err);
  }
});
