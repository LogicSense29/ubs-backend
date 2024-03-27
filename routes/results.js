const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requiredAuth");
const {getResults, addResults} = require("../controllers/resultController")
const cors =require("cors")

router.post("/:id", addResults)

app.options('/', cors())
router.use(requireAuth);

router.get("/",  cors(), getResults)

module.exports = router;