const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to generate JWT token
const generateJwtToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Credential login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("User not found!");
      return res.status(400).json({ message: "User not found" });
    }

    console.log("User found:", user.email);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateJwtToken(user);

    // Return token AND safe user object (excluding password)
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        // add more fields if needed, but never password
      },
    });
  } catch (err) {
    console.error("Error during login:", err); // More detailed log
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Google login callback
exports.googleLoginCallback = async (req, res) => {
  try {
    const { user } = req; // This is set by Passport after successful login

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate JWT token using the authenticated user
    const token = generateJwtToken(user);
    console.log("Generated Token:", token);

    // User Payload to pass along with the token
    const userPayload = JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // Redirect to frontend with token and user in the query string
    res.redirect(`http://localhost:5173/auth-redirect?token=${token}&user=${encodeURIComponent(userPayload)}`);
  } catch (err) {
    console.error('Error during Google login callback:', err); // More detailed log
    res.status(500).json({ message: 'Server error during Google login', error: err.message });
  }
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const token = generateJwtToken(newUser); // Create JWT token for new user
    res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    console.error("Error during registration:", error); // More detailed log
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
};
