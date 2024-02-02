const Product = require("../models/productModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const createAPIFeatures = require("../utils/apiFeatures");

// Create Product - Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new createAPIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    length: products.length,
    products,
  });
});

// Get Single Product
const getProduct = catchAsyncErrors(async (req, res, next) => {
  const _product = await Product.findById(req.params.id);

  if (!_product) {
    return next(errorHandler("Product not found", 400));
  }

  const product = await Product.findById(req.params.id);

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product - Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const _product = await Product.findById(req.params.id);

  if (!_product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product - Admin
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(errorHandler("Product not found", 400));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
