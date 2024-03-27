const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requiredAuth");
const {getResults, addResults} = require("../controllers/resultController")
const cors =require("cors")

router.post("/:id", addResults)

router.use(requireAuth);

app.options('/', cors())
router.get("/", getResults, cors())

module.exports = router;