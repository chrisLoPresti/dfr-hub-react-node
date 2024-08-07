const express = require("express");
const router = express.Router();
const { register } = require("./api/auth");
router.route("/register").post(register);
module.exports = router;
