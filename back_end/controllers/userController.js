const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'onepiece', { expiresIn: '1h' });
};

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, admin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      admin
    });

    await user.save();

    const token = generateToken(user._id); // Generate a token upon successful signup

    res.status(201).json({ message: "User created successfully", userId: user._id, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ message: "Login successful", user: user, token });
  } catch (error) {
    console.log(error)
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

    transporter.sendMail(mailOptions, function (error, info) {
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
const getUserData = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userData = {
            id: user._id,
            email: user.email,
            admin:user.admin,
        };
        console.log(userData)
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
};  

module.exports = {
  signup,
  signin,
  resetPassword,
  requestResetPassword,
  getUserData
};
