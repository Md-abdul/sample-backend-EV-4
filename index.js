const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { userRouter } = require("./route/user.route");
const { postRouter } = require("./route/post.route");
const {auth} = require("./middlewaer/auth.middlewear")

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req,res) => {
  res.send("Welcome to homePage!!")
})

app.use("/users", userRouter);
app.use("/posts", auth, postRouter);
app.listen(2010, () => {
  connect();
  console.log("server is running");
});

// mongodb+srv://mdabdulq62:nadim123@cluster0.mjympox.mongodb.net/abdulusers?retryWrites=true&w=majority
