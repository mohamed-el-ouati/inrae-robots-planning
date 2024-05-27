const router = require("express").Router();
const trajectoryController = require("../controllers/trajectoryController");

router.get("/available", trajectoryController.getAvailableTrajectories);
router.get("/points", trajectoryController.getTrajectoriesPoints);
router.get("/:id", trajectoryController.getTrajectoryById); // Specific route should come first

router.post("/", trajectoryController.addTrajectory);

module.exports = router;
