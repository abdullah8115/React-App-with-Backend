const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://Admin-01:x44051kM6HwNdeKZ@cluster0.nxxkasw.mongodb.net/my-node-server?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

const signupSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});

const Signup = mongoose.model("Signup", signupSchema);

app.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(409).send("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Signup({ fullname, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ email: user.email }, "your_secret_key");

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).send("Signup failed");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      console.log(existingUser)
      const passwordMatch = bcrypt.compare(password, existingUser.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { email: existingUser.email },
          "your_secret_key"
        );

        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000,
        });

        res.status(200).send({
          message: "Login successful",
          data: existingUser,
          token: token
        });
      } else {
        res.status(401).send("Invalid email or password");
      }
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send("Login failed");
  }
});

app.get("/userData", async (req, res) => {
  try {
    const users = await Signup.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).send("Failed to fetch user data");
  }
});

app.post("/logout", async (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});