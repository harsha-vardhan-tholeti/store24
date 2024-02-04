const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
  deleteReview,
  createProductReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

router.route("/review").patch(isAuthenticatedUser, createProductReview);

module.exports = router;
