
import jwt from 'jsonwebtoken';
import createError from '../utils/appError.js';
import bcrypt from 'bcryptjs';
import User from "../models/User.js";




/** Register User */
const signUp = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(createError('User already exists!', 400));
        }
        const hashPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            password: hashPassword
        });


        /** Assign JWT (json web token) to user */
        const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            user: {
                userId: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        next(error);
    }
};


/*Login User*/
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return next(createError('User not found!', 404));

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(createError("Invalid email or password", 401));
        }

        const token = jwt.sign({ _id: user._id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'success',
            token,
            message: 'Logged successfully',
            user: {
                userId: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        next(error);
    }

};





const authController = { signUp, login };

export default authController;




