const User = require('../models/user');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName, gender, birthdate } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            gender,
            birthdate
        });

        await user.save();

        res.status(201).json({ message: "User created successfully", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Hash the new password and update
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
module.exports = {
    signup,
    signin,
    resetPassword
  };