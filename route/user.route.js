const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../modul/user.modul");
const bcrypt = require("bcrypt");

require("dotenv").config();
const userRouter = Router();

// userRouter.post("/register", async (req, res) => {
//   try {
//     const email = req.body.email;
//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       res.status(401).json({ msg: "user alredy exist" });
//     } else {
//       bcrypt.hash(req.body.password, 12, async (error, hash) => {
//         if (hash) {
//           const newUser = new UserModel({
//             ...req.body,
//             password: hash,
//           });
//           await newUser.save();
//           res.status(200).json({ msg: "user login done" });
//         }
//       });
//     }
//   } catch (error) {
//     res.status(401).json({ msg: error.message });
//   }
// });

userRouter.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(401).json({ msg: "User already exists" });
    } else {
      bcrypt.hash(req.body.password, 12, async (error, hash) => {
        if (error) {
          res.status(500).json({ msg: "Error hashing password" });
        } else {
          const newUser = new UserModel({
            ...req.body,
            password: hash,
          });
          await newUser.save();
          res.status(200).json({ msg: "User registered successfully" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (error, answer) => {
        if (answer) {
          var token = jwt.sign({ userID: user._id }, process.env.SECRET);

          res.status(200).json({ msg: "login successful", token });
        } else {
          res.status(200).json({ msg: "Incorrent password" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { userRouter };
