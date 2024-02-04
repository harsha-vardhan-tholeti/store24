const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const errorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) return next(errorHandler("Order not found with this id", 404));

  res.status(200).json({
    success: true,
    order,
  });
});

const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(errorHandler("Order not found with this Id", 404));

  if (order.orderStatus === "Delivered")
    return next(errorHandler("You have already delivered this Order", 404));

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (orderItem) => {
      await updateStock(orderItem.product, orderItem.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") order.deliveredAt = Date.now();

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
};

const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(errorHandler("Order not found with this Id", 404));

  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  createOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  updateStock,
  deleteOrder,
};
