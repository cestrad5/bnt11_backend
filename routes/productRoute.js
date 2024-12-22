const express = require('express');
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const protect = require('../middleWare/authMiddleware');
const { upload } = require('../utils/fileUpload');
const router = express.Router();


/**
 * http://localhost:5000/api
 * 
 * Router create product
 * @openapi
 * /products:
 *      post:
 *          tags:
 *              - Products
 *          sumamary: "Create a new product"
 *          description: "This route is used for create products"
 *          requestBody:
 *              content:
 *                    application/json:
 *                           schema:
 *                              $ref: "#/components/schemas/Products"
 *          responses:
 *                  '201':
 *                      description: Product created successfully
 *                  '403':
 *                      description: product not found
 */
router.post('/', protect, upload.single('image'), createProduct); //multiple images is array

/**
 * Update products
 * @openapi
 * /products/{id}:
 *    patch:
 *      tags:
 *        - Products
 *      summary: "Detail of product"
 *      description: get updated product
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID of id for update one product
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: return update one product
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Products'
 *        '422':
 *          description: Error found product.
 */
router.patch('/:id', protect, upload.single('image'), updateProduct);

/**
 * Get all product
 * @openapi
 * /product:
 *    get:
 *      tags:
 *        - Products
 *      summary: "list all products"
 *      description: get list all products
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: return all products
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 *        '422':
 *          description: Error found list product.
 */
router.get('/', protect, getProducts);

/**
 * Get detail ona product with id
 * @openapi
 * /products/{id}:
 *    get:
 *      tags:
 *        - Products
 *      summary: "Detail of product"
 *      description: detail of product
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID od product for return data
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: return one product
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Products'
 *        '422':
 *          description: Error found product.
 */
router.get('/:id', protect, getProduct);

/**
 * Delete product
 * @openapi
 * /product/{id}:
 *    delete:
 *      tags:
 *        - Products
 *      summary: "Delete a product"
 *      description: Delete a product
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID of product to delete
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Delete product
 *        '422':
 *          description: Error Delete product.
 */
router.delete('/:id', protect, deleteProduct);

module.exports = router;