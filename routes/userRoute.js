const express = require('express');
const router = express.Router();
const { registerUser, 
        loginUser, 
        logout, getUser, 
        loginStatus, 
        updateUser, 
        changePassword, 
        forgotPassword, 
        resetPassword, } = require('../controllers/userController');
const protect = require('../middleWare/authMiddleware');
const { userRegisterValidator, userLoginValidator } = require('../middleWare/userMiddlewareValidators');

/**
 * http://localhost:5000/api
 * 
 * Router register new user
 * @openapi
 * /users/register:
 *      post:
 *          tags:
 *              - users
 *          sumamary: "Register new user"
 *          description: "This route is used to register"
 *          requestBody:
 *              content:
 *                    application/json:
 *                           schema:
 *                              $ref: "#/components/schemas/userRegister"
 *          responses:
 *                  '200':
 *                      description: the user is registered
 *                  '404':
 *                      description: the user not registered
 */
router.post('/register', userRegisterValidator, registerUser);

/**
 * http://localhost:5000/api
 * 
 * Router login user
 * @openapi
 * /users/login:
 *      post:
 *          tags:
 *              - users
 *          sumamary: "Login new user"
 *          description: "This route is used for login"
 *          requestBody:
 *              content:
 *                    application/json:
 *                           schema:
 *                              $ref: "#/components/schemas/userLogin"
 *          responses:
 *                  '201':
 *                      description: the user is loggin
 *                  '403':
 *                      description: the user not loggin
 */
router.post('/login',userLoginValidator, loginUser);

/**
 * Logout user
 * @openapi
 * /users/logout:
 *    get:
 *      tags:
 *        - users
 *      summary: "logout all the user"
 *      description: logout user
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Return the logout the user.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/logout'
 *        '422':
 *          description: Error of validation.
 */
router.get('/logout', logout);

/**
 * Logout user
 * @openapi
 * /users/getuser:
 *    get:
 *      tags:
 *        - users
 *      summary: "get the user"
 *      description: get user
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Return the get the user.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/getuser'
 *        '422':
 *          description: Error of validation.
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */
router.get('/getuser', protect, getUser);

/**
 * Logout user
 * @openapi
 * /users/loggedin:
 *    get:
 *      tags:
 *        - users
 *      summary: "get the user logeding"
 *      description: get user
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Return the get the user.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/loggedin'
 *        '422':
 *          description: Error of validation.
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */
router.get('/loggedin', loginStatus);

/**
 * http://localhost:5000/api
 * 
 * Router update user
 * @openapi
 * /users/updateuser:
 *      patch:
 *          tags:
 *              - users
 *          sumamary: "Update user"
 *          description: "This route is used for update user"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              content:
 *                    application/json:
 *                           schema:
 *                              $ref: "#/components/schemas/userUpdate"
 *          responses:
 *                  '201':
 *                      description: Update user
 *                  '403':
 *                      description: Not update user
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */
router.patch('/updateuser', protect, updateUser);

/**
 * http://localhost:5000/api
 * 
 * Router update password
 * @openapi
 * /users/changepassword:
 *      patch:
 *          tags:
 *              - users
 *          sumamary: "Update password"
 *          description: "This route is used for update password"
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              content:
 *                    application/json:
 *                           schema:
 *                              $ref: "#/components/schemas/changePassword"
 *          responses:
 *                  '201':
 *                      description: Update password
 *                  '403':
 *                      description: Not update password
 *      securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */
router.patch('/changepassword', protect, changePassword);

/**
 * http://localhost:5000/api
 * 
 * Router login user
 * @openapi
 * /users/forgotpassword:
 *      post:
 *          tags:
 *              - users
 *          sumamary: "forgot password"
 *          description: "This route is used for forgot password"
 *          requestBody:
 *              content:
 *                    application/json:
 *                           schema:
 *                              $ref: "#/components/schemas/forgotPassword"
 *          responses:
 *                  '201':
 *                      description: forgot password
 *                  '403':
 *                      description: Error forgot password
 */
router.post('/forgotpassword', forgotPassword);

/**
 * http://localhost:5000/api
 * 
 * Router update password
 * @openapi
 * /users/resetpassword/:resetToken:
 *      put:
 *          tags:
 *              - users
 *          sumamary: "Update password"
 *          description: "This route is used for update password"
 *          requestBody:
 *              content:
 *                    application/json:
 *                           schema:
 *                              $ref: "#/components/schemas/resetpassword"
 *          responses:
 *                  '201':
 *                      description: Update password
 *                  '403':
 *                      description: Not update password
 */
router.put('/resetpassword/:resetToken', resetPassword);


module.exports = router;
