const express = require('express');
const router = express.Router();
const protect = require('../middleWare/authMiddleware');
const { contactUS } = require('../controllers/contactController');

/**
 * http://localhost:5000/api
 * 
 * Router create new contactus
 * @openapi
 * /contactus:
 *      post:
 *          tags:
 *              - Contactus
 *          sumamary: "Create contactus"
 *          description: "This route is used to create contactus"
 *          requestBody:
 *              content:
 *                    application/json:
 *                           schema:
 *                              $ref: "#/components/schemas/contacUS"
 *          responses:
 *                  '201':
 *                      description: Request was send
 *                  '403':
 *                      description: Request was rejected
 */
router.post('/', protect, contactUS);

module.exports = router;