require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const verifyToken = require("./middleware/verifyToken");

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

const HINTS = [
  process.env.HINT_LEVEL_1,
  process.env.HINT_LEVEL_2,
  process.env.HINT_LEVEL_3,
  process.env.HINT_LEVEL_4,
  process.env.HINT_LEVEL_5,
  process.env.HINT_LEVEL_6,
  process.env.HINT_LEVEL_7,
  process.env.HINT_LEVEL_8,
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

    res.status(201).json({
      _id: user._id,
      username: user.username,
      level: user.level,
      completionTime: user.completionTime,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: err.message, message: "register error" });
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

    // const options = {
    //   // expires: new Date(Date.now() + )
    // }

    res.status(201).json({
      _id: user._id,
      username: user.username,
      level: user.level,
      completionTime: user.completionTime,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: err.message, message: "login error" });
  }
});

app.post("/answer", verifyToken, async (req, res) => {
  // authorization
  try {
    const { username, level, flag } = req.body;

    if (level >= 8 || flag !== ANS[level - 1]) {
      res.status(403).json({ message: "Wrong answer..." });
    }

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.level < level - 1)
      res.status(401).json({ message: "Unauthorized..." });

    user.level = Math.min(level, 8);
    user.completionTime = new Date().getTime();

    await user.save();

    console.log(req.user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/hint", verifyToken, (req, res) => {
  try {
    const { level } = req.body;

    res.status(200).json({ hint: HINTS[level] });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user", verifyToken, async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ level: user.level });
  } catch (error) {
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
