const Order = require("../models/orderModels.js");


/**
 * Creates a new order based on the provided request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the order is successfully saved.
 */
const CreateOrder = async (req, res, next) => {
  const order = new Order(req.body);
  try {
    await order.save();
    res.json({ msg: "Order successfully added" });
  } catch (error) {
    console.log(error);
    next();
  }
};


/**
 * Retrieves all orders with associated user and product details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the orders are successfully retrieved.
 */
const GetOrders = async (req, res, next) => {
  try {
    const order = await Order.find({}).populate("user").populate({
      path: "order.product",
      model: "Product",
    });
    res.json({ order });
  } catch (error) {
    console.error(error);
    next();
  }
};

/**
 * Retrieves a specific order based on the provided ID with associated user and product details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the specific order is successfully retrieved.
 */
const GetOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user").populate({
      path: "order.product",
      model: "Product",
    });

    if (!order) {
      res.json({ msg: "Order not found" });
      return next();
    }
    res.json({ order });
  } catch (error) {
    console.error(error);
    next();
  }
};


/**
 * Updates a specific order based on the provided ID with the new data from the request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the order is successfully updated.
 */
const UpdateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    })
      .populate("user")
      .populate({
        path: "order.product",
        model: "Product",
      });

    res.json(order);
  } catch (error) {
    console.log(error);
    next();
  }
};

/**
 * Deletes a specific order based on the provided ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the order is successfully deleted.
 */
const DeleteOrder = async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    const error = new Error("Order not found");
    return res.status(404).json({ msg: error.message });
  }

  try {
    await order.deleteOne();
    res.json({ msg: "Order successfully deleted" });
  } catch (error) {
    console.log(error);
    next();

  }
};

module.exports = {
    CreateOrder,
    GetOrders,
    GetOrder,
    UpdateOrder,
    DeleteOrder
};