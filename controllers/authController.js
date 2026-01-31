const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile")
const generateTokens = require("../utils/generateTokens")

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
try{
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);  //Returns true or false
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials, wrong password" });
  }

   // ✅ Generate access + refresh tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // ✅ Send refresh token in secure HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,   // set true in production with HTTPS
    sameSite: "strict"
  });

  // ✅ Send access token + user info in response
  res.json({        //response send to the client
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
 }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
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

//Logout
exports.logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};
