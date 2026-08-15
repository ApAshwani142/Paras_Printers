const { Router } = require("express");
const { submitQuote } = require("../controllers/quoteController");

const router = Router();

router.post("/", submitQuote);

module.exports = router;
