const router = require("express").Router();
const plotController = require("../controllers/plotController");

router.get("/", plotController.getAllPlots);
router.get("/names", plotController.getPlotNames);
router.get("/:id", plotController.getPlotById);

module.exports = router;
