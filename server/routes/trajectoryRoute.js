const router = require("express").Router();
const trajectoryController = require("../controllers/trajectoryController");

router.get("/available", trajectoryController.getAvailableTrajectories);
router.get("/:id", trajectoryController.getTrajectoryById);
router.post("/", trajectoryController.addTrajectory);

module.exports = router;
