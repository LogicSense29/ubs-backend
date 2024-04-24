const express = require("express");
const router = express.Router();
const { addUserValidation } = require("../validators/auth");
const vMW = require("../middleware/authMW");
const { getUsers, addUsers } = require("../controllers/auth");

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});

router.post("/login", getUsers);

router.post("/register", addUserValidation, vMW, addUsers);

module.exports = router;

// router.delete("/", deleteUser);
