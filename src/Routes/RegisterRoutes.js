const express = require("express");
const router = express.Router();
const { data, login } = require("../Controller/RegisterController");

router.get("/data", data);
router.post("/login", login);

module.exports = router;
