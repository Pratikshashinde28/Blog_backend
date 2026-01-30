const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile")

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "User already exists" });
  }
};


// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);  //Returns true or false
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials, wrong password" });
  }

  const token = jwt.sign({ id: user._id }, "access_secret_key", {  
    expiresIn: "1d"
  });

  res.json({        //response send to the client
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

/**
 * POST /profile
 * Create profile (only once)
 */
exports.createProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {name,bio, avatar, isPublic } = req.body;

    const existingProfile = await Profile.findOne({  userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = new Profile({
      userId,
      name,
      bio,
      avatar,
      isPublic
    });
    
    await profile.save();
    res.status(201).json({message:"Profile created successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};