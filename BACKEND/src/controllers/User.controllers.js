const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({
            name,
            email,
            password,
        });

        await user.save();

         const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );

        console.log("login successfully");

        res.status(201).json({
            message: "Account created successfully",
            token,
            user,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log("Email received:", email);

        const existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(201).json({ message: "No User Exist" });
        }

        if (existUser.password != password) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                _id: existUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: existUser,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { signup, login, getMe };
