const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

/**
 * Protects routes by verifying the user's authentication token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The callback function to call the next middleware.
 * @returns {Promise<void>} A promise that resolves when the user is successfully authenticated.
 * @throws {Error} If the user is not authorized, an error is thrown with a corresponding message.
 */
const protect = asyncHandler(async (req, res, next) => {
  try {
      let token;
      
      // Intenta obtener el token de diferentes fuentes
      if (req.cookies.token) {
          token = req.cookies.token;
      } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
          res.status(401);
          throw new Error('Not authorized, please login');
      }

      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(verified.id).select('-password');
      
      if (!user) {
          res.status(401);
          throw new Error('User not found');
      }

      req.user = user;
      next();
  } catch (error) {
      res.status(401);
      throw new Error('Not authorized, please login');
  }
});

module.exports = protect;