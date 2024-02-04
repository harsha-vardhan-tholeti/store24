const express = require("express");
const {
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  createOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.use(isAuthenticatedUser);

router.route("/").post(createOrder);

router.route("/:id").get(getSingleOrder);

router.route("/me").get(myOrders);

router.route("/admin/orders").get(authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .patch(authorizeRoles("admin"), updateOrder)
  .delete(authorizeRoles("admin"), deleteOrder);

module.exports = router;
