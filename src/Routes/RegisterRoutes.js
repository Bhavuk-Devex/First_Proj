const express = require("express");
const router = express.Router();
const {
  currency,
  getManagedAccounts,
  register,
  timeZone,
  budgetBilling,
} = require("../Controller/RegisterController");

router.get("/currency", currency);
router.get("/timeZone", timeZone);
router.get("/getManagedAccounts", getManagedAccounts);
router.post("/register", register);
router.post("/budgetBilling", budgetBilling);

module.exports = router;
