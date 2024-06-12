import jwt from "jsonwebtoken";
import createError from "../utils/appError.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import config from "../config/config.json" assert { type: "json" };

/**
 * This function use to register users to the application
 * @param {Http Request} req
 * @param {Http Response} res
 * @param {NextFunction} next
 * @returns
 */
const signUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const encryptPasswordLength = 12;

    // Check for existing users
    if (user) {
      return next(createError("User already exists!", 400));
    }

    // Encrypt password
    const hashPassword = await bcrypt.hash(
      req.body.password,
      encryptPasswordLength
    );
    // Create new user in database
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    /** Assign JWT (json web token) to user */
    const token = jwt.sign({ _id: newUser._id }, config?.auth?.jwtSecretKey, {
      expiresIn: "90d",
    });

    // Create response
    res.status(200).json({
      status: "success",
      message: "User registered successfully",
      token,
      user: {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * This function use for user login
 * @param {Http Request} req
 * @param {Http Response} res
 * @param {NextFunction} next
 * @returns
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check for existing users
    if (!user) return next(createError("User not found!", 404));

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // Create error for invalid passwords
    if (!isPasswordValid) {
      return next(createError("Invalid email or password", 401));
    }

    /** Assign JWT (json web token) to user */
    const token = jwt.sign({ _id: user._id }, config?.auth?.jwtSecretKey, {
      expiresIn: "90d",
    });

    // Create response
    res.status(200).json({
      status: "success",
      token,
      message: "User Logged successfully",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const authController = { signUp, login };

export default authController;
