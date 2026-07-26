const express = require("express");
const router = express.Router();
const angelController = require("../controllers/angelController");

router.post("/call", angelController.callAngel);
router.get("/list", angelController.getAngelsList);
router.get("/random", angelController.getRandomAngel);

module.exports = router;
