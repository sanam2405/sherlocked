require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const ANS = [
  process.env.LEVEL_1,
  process.env.LEVEL_2,
  process.env.LEVEL_3,
  process.env.LEVEL_4,
  process.env.LEVEL_5,
  process.env.LEVEL_6,
  process.env.LEVEL_7,
  process.env.LEVEL_8,
];

app.get("/", (req, res) => {
  res.json("Server is running");
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).json({ message: "All fields are required..." });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      res.status(401).json("User already exists...");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const completionTime = new Date().getTime();

    const user = await User.create({
      username,
      password: encryptedPassword,
      level: 0,
      completionTime,
    });

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    user.token = token;
    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).json({ message: "All fields are required..." });
    }

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    const check = await bcrypt.compare(password, user.password);
    if (!check) res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    user.token = token;
    user.password = undefined;

    // const options = {
    //   // expires: new Date(Date.now() + )
    // }

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/answer", async (req, res) => {
  // authorization
  try {
    const { username, level, flag } = req.body;

    if (flag !== ANS[level]) {
      res.status(403).json({ message: "Wrong answer..." });
    }

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.level = level + 1;
    user.completionTime = new Date().getTime();

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(`Did not connect ${error}`));
