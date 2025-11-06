const express = require("express");
const router = express.Router();
const {
  register,
  login,
  estimatesValue,
  bookAmbulance,
  adminLogin,
  getSystemTotals,
} = require("../controllers/controller");

router.post("/register", register);
router.post("/login", login);
router.post("/estimates", estimatesValue);
router.post("/book", bookAmbulance);
router.post("/admin/login", adminLogin);
router.get("/totals", getSystemTotals);

module.exports = router;
