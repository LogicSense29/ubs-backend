const express = require("express");
const router = express.Router();
const {addUserValidation} = require("../validators/auth")
const vMW = require("../middleware/authMW")
const {getUsers, addUsers} = require("../controllers/auth")


router.post("/login", getUsers);

router.post("/register", addUsers);

module.exports = router;



// router.delete("/", deleteUser);