const express = require("express");
const router = express.Router();
const {
  currency,
  MCC,
  register,
  timeZone,
  budgetBilling,
} = require("../Controller/RegisterController");

router.get("/currency", currency);
router.get("/timeZone", timeZone);
router.get("/MCC", MCC);
router.post("/register", register);
router.post("/budgetBilling", budgetBilling);

module.exports = router;
