const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // Node.js built-in module
const nodemailer = require('nodemailer'); // Install this package
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
const requestResetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const resetURL = `http://localhost:3535/reset-password/${resetToken}`;

        // Set up nodemailer config here
        let transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'api', 
                pass: 'c0627ef7f9afcd2a49d132434b1ff35d' 
            }
        });

        const mailOptions = {
            from: 'noreply@touvente.com',
            to: user.email,
            subject: 'Password Reset Link',
            text: `Please click on the following link to reset your password: ${resetURL}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Reset link sent to your email');
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Token is invalid or has expired" });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedNewPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Password has been reset" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
module.exports = {
    signup,
    signin,
    resetPassword,
    requestResetPassword
  };