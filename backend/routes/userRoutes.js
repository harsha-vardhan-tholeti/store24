const express = require("express");
const {
  registerUser,
  loginUser,
  forgotUserPassword,
  resetUserPassword,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgotPassword", forgotUserPassword);
router.patch("/resetPassword/:token", resetUserPassword);

module.exports = router;
