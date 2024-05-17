const router = require("express").Router();
const plotController = require("../controllers/plotController");

router.get("/", plotController.getAllPlots);
router.get("/names", plotController.getPlotNames);

module.exports = router;
