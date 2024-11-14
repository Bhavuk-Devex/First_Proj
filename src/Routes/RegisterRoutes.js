const express = require("express");
const router = express.Router();
const {
  data,
  login,
  sendOTP,
  verifyOTP,
} = require("../Controller/RegisterController");

router.get("/data", data);
router.post("/login", login);
router.post("/otp", sendOTP);
router.post("/verifyOTP", verifyOTP);

module.exports = router;
