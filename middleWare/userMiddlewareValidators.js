/**
 * Validates the user registration input fields.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The callback function to call the next middleware.
 * @returns {void} This function does not return any value.
 */
const userRegisterValidator = (req, res, next) => {
    const body = req.body;

    const {name, email, password } = body;

    //Validations

    if (!name) {
      const error = new Error('Name required!');
      return res.status(404).json({ msg: error.message });
    };

    if (!email) {
      const error = new Error('Email required!');
      return res.status(404).json({ msg: error.message });
    };

    if (!password) {
      const error = new Error('Password required!');
      return res.status(404).json({ msg: error.message });
    };

    next();

};

/**
 * Validates the user login input fields.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The callback function to call the next middleware.
 * @returns {void} This function does not return any value.
 */
const userLoginValidator =  (req, res, next) => {

    const {email, password} = req.body

    if (!email){
        const error = new Error('Invalid email');
        return res.status(404).json({message: error.message})
    }

    if (!password){
        const error = new Error('Invalid password');
        return res.status(404).json({message: error.message})
    }

    next();
}

module.exports = {
    userRegisterValidator,
    userLoginValidator,
};
