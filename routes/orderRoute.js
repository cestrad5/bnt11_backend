const express = require("express");
const router = express.Router();
 


const {
      
    CreateOrder,
    GetOrders,
    GetOrder,
    UpdateOrder,
    DeleteOrder
} = require ("../controllers/orderControllers.js");


/**
 * http://localhost:5000/api
 * 
 * Router create new order
 * @openapi
 * /api/orders/order:
 *      post:
 *          tags:
 *              - Orders
 *          sumamary: "Create Order"
 *          description: "This route is used to create new order"
 *          requestBody:
 *              content:
 *                    application/json:
 *                           schema:
 *                              $ref: "#/components/schemas/Order"
 *          responses:
 *                  '201':
 *                      description: The order is created successfully
 *                  '404':
 *                      description: The order is not created
 */
router.post("/order", CreateOrder);

/**
 * http://localhost:5000/api
 * 
 * Router get user
 * @openapi
 * /api/orders/order:
 *      get:
 *          tags:
 *              - Orders
 *          sumamary: "Get order"
 *          description: "This route is used to get the order"
 *          requestBody:
 *              content:
 *                    application/json:
 *                           schema:
 *                              $ref: "#/components/schemas/Order"
 *          responses:
 *                  '201':
 *                      description: Get order
 *                  '403':
 *                      description: Not found order
 */
router.get("/order", GetOrders);

/**
 * Get detail ona product with id
 * @openapi
 * /api/orders/order{id}:
 *    get:
 *      tags:
 *        - Orders
 *      summary: "Detail of the order"
 *      description: detail of order
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID od order for return data
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: return order
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Order'
 *        '422':
 *          description: Error not found order.
 */
router.get("/order/:id", GetOrder);

/**
 * Get detail ona product with id
 * @openapi
 * /api/orders/order{id}:
 *    put:
 *      tags:
 *        - Orders
 *      summary: "Detail of the order"
 *      description: detail of order
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID od order for return data
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: return order
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Order'
 *        '422':
 *          description: Error not found order.
 */
router.put("/order/:id", UpdateOrder);

/**
 * Get detail ona product with id
 * @openapi
 * /api/orders/order{id}:
 *    delete:
 *      tags:
 *        - Orders
 *      summary: "Delete order"
 *      description: Delete order
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID od order for return data
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Delete order
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Order'
 *        '422':
 *          description: Error not found order.
 */
router.delete("/order/:id", DeleteOrder);

module.exports = router;