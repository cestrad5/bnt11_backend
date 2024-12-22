/**
 * Handles errors by setting the status code and sending an error message response.
 * @param {Error} err - The error object to handle.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The callback function to call the next middleware.
 * @returns {void} This function does not return any value.
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    })
};

module.exports = errorHandler;
