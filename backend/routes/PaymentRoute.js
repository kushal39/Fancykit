const express = require("express");
const { Payment } = require("../controller/PaymentController");
const router = express.Router();
const {isAuthenticatedUser} = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, Payment);



module.exports = router;