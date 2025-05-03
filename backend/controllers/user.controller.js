import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";


export const register= async (req, res) => {
  try {
    console.log(req.body)
    const { fullname, email, password,country} = req.body;

     console.log(req.body)
    // Handle Form Signup (if idToken is not provided)
    if (!fullname || !email || !password || !country) {
      return res.status(400).json({
        message: "Something is missing in the form data",
        httpOnly:true,
        success: false,
        sameSite:"Lax"
      });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists. Please login.",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      fullname,
      country,
      email,
      password: hashedPassword,
     
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log(token);

    // Return response
    return res.status(201).cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure:  true,
      sameSite: "None"
    }).json({
      message: "Account Created Successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        country:newUser.country
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please sign up first.",
        success: false,
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Prepare user data to send back (without password)
    const sanitizedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      country: user.country,
    };

    // Send response with cookie
    res.status(200).cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }).json({
      message: `Welcome back, ${sanitizedUser.fullname}!`,
      user: sanitizedUser,
      success: true,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Logout logic
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0}).json({
        message: "Logged Out Successfully",
        success: true
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
  
};