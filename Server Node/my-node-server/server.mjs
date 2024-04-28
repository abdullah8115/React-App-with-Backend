// server.mjs
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Admin-01:x44051kM6HwNdeKZ@cluster0.nxxkasw.mongodb.net/my-node-server?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection failed:", err.message);
});

const signupSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});

const Signup = mongoose.model('Signup', signupSchema);

app.post('/signup', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = new Signup({ fullname, email, password });
    await user.save();
    res.status(201).send('Signup successful');
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).send('Signup failed');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Signup.findOne({ email, password });
    if (existingUser) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send('Login failed');
  }
});

// Endpoint to fetch user data
app.get('/userData', async (req, res) => {
  try {
    const users = await Signup.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).send('Failed to fetch user data');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});