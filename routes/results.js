const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requiredAuth");
const {getResults, addResults} = require("../controllers/resultController")

router.post("/:id", addResults)

router.use(requireAuth);


router.get("/", getResults)

module.exports = router;