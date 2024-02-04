const express = require("express");
const {
  registerUser,
  loginUser,
  forgotUserPassword,
  resetUserPassword,
  updatePassword,
} = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  getUserDetails,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgotPassword", forgotUserPassword);
router.patch("/resetPassword/:token", resetUserPassword);
router.patch("/updatePassword", isAuthenticatedUser, updatePassword);

// Users
router.get("/me", getUserDetails);
router.patch("/me/update", updateUserProfile);
router
  .route("/admin")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
