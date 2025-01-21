const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

/**
 * Generates a JWT token based on the provided user ID.
 * @param {string} id - The user ID.
 * @returns {string} The generated JWT token.
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

/**
 * Registers a new user based on the provided request body and generates a token for authentication.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the user is successfully registered.
 * @throws {Error} If there is an issue with registering the user, an error is thrown with a corresponding message.
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password, role });

    if (!user) {
        res.status(400);
        throw new Error('Invalid user data');
    }

    const token = generateToken(user._id);

    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
    });

    const { _id } = user;
    res.status(200).json({
        _id,
        name,
        email,
        role,
    });
});

/**
 * Logs in a user based on the provided email and password, and generates a token for authentication.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged in.
 * @throws {Error} If there is an issue with logging in the user, an error is thrown with a corresponding message.
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('User not found, please signup');
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
        res.status(400);
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id);

    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
    });

    const { _id, name } = user;
    res.status(200).json({
        _id,
        name,
        email,
    });
});

/**
 * Logs out the current user by clearing the token cookie.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} A response indicating that the user has been successfully logged out.
 */
const logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        path: '/',
        httpOnly: true,
        maxAge: 0,
        sameSite: 'none',
        secure: true,
    });
    return res.status(200).json({ message: 'Successfully Logged Out' });
});

/**
 * Retrieves the user data for the current authenticated user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the user data is successfully retrieved.
 * @throws {Error} If the user data is not found, an error is thrown with a corresponding message.
 */
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
        res.status(400);
        throw new Error('User Not Found');
    }

    res.status(200).json(user);
});

/**
 * Retrieves the login status of the current user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} A response indicating the current login status.
 */
const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return res.json(true);
    } catch {
        return res.json(false);
    }
});

/**
 * Updates the user information for the current authenticated user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the user information is successfully updated.
 * @throws {Error} If there is an issue with updating the user information, an error is thrown with a corresponding message.
 */
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404).json({ msg: 'User not found' });
        return;
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.phone = req.body.phone || user.phone;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
});

/**
 * Changes the password for the current authenticated user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the password is successfully changed.
 * @throws {Error} If there is an issue with changing the password, an error is thrown with a corresponding message.
 */
const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body;

    if (!user) {
        res.status(400);
        throw new Error('User not found, please signup');
    }

    if (!oldPassword || !password) {
        res.status(400);
        throw new Error('Please add old and new password');
    }

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!passwordIsCorrect) {
        res.status(400);
        throw new Error('Old Password is Incorrect');
    }

    user.password = password;
    await user.save();
    res.status(200).send('Password change successful');
});

/**
 * Handles the process of sending a reset password email to the provided email address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the reset password email is successfully sent.
 * @throws {Error} If there is an issue with sending the reset password email, an error is thrown with a corresponding message.
 */
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User does not exist');
    }

    await Token.findOneAndDelete({ userId: user._id });

    const resetToken = crypto.randomBytes(32).toString('hex') + user._id;

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * 60 * 1000, // thirty minutes
    }).save();

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>
        <p>This reset link is valid for only 30 Minutes.</p>
        
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        <p>Regards...</p>
        <p>Pinvent Team</p>
    `;

    const subject = 'Password Reset Request';
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try {
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({ success: true, message: 'Reset Email Sent' });
    } catch (error) {
        res.status(500);
        throw new Error('Email not sent, please try again');
    }
});

/**
 * Handles the password reset process by verifying the reset token and updating the user's password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the password is successfully reset.
 * @throws {Error} If there is an issue with resetting the password, an error is thrown with a corresponding message.
 */
const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() },
    });

    if (!userToken) {
        res.status(400);
        throw new Error('Invalid or Expired Token');
    }

    const user = await User.findById(userToken.userId);

    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    user.password = password;
    await user.save();
    res.status(200).json({ message: 'Password Reset Successful, Please Login' });
});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
